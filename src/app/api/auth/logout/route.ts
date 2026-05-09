import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearAuthCookie();

    return NextResponse.json({
      success: true,
      message: "Çıkış başarılı!",
    });
  } catch (error) {
    console.error("Çıkış hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu" },
      { status: 500 },
    );
  }
}
