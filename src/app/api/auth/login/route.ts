import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/db";
import {
  verifyPassword,
  createToken,
  setAuthCookie,
  toSafeUser,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ve şifre gereklidir" },
        { status: 400 },
      );
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Geçersiz email veya şifre" },
        { status: 401 },
      );
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Geçersiz email veya şifre" },
        { status: 401 },
      );
    }

    const token = await createToken(user.id);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: "Giriş başarılı!",
      user: toSafeUser(user),
    });
  } catch (error) {
    console.error("Giriş hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu" },
      { status: 500 },
    );
  }
}
