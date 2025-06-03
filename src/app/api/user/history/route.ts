import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

interface Analysis {
  id: string;
  userId: string;
  createdAt: string;
  [key: string]: unknown;
}

interface AnalysisDatabase {
  analyses: Analysis[];
}

const getAnalysisDB = (): AnalysisDatabase => {
  const dbPath = join(process.cwd(), "data", "analyses.json");

  if (!existsSync(dbPath)) {
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    const initialData: AnalysisDatabase = { analyses: [] };
    writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  return JSON.parse(readFileSync(dbPath, "utf-8"));
};

const getUserFromToken = (token: string) => {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const [userId] = decoded.split(":");
    return userId;
  } catch {
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Token gerekli" }, { status: 401 });
    }

    const userId = getUserFromToken(token);
    if (!userId) {
      return NextResponse.json({ error: "Geçersiz token" }, { status: 401 });
    }

    const db = getAnalysisDB();
    const userAnalyses = db.analyses.filter(
      (analysis: Analysis) => analysis.userId === userId,
    );

    return NextResponse.json({
      success: true,
      analyses: userAnalyses.sort(
        (a: Analysis, b: Analysis) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    });
  } catch (error) {
    console.error("History error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Token gerekli" }, { status: 401 });
    }

    const userId = getUserFromToken(token);
    if (!userId) {
      return NextResponse.json({ error: "Geçersiz token" }, { status: 401 });
    }

    const { analysis } = await request.json();

    const db = getAnalysisDB();
    const newAnalysis: Analysis = {
      id: Date.now().toString(),
      userId,
      ...analysis,
      createdAt: new Date().toISOString(),
    };

    db.analyses.push(newAnalysis);
    writeFileSync(
      join(process.cwd(), "data", "analyses.json"),
      JSON.stringify(db, null, 2),
    );

    return NextResponse.json({
      success: true,
      message: "Analiz kaydedildi",
      analysis: newAnalysis,
    });
  } catch (error) {
    console.error("Save analysis error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
