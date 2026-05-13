import { NextResponse } from "next/server";
import { getCurrentUser, toSafeUser } from "@/lib/auth";
import { decrementUserCredit } from "@/lib/db";

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Hesaplama yapmak için giriş yapmanız gerekiyor" },
        { status: 401 },
      );
    }

    const updatedUser = decrementUserCredit(user.id);

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Kredi hakkınız kalmadı" },
        { status: 402 },
      );
    }

    return NextResponse.json({
      success: true,
      user: toSafeUser(updatedUser),
    });
  } catch (error) {
    console.error("Kredi düşme hatası:", error);
    return NextResponse.json(
      { error: "Kredi işlemi sırasında sunucu hatası oluştu" },
      { status: 500 },
    );
  }
}
