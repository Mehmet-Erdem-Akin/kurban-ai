import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { getUserById, type User } from "@/lib/db";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

const AUTH_COOKIE_NAME = "kurban_ai_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type SafeUser = Omit<User, "password">;

const getUserIdFromToken = (token: string): string | null => {
  try {
    const decodedToken = Buffer.from(token, "base64").toString("utf-8");
    const [userId] = decodedToken.split(":");

    return userId || null;
  } catch {
    return null;
  }
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
  return Buffer.from(
    `${userId}:${Date.now()}:${randomBytes(16).toString("hex")}`,
  ).toString("base64");
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

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const userId = getUserIdFromToken(token);

  if (!userId) {
    return null;
  }

  return await getUserById(userId);
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
