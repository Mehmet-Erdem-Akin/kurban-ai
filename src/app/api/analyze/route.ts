import { NextRequest, NextResponse } from 'next/server';

// Mock Gemini API - Replace with real Gemini API key
const analyzeImageWithGemini = async (imageData: string) => {
    // For now, return mock data. You'll replace this with real Gemini API call
    const mockAnalysis = {
        animalType: Math.random() > 0.5 ? 'Dana' : 'Koç',
        breed: Math.random() > 0.5 ? 'Holstein' : 'Simmental',
        estimatedWeight: Math.floor(Math.random() * 200) + 300, // 300-500kg
        healthScore: Math.floor(Math.random() * 30) + 70, // 70-100
        meatYield: Math.floor(Math.random() * 20) + 60, // 60-80%
        estimatedAge: Math.floor(Math.random() * 3) + 2, // 2-5 years
        qualityGrade: Math.random() > 0.3 ? 'A' : 'B',
        marketPrice: Math.floor(Math.random() * 50000) + 80000, // 80k-130k TL
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
    };

    return mockAnalysis;
};

const calculateDetailedAnalysis = (basicAnalysis: any) => {
    const { animalType, estimatedWeight, healthScore, meatYield, marketPrice } = basicAnalysis;

    // Calculate meat amount
    const totalMeatKg = Math.floor(estimatedWeight * (meatYield / 100));
    const pricePerKg = Math.floor(marketPrice / totalMeatKg);

    // Calculate shares (hisse)
    const shares = animalType === 'Dana' ? 7 : 1;
    const shareWeight = Math.floor(totalMeatKg / shares);
    const sharePrice = Math.floor(marketPrice / shares);

    return {
        totalMeatKg,
        pricePerKg,
        shares,
        shareWeight,
        sharePrice,
        recommendations: [
            healthScore > 85 ? "Mükemmel sağlık durumu" : "İyi sağlık durumu",
            meatYield > 70 ? "Yüksek et verimi" : "Orta et verimi",
            marketPrice > 100000 ? "Piyasa ortalaması üstü fiyat" : "Uygun fiyat"
        ]
    };
};

export async function POST(request: NextRequest) {
    try {
        // Parse JSON data instead of FormData
        const body = await request.json();
        const { image, images, imageIndex, totalImages, analysisType } = body;

        // Çoklu fotoğraf analizi
        if (analysisType === 'multiple' && images && Array.isArray(images)) {
            console.log(`🔬 ${images.length} fotoğraf analiz ediliyor...`);

            // Her fotoğraf için analiz yap
            const analysisResults = [];

            for (let i = 0; i < images.length; i++) {
                const currentImage = images[i];
                const base64Image = currentImage.replace(/^data:image\/[a-z]+;base64,/, '');

                // Simulate processing time per image
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get AI analysis (mock for now)
                const basicAnalysis = await analyzeImageWithGemini(base64Image);
                const detailedAnalysis = calculateDetailedAnalysis(basicAnalysis);

                const singleResult = {
                    imageIndex: i + 1,
                    animalType: basicAnalysis.animalType,
                    breed: basicAnalysis.breed,
                    estimatedWeight: basicAnalysis.estimatedWeight,
                    healthScore: basicAnalysis.healthScore,
                    marketValue: basicAnalysis.marketPrice,
                    meatYield: {
                        totalMeat: detailedAnalysis.totalMeatKg,
                        bonelessMeat: Math.floor(detailedAnalysis.totalMeatKg * 0.75),
                        boneWeight: Math.floor(detailedAnalysis.totalMeatKg * 0.25)
                    },
                    costPerShare: detailedAnalysis.sharePrice,
                    confidence: basicAnalysis.confidence
                };

                analysisResults.push(singleResult);
                console.log(`✅ Fotoğraf ${i + 1}/${images.length} analiz edildi`);
            }

            // Çoklu analiz sonuçlarını birleştir
            const totalWeight = analysisResults.reduce((sum, r) => sum + r.estimatedWeight, 0);
            const avgHealthScore = Math.floor(analysisResults.reduce((sum, r) => sum + r.healthScore, 0) / analysisResults.length);
            const totalValue = analysisResults.reduce((sum, r) => sum + r.marketValue, 0);
            const totalMeat = analysisResults.reduce((sum, r) => sum + r.meatYield.totalMeat, 0);
            const avgConfidence = Math.floor(analysisResults.reduce((sum, r) => sum + r.confidence, 0) / analysisResults.length);

            const combinedResult = {
                success: true,
                analysisType: 'multiple',
                totalImages: images.length,
                animalType: `${images.length} Hayvan`,
                breed: 'Karışık',
                estimatedWeight: totalWeight,
                healthScore: avgHealthScore,
                marketValue: totalValue,
                meatYield: {
                    totalMeat: totalMeat,
                    bonelessMeat: Math.floor(totalMeat * 0.75),
                    boneWeight: Math.floor(totalMeat * 0.25)
                },
                costPerShare: Math.floor(totalValue / 7), // 7 kişilik hisse
                confidence: avgConfidence,
                analysisDate: new Date().toISOString(),
                individualResults: analysisResults // Her fotoğrafın detaylı sonucu
            };

            return NextResponse.json(combinedResult);
        }

        // Tek fotoğraf analizi (mevcut kod)
        if (!image) {
            return NextResponse.json(
                { error: 'Resim verisi gerekli' },
                { status: 400 }
            );
        }

        // Remove data:image/jpeg;base64, prefix if present
        const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '');

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get AI analysis (mock for now)
        const basicAnalysis = await analyzeImageWithGemini(base64Image);
        const detailedAnalysis = calculateDetailedAnalysis(basicAnalysis);

        const result = {
            success: true,
            analysisType: 'single',
            animalType: basicAnalysis.animalType,
            breed: basicAnalysis.breed,
            estimatedWeight: basicAnalysis.estimatedWeight,
            healthScore: basicAnalysis.healthScore,
            marketValue: basicAnalysis.marketPrice,
            meatYield: {
                totalMeat: detailedAnalysis.totalMeatKg,
                bonelessMeat: Math.floor(detailedAnalysis.totalMeatKg * 0.75),
                boneWeight: Math.floor(detailedAnalysis.totalMeatKg * 0.25)
            },
            costPerShare: detailedAnalysis.sharePrice,
            confidence: basicAnalysis.confidence,
            analysisDate: new Date().toISOString(),
            imageIndex: imageIndex || 1,
            totalImages: totalImages || 1
        };

        return NextResponse.json(result);

    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json(
            { error: 'Analiz sırasında hata oluştu' },
            { status: 500 }
        );
    }
} 