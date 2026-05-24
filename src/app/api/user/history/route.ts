import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

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

const getAuthenticatedUserId = async (request: NextRequest) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return currentUser.id;
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  return token ? getUserFromToken(token) : null;
};

const getNestedObject = (
  payload: AnalysisPayload,
  key: string,
): AnalysisPayload => {
  const value = payload[key];

  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AnalysisPayload)
    : {};
};

const getEstimatedCost = (result: AnalysisPayload) => {
  const pricing = getNestedObject(result, "pricing");
  const estimatedMeatValue = pricing.estimatedMeatValue;

  if (typeof estimatedMeatValue === "number") {
    return estimatedMeatValue;
  }

  return typeof result.marketValue === "number" ? result.marketValue : 0;
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
  const result = getNestedObject(normalizedPayload, "result");
  const analysisDate =
    typeof result.analysisDate === "string" ? result.analysisDate : null;

  return {
    ...normalizedPayload,
    id,
    userId,
    createdAt: createdAt.toISOString(),
    date: analysisDate ?? createdAt.toISOString(),
    animalType:
      typeof result.animalType === "string" ? result.animalType : "Bilinmiyor",
    estimatedWeight:
      typeof result.estimatedWeight === "number" ? result.estimatedWeight : 0,
    estimatedCost: getEstimatedCost(result),
  };
};

export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
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
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
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
