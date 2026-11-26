import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

type AnalysisPayload = Record<string, unknown>;

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

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Token gerekli" }, { status: 401 });
    }

    const userAnalyses = await prisma.analysis.findMany({
      where: { userId: user.id },
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
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Token gerekli" }, { status: 401 });
    }

    const { analysis } = await request.json();
    const analysisPayload: AnalysisPayload =
      analysis && typeof analysis === "object" && !Array.isArray(analysis)
        ? (analysis as AnalysisPayload)
        : {};

    const newAnalysis = await prisma.analysis.create({
      data: {
        userId: user.id,
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
