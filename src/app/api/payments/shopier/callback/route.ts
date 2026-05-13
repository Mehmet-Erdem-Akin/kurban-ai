import { NextRequest, NextResponse } from "next/server";
import { addUserCredits } from "@/lib/db";
import {
  getPaymentOrderById,
  updatePaymentOrder,
} from "@/lib/paymentOrders";
import {
  getShopierCallbackPayload,
  verifyShopierCallback,
} from "@/lib/shopier";

const getPricingRedirectUrl = (
  request: NextRequest,
  paymentStatus: "success" | "failed" | "invalid",
) => {
  const redirectUrl = new URL("/pricing", request.nextUrl.origin);
  redirectUrl.searchParams.set("payment", paymentStatus);

  return redirectUrl;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const payload = getShopierCallbackPayload(formData);
    const isValidCallback = verifyShopierCallback(payload);

    if (!isValidCallback) {
      console.error("Geçersiz Shopier callback imzası:", payload);
      return NextResponse.redirect(getPricingRedirectUrl(request, "invalid"), 303);
    }

    const order = getPaymentOrderById(payload.platform_order_id);

    if (!order) {
      console.error("Shopier siparişi bulunamadı:", payload.platform_order_id);
      return NextResponse.redirect(getPricingRedirectUrl(request, "invalid"), 303);
    }

    if (payload.status !== "success") {
      updatePaymentOrder(order.id, {
        status: "failed",
        failedAt: new Date().toISOString(),
        paymentId: payload.payment_id,
      });
      return NextResponse.redirect(getPricingRedirectUrl(request, "failed"), 303);
    }

    if (order.status === "paid") {
      return NextResponse.redirect(getPricingRedirectUrl(request, "success"), 303);
    }

    const updatedUser = addUserCredits(order.userId, order.credits);

    if (!updatedUser) {
      console.error("Shopier kredi yükleme kullanıcı hatası:", order.userId);
      return NextResponse.redirect(getPricingRedirectUrl(request, "invalid"), 303);
    }

    updatePaymentOrder(order.id, {
      status: "paid",
      paidAt: new Date().toISOString(),
      paymentId: payload.payment_id,
    });

    return NextResponse.redirect(getPricingRedirectUrl(request, "success"), 303);
  } catch (error) {
    console.error("Shopier callback işleme hatası:", error);
    return NextResponse.redirect(getPricingRedirectUrl(request, "invalid"), 303);
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(getPricingRedirectUrl(request, "invalid"), 303);
}
