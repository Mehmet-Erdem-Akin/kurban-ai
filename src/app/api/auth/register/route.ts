import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

// Simple email validation
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const getUsersDB = () => {
  const dbPath = join(process.cwd(), "data", "users.json");

  if (!existsSync(dbPath)) {
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      require("fs").mkdirSync(dataDir, { recursive: true });
    }

    const initialData = {
      users: [
        {
          id: "1",
          email: "demo@kurbanaliz.com",
          password: "demo123",
          name: "Demo Kullanıcı",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  return JSON.parse(readFileSync(dbPath, "utf-8"));
};

const saveUsersDB = (data: any) => {
  const dbPath = join(process.cwd(), "data", "users.json");
  writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Tüm alanlar gerekli" },
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
        { error: "Şifre en az 6 karakter olmalı" },
        { status: 400 },
      );
    }

    const db = getUsersDB();

    // Check if user already exists
    const existingUser = db.users.find((u: any) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kayıtlı" },
        { status: 409 },
      );
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, hash this!
      name,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    saveUsersDB(db);

    // Create token
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString("base64");

    return NextResponse.json({
      success: true,
      message: "Kayıt başarılı!",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
