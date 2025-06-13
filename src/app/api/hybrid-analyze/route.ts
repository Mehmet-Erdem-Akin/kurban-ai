import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Hibrit AI sistemi için interface'ler
interface HybridAnalysisRequest {
    imageData: string;
    additionalInfo?: {
        animalCategory?: string;
        animalType?: string;
        estimatedAge?: string;
        gender?: string;
        weight?: string;
        healthCondition?: string;
        region?: string;
    };
}

interface MLModelResponse {
    ml_prediction: number;
    gemini_prediction?: number;
    hybrid_prediction: number;
    agreement_score: number;
    confidence: number;
    processing_time: number;
    individual_models?: Record<string, any>;
}

interface HybridAnalysisResult {
    error: boolean;
    animalType: string;
    estimatedWeight: number;
    mlWeight: number;
    geminiWeight: number;
    hybridWeight: number;
    agreementScore: number;
    confidenceScore: number;
    healthScore: number;
    meatYield: number;
    qualityGrade: string;
    marketPrice: number;
    analysisMethod: "hybrid";
    individualModels?: Record<string, any>;
    processingTime: number;
    recommendations: string[];
}

// ML Model Service URL (çevresel değişken olarak ayarlanabilir)
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

// Detaylı fiyat hesaplama fonksiyonu
function calculateDetailedAnalysis(basicAnalysis: {
    animalType: string;
    estimatedWeight: number;
    healthScore: number;
}) {
    const { animalType, estimatedWeight, healthScore } = basicAnalysis;

    // Hayvan kategorisi belirleme
    const isLargeAnimal = ["Dana", "Boğa", "İnek", "Manda"].includes(animalType);

    // Karkas ağırlığı hesaplama
    const carcassPercentage = isLargeAnimal ? 0.55 : 0.50;
    const carcassWeight = estimatedWeight * carcassPercentage;

    // Piyasa fiyatları (2024 güncel fiyatlar)
    const basePricePerKg = isLargeAnimal ? 280 : 320;

    // Sağlık durumu premium
    const healthPremium = healthScore > 90 ? 1.1 : healthScore > 80 ? 1.05 : 1.0;

    // Toplam fiyat hesaplama
    const totalPrice = carcassWeight * basePricePerKg * healthPremium;

    // Hisse hesaplama (büyükbaş için 7 kişilik)
    const sharePrice = isLargeAnimal ? totalPrice / 7 : totalPrice;

    return {
        carcassWeight: Math.round(carcassWeight),
        pricePerKg: Math.round(basePricePerKg * healthPremium),
        totalPrice: Math.round(totalPrice),
        sharePrice: Math.round(sharePrice),
        isLargeAnimal,
        healthPremium: Math.round((healthPremium - 1) * 100)
    };
}

class HybridAnalysisService {

