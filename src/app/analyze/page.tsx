"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";

export default function AnalyzePage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);

        // Simulated analysis - replace with actual AI API call
        setTimeout(() => {
            setAnalysisResult({
                animalType: "Dana",
                breed: "Simmental",
                estimatedWeight: 450,
                healthScore: 92,
                marketValue: 45000,
                meatYield: {
                    totalMeat: 270,
                    bonelessMeat: 195,
                    boneWeight: 75
                },
                costPerShare: 6428,
                confidence: 94
            });
            setIsAnalyzing(false);
        }, 3000);
    };

    const resetAnalysis = () => {
        setSelectedImage(null);
        setAnalysisResult(null);
        setIsAnalyzing(false);
    };

    return (
        <div className="min-h-screen hero-gradient">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-soft">
                            <span className="text-white text-lg font-bold">KA</span>
                        </div>
                        <span className="text-2xl font-bold text-neutral-800">Kurbanlık Analiz</span>
                    </Link>
                    <Link href="/" className="btn btn-secondary btn-md">
                        Ana Sayfa
                    </Link>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                            Hayvan Analizi
                        </h1>
                        <p className="text-xl text-neutral-600">
                            Fotoğraf yükleyin ve yapay zeka analizini başlatın
                        </p>
                    </div>

                    {!selectedImage && !analysisResult && (
                        <div className="card p-12 text-center animate-fade-in">
                            <div className="icon-container-primary mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Fotoğraf Yükleyin</h3>
                            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                                Analiz etmek istediğiniz hayvanın net bir fotoğrafını seçin
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="btn btn-primary btn-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Galeriden Seç
                                </button>

                                <button className="btn btn-secondary btn-lg">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Kamera ile Çek
                                </button>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    )}

                    {selectedImage && !analysisResult && !isAnalyzing && (
                        <div className="card p-8 animate-scale-in">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Seçilen Fotoğraf</h3>
                                <p className="text-neutral-600">Analizi başlatmak için butona tıklayın</p>
                            </div>

                            <div className="relative max-w-md mx-auto mb-6">
                                <img
                                    src={selectedImage}
                                    alt="Seçilen hayvan"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleAnalyze}
                                    className="btn btn-primary btn-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Analizi Başlat
                                </button>

                                <button
                                    onClick={resetAnalysis}
                                    className="btn btn-secondary btn-lg"
                                >
                                    Yeni Fotoğraf
                                </button>
                            </div>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="card p-12 text-center animate-fade-in">
                            <div className="w-16 h-16 mx-auto mb-6 relative">
                                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Analiz Yapılıyor...</h3>
                            <p className="text-neutral-600 mb-8">
                                Yapay zeka modelimiz fotoğrafınızı inceliyor. Bu işlem birkaç saniye sürebilir.
                            </p>

                            <div className="progress max-w-md mx-auto mb-4">
                                <div className="progress-primary w-3/4"></div>
                            </div>
                            <p className="text-sm text-neutral-500">%75 tamamlandı</p>
                        </div>
                    )}

                    {analysisResult && (
                        <div className="space-y-6 animate-slide-up">
                            {/* Analysis Success */}
                            <div className="card p-6 bg-gradient-to-r from-success/10 to-primary-50 border-success/20">
                                <div className="flex items-center">
                                    <div className="icon-container bg-success/20 text-success mr-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900">Analiz Tamamlandı!</h3>
                                        <p className="text-neutral-600">%{analysisResult.confidence} güven oranı ile analiz edildi</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Results */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="text-xl font-bold text-neutral-900">Hayvan Bilgileri</h3>
                                    </div>
                                    <div className="card-body space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Tür:</span>
                                            <span className="font-semibold">{analysisResult.animalType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Cins:</span>
                                            <span className="font-semibold">{analysisResult.breed}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Tahmini Ağırlık:</span>
                                            <span className="font-semibold">{analysisResult.estimatedWeight} kg</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Sağlık Skoru:</span>
                                            <span className="font-semibold flex items-center">
                                                {analysisResult.healthScore}/100
                                                <span className="badge badge-success ml-2">Mükemmel</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="text-xl font-bold text-neutral-900">Ekonomik Analiz</h3>
                                    </div>
                                    <div className="card-body space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Tahmini Değer:</span>
                                            <span className="font-semibold text-primary-600">{analysisResult.marketValue.toLocaleString()} ₺</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Hisse Başı (7 kişi):</span>
                                            <span className="font-semibold">{analysisResult.costPerShare.toLocaleString()} ₺</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Toplam Et:</span>
                                            <span className="font-semibold">{analysisResult.meatYield.totalMeat} kg</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Kemiksiz Et:</span>
                                            <span className="font-semibold">{analysisResult.meatYield.bonelessMeat} kg</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="btn btn-primary btn-lg">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Favorilere Ekle
                                </button>

                                <button className="btn btn-accent btn-lg">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                    Paylaş
                                </button>

                                <button
                                    onClick={resetAnalysis}
                                    className="btn btn-secondary btn-lg"
                                >
                                    Yeni Analiz
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
} 