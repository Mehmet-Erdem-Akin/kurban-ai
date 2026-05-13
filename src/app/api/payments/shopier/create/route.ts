import { NextRequest, NextResponse } from "next/server";
import { getCreditPackageById } from "@/config/creditPackages";
import { getCurrentUser, toSafeUser } from "@/lib/auth";
import { createPaymentOrder } from "@/lib/paymentOrders";
import { createShopierPaymentForm } from "@/lib/shopier";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Paket satın almak için giriş yapmanız gerekiyor" },
        { status: 401 },
      );
    }

    if (!process.env.SHOPIER_API_KEY || !process.env.SHOPIER_API_SECRET) {
      return NextResponse.json(
        { error: "Shopier ödeme ayarları eksik" },
        { status: 500 },
      );
    }

    const { packageId } = await request.json();
    const creditPackage = getCreditPackageById(String(packageId));

    if (!creditPackage) {
      return NextResponse.json(
        { error: "Geçersiz paket seçimi" },
        { status: 400 },
      );
    }

    const order = createPaymentOrder({
      userId: user.id,
      packageId: creditPackage.id,
      packageName: `${creditPackage.name} - ${creditPackage.creditCount} kredi`,
      credits: creditPackage.creditCount,
      amount: creditPackage.price,
    });
    const callbackUrl = new URL(
      "/api/payments/shopier/callback",
      process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin,
    ).toString();
    const paymentForm = createShopierPaymentForm({
      order,
      user: toSafeUser(user),
      callbackUrl,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentUrl: paymentForm.paymentUrl,
      fields: paymentForm.fields,
    });
  } catch (error) {
    console.error("Shopier ödeme başlatma hatası:", error);
    return NextResponse.json(
      { error: "Ödeme başlatılırken sunucu hatası oluştu" },
      { status: 500 },
    );
  }
}
