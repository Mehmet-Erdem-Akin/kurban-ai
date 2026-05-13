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

  const database = JSON.parse(
    readFileSync(usersDatabasePath, "utf-8"),
  ) as UserDatabase;

  return {
    users: database.users.map((user) => ({
      ...user,
      remainingCredits: user.remainingCredits ?? 3,
    })),
  };
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

export const updateUser = (updatedUser: User): User => {
  const database = readUsersDatabase();
  const userIndex = database.users.findIndex((user) => user.id === updatedUser.id);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  database.users[userIndex] = updatedUser;
  writeUsersDatabase(database);

  return updatedUser;
};

export const decrementUserCredit = (userId: string): User | null => {
  const user = getUserById(userId);

  if (!user || user.remainingCredits <= 0) {
    return null;
  }

  return updateUser({
    ...user,
    remainingCredits: user.remainingCredits - 1,
  });
};

export const addUserCredits = (userId: string, creditsToAdd: number): User | null => {
  const user = getUserById(userId);

  if (!user || creditsToAdd <= 0) {
    return null;
  }

  return updateUser({
    ...user,
    remainingCredits: user.remainingCredits + creditsToAdd,
  });
};
