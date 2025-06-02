"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";

export default function AnalyzePage() {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imagePromises = Array.from(files).map((file) => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve(e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(imagePromises).then((images) => {
                setSelectedImages(images);
                setCurrentImageIndex(0);
            });
        }
    };

    const startCamera = async () => {
        try {
            console.log('🚀 Kamera başlatılıyor...');

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280, min: 640 },
                    height: { ideal: 720, min: 480 }
                }
            });

            console.log('✅ Kamera erişimi başarılı', stream.getVideoTracks());
            setCameraStream(stream);
            setShowCamera(true);

            // Video element'e stream'i bağla
            setTimeout(() => {
                if (cameraRef.current) {
                    console.log('📹 Video element\'e stream bağlanıyor...');
                    cameraRef.current.srcObject = stream;

                    // Video yüklenme event'lerini dinle
                    cameraRef.current.onloadedmetadata = () => {
                        console.log('✅ Video metadata yüklendi:', {
                            width: cameraRef.current?.videoWidth,
                            height: cameraRef.current?.videoHeight
                        });
                    };

                    cameraRef.current.onloadeddata = () => {
                        console.log('✅ Video data yüklendi');
                        // Video'yu oynatmaya zorla
                        cameraRef.current?.play().catch(e => {
                            console.log('Video autoplay engellendi, manuel başlatılıyor:', e);
                        });
                    };

                    cameraRef.current.onerror = (error) => {
                        console.error('❌ Video element hatası:', error);
                    };
                } else {
                    console.error('❌ Video element ref bulunamadı');
                }
            }, 100);

        } catch (error) {
            console.error('❌ Kamera erişim hatası:', error);

            if (error instanceof Error) {
                switch (error.name) {
                    case 'NotAllowedError':
                        alert('Kamera izni reddedildi. Lütfen tarayıcı ayarlarından kameraya izin verin.');
                        break;
                    case 'NotFoundError':
                        alert('Kamera bulunamadı. Lütfen cihazınızda kamera olduğundan emin olun.');
                        break;
                    case 'NotReadableError':
                        alert('Kamera başka bir uygulama tarafından kullanılıyor.');
                        break;
                    default:
                        alert('Kamera erişimi başarısız: ' + error.message);
                }
            }
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach((track: MediaStreamTrack) => {
                track.stop();
            });
            setCameraStream(null);
        }

        if (cameraRef.current) {
            cameraRef.current.srcObject = null;
        }

        setShowCamera(false);
        console.log('🔴 Kamera kapatıldı');
    };

    const capturePhoto = () => {
        if (!cameraRef.current || !canvasRef.current) {
            alert('Kamera hazır değil. Lütfen bekleyin.');
            return;
        }

        const video = cameraRef.current;
        const canvas = canvasRef.current;

        // Video boyutlarını kontrol et
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            alert('Video henüz yüklenmedi. Lütfen bekleyin.');
            return;
        }

        try {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            if (!context) {
                alert('Canvas context alınamadı.');
                return;
            }

            // Fotoğraf çek
            context.drawImage(video, 0, 0);
            const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);

            console.log('📸 Fotoğraf çekildi');

            // Fotoğrafı listeye ekle
            const newImages = [...selectedImages, imageDataUrl];
            setSelectedImages(newImages);
            setCurrentImageIndex(newImages.length - 1);

            // Kamerayı kapat
            stopCamera();

            console.log('✅ Fotoğraf başarıyla eklendi. Toplam:', newImages.length);
        } catch (error) {
            console.error('❌ Fotoğraf çekme hatası:', error);
            alert('Fotoğraf çekerken hata oluştu.');
        }
    };

    const handleAnalyze = async () => {
        if (selectedImages.length === 0) return;

        setIsAnalyzing(true);

        // API çağrısı için mevcut resmi kullan
        const currentImage = selectedImages[currentImageIndex];

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: currentImage,
                    imageIndex: currentImageIndex + 1,
                    totalImages: selectedImages.length
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setAnalysisResult(result);
            } else {
                throw new Error('Analiz başarısız');
            }
        } catch (error) {
            console.error('Analiz hatası:', error);
            alert('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleAnalyzeAll = async () => {
        if (selectedImages.length === 0) return;

        setIsAnalyzing(true);

        try {
            console.log(`🚀 ${selectedImages.length} fotoğraf analiz ediliyor...`);

            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    images: selectedImages, // Tüm fotoğrafları gönder
                    totalImages: selectedImages.length,
                    analysisType: 'multiple'
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setAnalysisResult(result);
                console.log(`✅ ${selectedImages.length} fotoğraf başarıyla analiz edildi`);
            } else {
                throw new Error('Çoklu analiz başarısız');
            }
        } catch (error) {
            console.error('Çoklu analiz hatası:', error);
            alert('Çoklu analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        setSelectedImages([]);
        setCurrentImageIndex(0);
        setAnalysisResult(null);
        setIsAnalyzing(false);
    };

    const switchImage = (index: number) => {
        setCurrentImageIndex(index);
        setAnalysisResult(null); // Yeni resim seçildiğinde analizi sıfırla
    };

    const removeImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);

        if (newImages.length === 0) {
            setCurrentImageIndex(0);
            setAnalysisResult(null);
        } else if (currentImageIndex >= newImages.length) {
            setCurrentImageIndex(newImages.length - 1);
        }
    };

    const getCurrentImage = () => {
        return selectedImages[currentImageIndex] || null;
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

                    {!selectedImages.length && !analysisResult && !showCamera && (
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                                    </svg>
                                    Galeriden Seç
                                </button>

                                <button onClick={startCamera} className="btn btn-secondary btn-lg">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Kamera Aç
                                </button>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    )}

                    {/* Camera Preview */}
                    {showCamera && (
                        <div className="card p-8 text-center animate-scale-in">
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Kamera Görünümü</h3>

                            <div className="relative w-full max-w-lg mx-auto mb-6">
                                <video
                                    ref={cameraRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    style={{
                                        width: '100%',
                                        height: '320px',
                                        objectFit: 'cover',
                                        backgroundColor: '#1f2937'
                                    }}
                                    className="rounded-lg border-2 border-gray-200"
                                />
                                <canvas ref={canvasRef} style={{ display: 'none' }} />

                                {/* Kamera frame overlay */}
                                <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-lg pointer-events-none">
                                    <div className="absolute top-4 left-4 right-4 text-white text-sm font-medium bg-black/50 rounded px-2 py-1">
                                        Hayvanı çerçeveye yerleştirin
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={capturePhoto} className="btn btn-primary btn-lg">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Fotoğraf Çek
                                </button>

                                <button
                                    onClick={() => {
                                        console.log('🔍 Video debug bilgileri:', {
                                            videoElement: cameraRef.current,
                                            srcObject: cameraRef.current?.srcObject,
                                            videoWidth: cameraRef.current?.videoWidth,
                                            videoHeight: cameraRef.current?.videoHeight,
                                            readyState: cameraRef.current?.readyState,
                                            currentTime: cameraRef.current?.currentTime,
                                            paused: cameraRef.current?.paused,
                                            ended: cameraRef.current?.ended
                                        });
                                    }}
                                    className="btn btn-accent btn-lg"
                                >
                                    Debug Video
                                </button>

                                <button onClick={stopCamera} className="btn btn-secondary btn-lg">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    İptal
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedImages.length > 0 && !analysisResult && !isAnalyzing && (
                        <div className="card p-8 animate-scale-in">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                                    Seçilen Fotoğraflar ({selectedImages.length})
                                </h3>
                                <p className="text-neutral-600">Analiz etmek istediğiniz fotoğrafı seçin</p>
                            </div>

                            {/* Image Thumbnails */}
                            {selectedImages.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto p-2 mb-6 bg-gray-50 rounded-lg">
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="relative flex-shrink-0">
                                            <img
                                                src={image}
                                                alt={`Fotoğraf ${index + 1}`}
                                                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all ${currentImageIndex === index
                                                    ? 'border-green-500 ring-2 ring-green-200'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                onClick={() => switchImage(index)}
                                            />
                                            <button
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Current Image */}
                            <div className="relative max-w-md mx-auto mb-6">
                                {getCurrentImage() && (
                                    <img
                                        src={getCurrentImage()!}
                                        alt={`Seçilen hayvan ${currentImageIndex + 1}`}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                )}
                                {selectedImages.length > 1 && (
                                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                        {currentImageIndex + 1} / {selectedImages.length}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 justify-center">
                                {/* Tek fotoğraf analizi için ana buton */}
                                <button
                                    onClick={handleAnalyze}
                                    className="btn btn-primary btn-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Bu Fotoğrafı Analiz Et
                                </button>

                                {/* Çoklu fotoğraf analizi butonu - sadece birden fazla fotoğraf varsa göster */}
                                {selectedImages.length > 1 && (
                                    <button
                                        onClick={handleAnalyzeAll}
                                        className="btn btn-accent btn-lg"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Tüm Fotoğrafları Analiz Et ({selectedImages.length} adet)
                                    </button>
                                )}

                                {/* Yardımcı butonlar */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="btn btn-secondary btn-md"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Daha Fazla Ekle
                                    </button>

                                    <button
                                        onClick={resetAnalysis}
                                        className="btn btn-secondary btn-md"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Temizle
                                    </button>
                                </div>
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