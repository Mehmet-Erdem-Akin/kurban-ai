import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getUserByEmail, createUser } from "@/lib/db";
import { hashPassword, createToken, setAuthCookie, toSafeUser } from "@/lib/auth";

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const { name, surname, email, password, phone, address, usagePurpose } =
      await request.json();

    if (!name || !surname || !email || !password) {
      return NextResponse.json(
        { error: "Ad, soyad, email ve şifre alanları zorunludur" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi girin" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalıdır" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await getUserByEmail(normalizedEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kayıtlı" },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      id: randomUUID(),
      name: name.trim(),
      surname: surname.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone?.trim() || "",
      address: address?.trim() || "",
      usagePurpose: usagePurpose || "",
      remainingCredits: 3,
      createdAt: new Date().toISOString(),
    });

    const token = await createToken(newUser.id);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: "Kayıt başarılı! Hoş geldiniz.",
      user: toSafeUser(newUser),
    });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu" },
      { status: 500 },
    );
  }
}
