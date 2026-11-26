import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { cookies, headers } from "next/headers";
import { getUserById, type User } from "@/lib/db";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

export const AUTH_COOKIE_NAME = "kurban_ai_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const TOKEN_VERSION = "v1";

export type SafeUser = Omit<User, "password">;

type SessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

const getAuthSecret = (): string => {
  const secret = process.env.AUTH_SECRET?.trim();

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET ortam değişkeni production için zorunludur");
  }

  // Local/dev only fallback — never use in production builds.
  return "dev-only-auth-secret-change-me";
};

const toBase64Url = (value: Buffer | string): string => {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value, "utf-8");

  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const fromBase64Url = (value: string): Buffer => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));

  return Buffer.from(`${normalized}${padding}`, "base64");
};

const signPayload = (encodedPayload: string): string => {
  const digest = createHmac("sha256", getAuthSecret())
    .update(`${TOKEN_VERSION}.${encodedPayload}`)
    .digest();

  return toBase64Url(digest);
};

const safeEqualString = (left: string, right: string): boolean => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt, 64);

  return `scrypt:${salt}:${hash.toString("hex")}`;
};

export const verifyPassword = async (
  password: string,
  storedPassword: string,
): Promise<boolean> => {
  const [algorithm, salt, storedHash] = storedPassword.split(":");

  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return password === storedPassword;
  }

  const storedHashBuffer = Buffer.from(storedHash, "hex");
  const currentHashBuffer = await scrypt(password, salt, storedHashBuffer.length);

  if (storedHashBuffer.length !== currentHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(storedHashBuffer, currentHashBuffer);
};

export const createToken = async (userId: string): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: userId,
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  return `${TOKEN_VERSION}.${encodedPayload}.${signature}`;
};

export const verifyToken = (token: string): SessionPayload | null => {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [version, encodedPayload, signature] = parts;

  if (version !== TOKEN_VERSION || !encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);

  if (!safeEqualString(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      fromBase64Url(encodedPayload).toString("utf-8"),
    ) as SessionPayload;

    if (!payload.sub || typeof payload.sub !== "string") {
      return null;
    }

    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const setAuthCookie = async (token: string): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
};

export const clearAuthCookie = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE_NAME);
};

const extractBearerToken = (authorizationHeader: string | null): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);

  return match?.[1]?.trim() || null;
};

export const getRequestToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (cookieToken) {
    return cookieToken;
  }

  const headerStore = await headers();

  return extractBearerToken(headerStore.get("authorization"));
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = await getRequestToken();

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  return await getUserById(payload.sub);
};

export const getAdminUserIds = (): Set<string> => {
  const raw = process.env.ADMIN_USER_IDS?.trim();

  if (!raw) {
    return new Set();
  }

  return new Set(
    raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
};

export const isAdminUser = (user: Pick<User, "id" | "email">): boolean => {
  const adminIds = getAdminUserIds();

  if (adminIds.has(user.id)) {
    return true;
  }

  const adminEmails = process.env.ADMIN_EMAILS?.trim();

  if (!adminEmails) {
    return false;
  }

  const allowedEmails = new Set(
    adminEmails
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );

  return allowedEmails.has(user.email.toLowerCase());
};

export const requireAdmin = async (): Promise<User | null> => {
  const user = await getCurrentUser();

  if (!user || !isAdminUser(user)) {
    return null;
  }

  return user;
};

export const toSafeUser = (user: User): SafeUser => ({
  id: user.id,
  name: user.name,
  surname: user.surname,
  email: user.email,
  phone: user.phone,
  address: user.address,
  usagePurpose: user.usagePurpose,
  remainingCredits: user.remainingCredits,
  createdAt: user.createdAt,
});
