import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

type AnalysisPayload = Record<string, unknown>;

const getUserFromToken = (token: string) => {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const [userId] = decoded.split(":");
    return userId;
  } catch {
    return null;
  }
};

const toAnalysisResponse = ({
  id,
  userId,
  payload,
  createdAt,
}: {
  id: string;
  userId: string;
  payload: unknown;
  createdAt: Date;
}) => {
  const normalizedPayload =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? (payload as AnalysisPayload)
      : {};

  return {
    ...normalizedPayload,
    id,
    userId,
    createdAt: createdAt.toISOString(),
  };
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

    const userAnalyses = await prisma.analysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      analyses: userAnalyses.map(toAnalysisResponse),
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
    const analysisPayload: AnalysisPayload =
      analysis && typeof analysis === "object" && !Array.isArray(analysis)
        ? (analysis as AnalysisPayload)
        : {};

    const newAnalysis = await prisma.analysis.create({
      data: {
        userId,
        payload: analysisPayload as Prisma.InputJsonObject,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Analiz kaydedildi",
      analysis: toAnalysisResponse(newAnalysis),
    });
  } catch (error) {
    console.error("Save analysis error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
