import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// Mock users database - JSON file
const getUsersDB = () => {
  const dbPath = join(process.cwd(), "data", "users.json");

  if (!existsSync(dbPath)) {
    // Create directory and initial database
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    const initialData = {
      users: [
        {
          id: "1",
          email: "demo@kurbanaliz.com",
          password: "demo123", // In real app, this would be hashed
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

/*const saveUsersDB = (data: any) => {
    const dbPath = join(process.cwd(), "data", "users.json");
    writeFileSync(dbPath, JSON.stringify(data, null, 2));
};*/

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ve şifre gerekli" },
        { status: 400 },
      );
    }

    const db = getUsersDB();
    const user = db.users.find(
      (u: { email: string; password: string; id: string; name: string }) =>
        u.email === email,
    );

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Geçersiz email veya şifre" },
        { status: 401 },
      );
    }

    // Create a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
