import { NextResponse } from "next/server";

// Mock market data - In production, this would come from a real API
const generateMarketPrices = () => {
  const baseDate = new Date();

  return {
    lastUpdated: baseDate.toISOString(),
    region: "İstanbul",
    currency: "TL",
    livestock: {
      cattle: {
        name: "Dana/Büyükbaş",
        priceRange: {
          min: 85000,
          max: 130000,
          average: 107500,
        },
        pricePerKg: {
          min: 180,
          max: 220,
          average: 200,
        },
        trend: Math.random() > 0.5 ? "up" : "down",
        changePercent: (Math.random() * 10 - 5).toFixed(1), // -5% to +5%
      },
      sheep: {
        name: "Koç/Koyun",
        priceRange: {
          min: 8000,
          max: 15000,
          average: 11500,
        },
        pricePerKg: {
          min: 160,
          max: 200,
          average: 180,
        },
        trend: Math.random() > 0.5 ? "up" : "down",
        changePercent: (Math.random() * 8 - 4).toFixed(1), // -4% to +4%
      },
      goat: {
        name: "Keçi",
        priceRange: {
          min: 6000,
          max: 12000,
          average: 9000,
        },
        pricePerKg: {
          min: 150,
          max: 190,
          average: 170,
        },
        trend: Math.random() > 0.5 ? "up" : "down",
        changePercent: (Math.random() * 6 - 3).toFixed(1), // -3% to +3%
      },
    },
    marketInsights: [
      "Kurban bayramına yakın dönemde fiyatlarda artış bekleniyor",
      "Kaliteli hayvanlar için prim ödeme eğilimi devam ediyor",
      "Yerel üreticilerden alım yaparak maliyetleri düşürebilirsiniz",
      "Sağlık durumu iyi hayvanları tercih edin",
    ],
  };
};

export async function GET() {
  try {
    const marketData = generateMarketPrices();

    return NextResponse.json({
      success: true,
      data: marketData,
    });
  } catch (error) {
    console.error("Market prices error:", error);
    return NextResponse.json(
      { error: "Piyasa verileri alınamadı" },
      { status: 500 },
    );
  }
}
