import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { CreditPackageId } from "@/config/creditPackages";

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

type PaymentOrdersDatabase = {
  orders: PaymentOrder[];
};

const dataDirectoryPath = join(process.cwd(), "data");
const paymentOrdersDatabasePath = join(dataDirectoryPath, "payment-orders.json");

const ensurePaymentOrdersDatabase = (): void => {
  if (!existsSync(dataDirectoryPath)) {
    mkdirSync(dataDirectoryPath, { recursive: true });
  }

  if (!existsSync(paymentOrdersDatabasePath)) {
    writeFileSync(
      paymentOrdersDatabasePath,
      JSON.stringify({ orders: [] }, null, 2),
    );
  }
};

const readPaymentOrdersDatabase = (): PaymentOrdersDatabase => {
  ensurePaymentOrdersDatabase();

  return JSON.parse(
    readFileSync(paymentOrdersDatabasePath, "utf-8"),
  ) as PaymentOrdersDatabase;
};

const writePaymentOrdersDatabase = (database: PaymentOrdersDatabase): void => {
  ensurePaymentOrdersDatabase();
  writeFileSync(paymentOrdersDatabasePath, JSON.stringify(database, null, 2));
};

export const createPaymentOrder = (
  order: Omit<PaymentOrder, "id" | "status" | "createdAt">,
): PaymentOrder => {
  const database = readPaymentOrdersDatabase();
  const paymentOrder: PaymentOrder = {
    ...order,
    id: `KA-${Date.now()}-${randomBytes(4).toString("hex")}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  database.orders.push(paymentOrder);
  writePaymentOrdersDatabase(database);

  return paymentOrder;
};

export const getPaymentOrderById = (orderId: string): PaymentOrder | null => {
  const database = readPaymentOrdersDatabase();

  return database.orders.find((order) => order.id === orderId) ?? null;
};

export const updatePaymentOrder = (
  orderId: string,
  updates: Partial<PaymentOrder>,
): PaymentOrder | null => {
  const database = readPaymentOrdersDatabase();
  const orderIndex = database.orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    return null;
  }

  const updatedOrder = {
    ...database.orders[orderIndex],
    ...updates,
  };

  database.orders[orderIndex] = updatedOrder;
  writePaymentOrdersDatabase(database);

  return updatedOrder;
};
