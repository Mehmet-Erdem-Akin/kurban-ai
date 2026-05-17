import { randomBytes } from "node:crypto";
import { Prisma, type PaymentOrder as PrismaPaymentOrder } from "@prisma/client";
import type { CreditPackageId } from "@/config/creditPackages";
import prisma from "@/lib/prisma";

export type PaymentOrderStatus = "pending" | "paid" | "failed";

export type PaymentOrder = {
  id: string;
  userId: string;
  packageId: CreditPackageId;
  packageName: string;
  credits: number;
  amount: number;
  status: PaymentOrderStatus;
  createdAt: string;
  paidAt?: string;
  failedAt?: string;
  paymentId?: string;
};

const toDate = (dateValue: string): Date => {
  const parsedDate = new Date(dateValue);

  return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

const mapPaymentOrder = (paymentOrder: PrismaPaymentOrder): PaymentOrder => ({
  id: paymentOrder.id,
  userId: paymentOrder.userId,
  packageId: paymentOrder.packageId as CreditPackageId,
  packageName: paymentOrder.packageName,
  credits: paymentOrder.credits,
  amount: Number(paymentOrder.amount),
  status: paymentOrder.status as PaymentOrderStatus,
  createdAt: paymentOrder.createdAt.toISOString(),
  paidAt: paymentOrder.paidAt?.toISOString(),
  failedAt: paymentOrder.failedAt?.toISOString(),
  paymentId: paymentOrder.paymentId ?? undefined,
});

export const createPaymentOrder = (
  order: Omit<PaymentOrder, "id" | "status" | "createdAt">,
): Promise<PaymentOrder> => {
  return prisma.paymentOrder
    .create({
      data: {
        id: `KA-${Date.now()}-${randomBytes(4).toString("hex")}`,
        userId: order.userId,
        packageId: order.packageId,
        packageName: order.packageName,
        credits: order.credits,
        amount: new Prisma.Decimal(order.amount),
        status: "pending",
      },
    })
    .then(mapPaymentOrder);
};

export const getPaymentOrderById = async (
  orderId: string,
): Promise<PaymentOrder | null> => {
  const paymentOrder = await prisma.paymentOrder.findUnique({
    where: { id: orderId },
  });

  return paymentOrder ? mapPaymentOrder(paymentOrder) : null;
};

export const updatePaymentOrder = (
  orderId: string,
  updates: Partial<PaymentOrder>,
): Promise<PaymentOrder | null> => {
  const data: Prisma.PaymentOrderUpdateInput = {};

  if (updates.packageId !== undefined) {
    data.packageId = updates.packageId;
  }
  if (updates.packageName !== undefined) {
    data.packageName = updates.packageName;
  }
  if (updates.credits !== undefined) {
    data.credits = updates.credits;
  }
  if (updates.amount !== undefined) {
    data.amount = new Prisma.Decimal(updates.amount);
  }
  if (updates.status !== undefined) {
    data.status = updates.status;
  }
  if (updates.createdAt !== undefined) {
    data.createdAt = toDate(updates.createdAt);
  }
  if (updates.paidAt !== undefined) {
    data.paidAt = updates.paidAt ? toDate(updates.paidAt) : null;
  }
  if (updates.failedAt !== undefined) {
    data.failedAt = updates.failedAt ? toDate(updates.failedAt) : null;
  }
  if (updates.paymentId !== undefined) {
    data.paymentId = updates.paymentId ?? null;
  }

  if (Object.keys(data).length === 0) {
    return getPaymentOrderById(orderId);
  }

  return prisma.paymentOrder
    .update({
      where: { id: orderId },
      data,
    })
    .then(mapPaymentOrder)
    .catch(() => null);
};
