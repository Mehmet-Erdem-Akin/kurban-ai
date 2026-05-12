import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  usagePurpose: string;
  remainingCredits: number;
  createdAt: string;
};

type UserDatabase = {
  users: User[];
};

const dataDirectoryPath = join(process.cwd(), "data");
const usersDatabasePath = join(dataDirectoryPath, "users.json");

const ensureUsersDatabase = (): void => {
  if (!existsSync(dataDirectoryPath)) {
    mkdirSync(dataDirectoryPath, { recursive: true });
  }

  if (!existsSync(usersDatabasePath)) {
    writeFileSync(usersDatabasePath, JSON.stringify({ users: [] }, null, 2));
  }
};

const readUsersDatabase = (): UserDatabase => {
  ensureUsersDatabase();

  return JSON.parse(readFileSync(usersDatabasePath, "utf-8")) as UserDatabase;
};

const writeUsersDatabase = (database: UserDatabase): void => {
  ensureUsersDatabase();
  writeFileSync(usersDatabasePath, JSON.stringify(database, null, 2));
};

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const getUserByEmail = (email: string): User | null => {
  const database = readUsersDatabase();
  const normalizedEmail = normalizeEmail(email);

  return (
    database.users.find((user) => normalizeEmail(user.email) === normalizedEmail) ??
    null
  );
};

export const getUserById = (id: string): User | null => {
  const database = readUsersDatabase();

  return database.users.find((user) => user.id === id) ?? null;
};

export const createUser = (user: User): User => {
  const database = readUsersDatabase();

  database.users.push(user);
  writeUsersDatabase(database);

  return user;
};
