import type { User as PrismaUser } from "@prisma/client";
import prisma from "@/lib/prisma";

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

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const toDate = (dateValue: string): Date => {
  const parsedDate = new Date(dateValue);

  return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

const mapUserRecord = (user: PrismaUser): User => ({
  id: user.id,
  name: user.name,
  surname: user.surname,
  email: user.email,
  password: user.password,
  phone: user.phone,
  address: user.address,
  usagePurpose: user.usagePurpose,
  remainingCredits: user.remainingCredits,
  createdAt: user.createdAt.toISOString(),
});

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
  });

  return user ? mapUserRecord(user) : null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user ? mapUserRecord(user) : null;
};

export const createUser = async (user: User): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: normalizeEmail(user.email),
      password: user.password,
      phone: user.phone,
      address: user.address,
      usagePurpose: user.usagePurpose,
      remainingCredits: user.remainingCredits,
      createdAt: toDate(user.createdAt),
    },
  });

  return mapUserRecord(createdUser);
};

export const updateUser = async (updatedUser: User): Promise<User> => {
  const user = await prisma.user.update({
    where: { id: updatedUser.id },
    data: {
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: normalizeEmail(updatedUser.email),
      password: updatedUser.password,
      phone: updatedUser.phone,
      address: updatedUser.address,
      usagePurpose: updatedUser.usagePurpose,
      remainingCredits: updatedUser.remainingCredits,
      createdAt: toDate(updatedUser.createdAt),
    },
  });

  return mapUserRecord(user);
};

export const decrementUserCredit = async (
  userId: string,
): Promise<User | null> => {
  const updatedUser = await prisma.$transaction(async (transaction) => {
    const currentUser = await transaction.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser || currentUser.remainingCredits <= 0) {
      return null;
    }

    return transaction.user.update({
      where: { id: userId },
      data: {
        remainingCredits: {
          decrement: 1,
        },
      },
    });
  });

  return updatedUser ? mapUserRecord(updatedUser) : null;
};

export const addUserCredits = async (
  userId: string,
  creditsToAdd: number,
): Promise<User | null> => {
  if (creditsToAdd <= 0) {
    return null;
  }

  const updatedUser = await prisma.$transaction(async (transaction) => {
    const currentUser = await transaction.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      return null;
    }

    return transaction.user.update({
      where: { id: userId },
      data: {
        remainingCredits: {
          increment: creditsToAdd,
        },
      },
    });
  });

  return updatedUser ? mapUserRecord(updatedUser) : null;
};