    async callMLService(imageBase64: string, geminiPrediction?: number): Promise<MLModelResponse> {
        try {
            console.log("🤖 ML servisi çağrılıyor...");

            // Base64'den Blob oluştur
            const base64Data = imageBase64.split(',')[1];
            const binaryData = atob(base64Data);
            const bytes = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
                bytes[i] = binaryData.charCodeAt(i);
            }

            // FormData oluştur
            const formData = new FormData();
            const imageBlob = new Blob([bytes], { type: 'image/jpeg' });
            formData.append('file', imageBlob, 'image.jpg');

            if (geminiPrediction) {
                formData.append('gemini_prediction', geminiPrediction.toString());
            }

            // ML servisine istek at
            const response = await fetch(`${ML_SERVICE_URL}/predict/hybrid`, {
                method: 'POST',
                body: formData,
                headers: {
                    // FormData için Content-Type header'ı ekleme
                }
            });

            if (!response.ok) {
                throw new Error(`ML Service hatası: ${response.status}`);
            }

            const result = await response.json();
            console.log("✅ ML servisi başarılı:", result);
            return result;

        } catch (error) {
            console.error("❌ ML servisi hatası:", error);
            // Fallback olarak default değerler döndür
            return {
                ml_prediction: geminiPrediction || 400,
                hybrid_prediction: geminiPrediction || 400,
                agreement_score: 0.5,
                confidence: 0.7,
                processing_time: 0
            };
        }
    }

    async analyzeWithGemini(imageData: string, additionalInfo?: any): Promise<any> {
        try {
            console.log("🧠 Gemini AI analizi başlatılıyor...");

            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            // Kullanıcı bilgilerini prompt'a ekle
            let userInfoSection = "";
            if (additionalInfo && Object.keys(additionalInfo).length > 0) {
                userInfoSection = "\n\nKULLANICI BİLGİLERİ:\n";
                if (additionalInfo.weight) {
                    userInfoSection += `- Kullanıcı Tahmini Ağırlık: ${additionalInfo.weight}\n`;
                }
                if (additionalInfo.animalType) {
                    userInfoSection += `- Hayvan Türü: ${additionalInfo.animalType}\n`;
                }
                if (additionalInfo.estimatedAge) {
                    userInfoSection += `- Tahmini Yaş: ${additionalInfo.estimatedAge}\n`;
                }
            }

            const prompt = `Bu fotoğraftaki kurbanlık hayvanı analiz et ve detaylı bilgi ver.
      
      ÖNEMLİ: Sadece fotoğrafta açık bir şekilde kurbanlık hayvan görüyorsan analiz yap.
      
      ${userInfoSection}
      
      Aşağıdaki JSON formatında cevap ver:
      {
        "error": false,
        "animalType": "Dana/Boğa/İnek/Koç/Koyun/Keçi/Manda/Buzağı",
        "estimatedWeight": "weight in kg as number",
        "healthScore": "score from 70-100",
        "meatYield": "percentage from 60-80",
        "estimatedAge": "age in years",
        "qualityGrade": "A or B",
        "marketPrice": "price in TL as number",
        "confidence": "confidence percentage 80-100",
        "physicalCondition": "description",
        "recommendations": ["array of recommendations"]
      }`;

            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: imageData.split(',')[1],
                        mimeType: "image/jpeg"
                    }
                }
            ]);

            const response = result.response;
            const text = response.text();

            // JSON parse et
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const analysisData = JSON.parse(jsonMatch[0]);
                console.log("✅ Gemini analizi tamamlandı");
                return analysisData;
            } else {
                throw new Error("Gemini'den geçerli JSON yanıtı alınamadı");
            }

        } catch (error) {
            console.error("❌ Gemini analiz hatası:", error);
            throw error;
        }
    }

    async performHybridAnalysis(request: HybridAnalysisRequest): Promise<HybridAnalysisResult> {
        try {
            console.log("🔄 Hibrit analiz başlatılıyor...");
            const startTime = Date.now();

            // 1. Gemini AI analizi
            const geminiResult = await this.analyzeWithGemini(request.imageData, request.additionalInfo);

            if (geminiResult.error) {
                throw new Error(geminiResult.message || "Gemini analizi başarısız");
            }

            // 2. ML Model analizi
            const mlResult = await this.callMLService(request.imageData, geminiResult.estimatedWeight);

            // 3. Sonuçları birleştir
            const hybridResult: HybridAnalysisResult = {
                error: false,
                animalType: geminiResult.animalType,
                estimatedWeight: mlResult.hybrid_prediction,
                mlWeight: mlResult.ml_prediction,
                geminiWeight: geminiResult.estimatedWeight,
                hybridWeight: mlResult.hybrid_prediction,
                agreementScore: mlResult.agreement_score,
                confidenceScore: mlResult.confidence,
                healthScore: geminiResult.healthScore,
                meatYield: geminiResult.meatYield,
                qualityGrade: geminiResult.qualityGrade,
                marketPrice: geminiResult.marketPrice,
                analysisMethod: "hybrid",
                individualModels: mlResult.individual_models,
                processingTime: Date.now() - startTime,
                recommendations: [
                    ...geminiResult.recommendations,
                    this.generateHybridRecommendations(mlResult.agreement_score)
                ]
            };

            console.log("✅ Hibrit analiz tamamlandı");
            return hybridResult;

        } catch (error) {
            console.error("❌ Hibrit analiz hatası:", error);
            throw error;
        }
    }

    private generateHybridRecommendations(agreementScore: number): string {
        if (agreementScore > 0.8) {
            return "Yüksek model uyumu: Tahmin güvenilir";
        } else if (agreementScore > 0.6) {
            return "Orta model uyumu: Ek fotoğraf önerilir";
        } else {
            return "Düşük model uyumu: Farklı açılardan fotoğraf çekin";
        }
    }
}

// Hibrit servis instance
const hybridService = new HybridAnalysisService();

export async function POST(request: NextRequest) {
    try {
        console.log("🚀 Hibrit analiz API çağrısı alındı");

        const body = await request.json();
        const { imageData, additionalInfo } = body;

        // Hibrit analiz gerçekleştir
        const result = await hybridService.performHybridAnalysis({
            imageData,
            additionalInfo
        });

        // Detaylı fiyat hesaplaması
        const detailedAnalysis = calculateDetailedAnalysis({
            animalType: result.animalType,
            estimatedWeight: result.hybridWeight,
            healthScore: result.healthScore
        });

        // Final response
        const response = {
            ...result,
            ...detailedAnalysis,
            analysisSource: "hybrid_ai_system",
            version: "2.0"
        };

        console.log("✅ Hibrit analiz başarıyla tamamlandı");
        return NextResponse.json(response);

    } catch (error) {
        console.error("❌ Hibrit analiz API hatası:", error);

        return NextResponse.json({
            error: true,
            errorType: "HYBRID_ANALYSIS_FAILED",
            message: "Hibrit analiz işlemi başarısız oldu",
            details: error instanceof Error ? error.message : "Bilinmeyen hata"
        }, { status: 500 });
    }
}
