import { createHmac, timingSafeEqual } from "node:crypto";
import type { SafeUser } from "@/lib/auth";
import type { PaymentOrder } from "@/lib/paymentOrders";

const SHOPIER_DEFAULT_PAYMENT_URL = "https://www.shopier.com/ShowProduct/api_pay4.php";
const SHOPIER_CURRENCY_TL = 0;
const SHOPIER_LANGUAGE_TR = 0;
const SHOPIER_DOWNLOADABLE_VIRTUAL_PRODUCT = 1;

type ShopierConfig = {
  apiKey: string;
  apiSecret: string;
  paymentUrl: string;
  websiteIndex: number;
};

export type ShopierPaymentForm = {
  paymentUrl: string;
  fields: Record<string, string>;
};

export type ShopierCallbackPayload = {
  API_key: string;
  platform_order_id: string;
  status: string;
  installment: string;
  payment_id: string;
  random_nr: string;
  signature: string;
};

const getShopierConfig = (): ShopierConfig => {
  const apiKey = process.env.SHOPIER_API_KEY;
  const apiSecret = process.env.SHOPIER_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Shopier API bilgileri eksik");
  }

  return {
    apiKey,
    apiSecret,
    paymentUrl: process.env.SHOPIER_PAYMENT_URL ?? SHOPIER_DEFAULT_PAYMENT_URL,
    websiteIndex: Number(process.env.SHOPIER_WEBSITE_INDEX ?? 1),
  };
};

const getBuyerAccountAge = (createdAt: string) => {
  const createdAtTime = new Date(createdAt).getTime();

  if (!Number.isFinite(createdAtTime)) {
    return "0";
  }

  const ageInDays = Math.max(
    0,
    Math.floor((Date.now() - createdAtTime) / (1000 * 60 * 60 * 24)),
  );

  return String(ageInDays);
};

const getNumericBuyerId = (userId: string) => {
  const numericId = userId
    .replace(/\D/g, "")
    .slice(0, 9)
    .padEnd(9, "0");

  return numericId === "000000000" ? "100000000" : numericId;
};

const getPhoneNumber = (phone: string) => {
  const normalizedPhone = phone.replace(/\D/g, "");

  return normalizedPhone || "5000000000";
};

const formatOrderValue = (amount: number) => amount.toFixed(2);

const createPaymentSignature = ({
  randomNumber,
  orderId,
  orderValue,
  apiSecret,
}: {
  randomNumber: string;
  orderId: string;
  orderValue: string;
  apiSecret: string;
}) =>
  createHmac("sha256", apiSecret)
    .update(`${randomNumber}${orderId}${orderValue}${SHOPIER_CURRENCY_TL}`)
    .digest("base64");

export const createShopierPaymentForm = ({
  order,
  user,
  callbackUrl,
}: {
  order: PaymentOrder;
  user: SafeUser;
  callbackUrl: string;
}): ShopierPaymentForm => {
  const config = getShopierConfig();
  const randomNumber = String(Math.floor(100000 + Math.random() * 900000));
  const orderValue = formatOrderValue(order.amount);
  const address = user.address || "Dijital ürün";
  const signature = createPaymentSignature({
    randomNumber,
    orderId: order.id,
    orderValue,
    apiSecret: config.apiSecret,
  });

  return {
    paymentUrl: config.paymentUrl,
    fields: {
      API_key: config.apiKey,
      website_index: String(config.websiteIndex),
      platform_order_id: order.id,
      product_name: order.packageName,
      product_type: String(SHOPIER_DOWNLOADABLE_VIRTUAL_PRODUCT),
      buyer_name: user.name,
      buyer_surname: user.surname,
      buyer_email: user.email,
      buyer_account_age: getBuyerAccountAge(user.createdAt),
      buyer_id_nr: getNumericBuyerId(user.id),
      buyer_phone: getPhoneNumber(user.phone),
      billing_address: address,
      billing_city: "İstanbul",
      billing_country: "Turkey",
      billing_postcode: "34000",
      shipping_address: address,
      shipping_city: "İstanbul",
      shipping_country: "Turkey",
      shipping_postcode: "34000",
      total_order_value: orderValue,
      currency: String(SHOPIER_CURRENCY_TL),
      platform: "0",
      is_in_frame: "0",
      current_language: String(SHOPIER_LANGUAGE_TR),
      modul_version: "1.0.4",
      random_nr: randomNumber,
      signature,
      callback: callbackUrl,
    },
  };
};

export const getShopierCallbackPayload = (
  formData: FormData,
): ShopierCallbackPayload => {
  const getStringField = (fieldName: string) => {
    const fieldValue = formData.get(fieldName);

    return typeof fieldValue === "string" ? fieldValue : "";
  };

  return {
    API_key: getStringField("API_key"),
    platform_order_id: getStringField("platform_order_id"),
    status: getStringField("status"),
    installment: getStringField("installment"),
    payment_id: getStringField("payment_id"),
    random_nr: getStringField("random_nr"),
    signature: getStringField("signature"),
  };
};

export const verifyShopierCallback = (payload: ShopierCallbackPayload) => {
  const config = getShopierConfig();

  if (payload.API_key && payload.API_key !== config.apiKey) {
    return false;
  }

  if (!payload.random_nr || !payload.platform_order_id || !payload.signature) {
    return false;
  }

  const expectedSignature = createHmac("sha256", config.apiSecret)
    .update(`${payload.random_nr}${payload.platform_order_id}`)
    .digest();
  const receivedSignature = Buffer.from(payload.signature, "base64");

  if (receivedSignature.length !== expectedSignature.length) {
    return false;
  }

  return timingSafeEqual(receivedSignature, expectedSignature);
};
