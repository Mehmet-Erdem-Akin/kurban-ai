"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";

interface AnalysisResult {
  success: boolean;
  analysisType: string;
  animalType: string;
  breed: string;
  estimatedWeight: number;
  healthScore: number;
  marketValue: number;
  meatYield: {
    totalMeat: number;
    karkasWeight: number;
    bonelessMeat: number;
    boneWeight: number;
    yieldRatios: {
      karkasYield: number;
      bonelessYield: number;
      totalYield: number;
    };
  };
  pricing: {
    liveWeightPrice: number;
    meatPrice: number;
    estimatedMeatValue: number;
  };
  costPerShare: number;
  confidence: number;
  recommendations: string[];
  analysisDate: string;
  totalImages: number;
  analysisNote?: string;
}

export default function AnalyzePage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
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
      console.log("🚀 Kamera başlatılıyor...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      });

      console.log("✅ Kamera erişimi başarılı", stream.getVideoTracks());
      setCameraStream(stream);
      setShowCamera(true);

      // Video element'e stream'i bağla
      setTimeout(() => {
        if (cameraRef.current) {
          console.log("📹 Video element'e stream bağlanıyor...");
          cameraRef.current.srcObject = stream;

          // Video yüklenme event'lerini dinle
          cameraRef.current.onloadedmetadata = () => {
            console.log("✅ Video metadata yüklendi:", {
              width: cameraRef.current?.videoWidth,
              height: cameraRef.current?.videoHeight,
            });
          };

          cameraRef.current.onloadeddata = () => {
            console.log("✅ Video data yüklendi");
            // Video'yu oynatmaya zorla
            cameraRef.current?.play().catch((e) => {
              console.log("Video autoplay engellendi, manuel başlatılıyor:", e);
            });
          };

          cameraRef.current.onerror = (error) => {
            console.error("❌ Video element hatası:", error);
          };
        } else {
          console.error("❌ Video element ref bulunamadı");
        }
      }, 100);
    } catch (error) {
      console.error("❌ Kamera erişim hatası:", error);

      if (error instanceof Error) {
        switch (error.name) {
          case "NotAllowedError":
            alert(
              "Kamera izni reddedildi. Lütfen tarayıcı ayarlarından kameraya izin verin.",
            );
            break;
          case "NotFoundError":
            alert(
              "Kamera bulunamadı. Lütfen cihazınızda kamera olduğundan emin olun.",
            );
            break;
          case "NotReadableError":
            alert("Kamera başka bir uygulama tarafından kullanılıyor.");
            break;
          default:
            alert("Kamera erişimi başarısız: " + error.message);
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
    console.log("🔴 Kamera kapatıldı");
  };

  const capturePhoto = () => {
    if (!cameraRef.current || !canvasRef.current) {
      alert("Kamera hazır değil. Lütfen bekleyin.");
      return;
    }

    const video = cameraRef.current;
    const canvas = canvasRef.current;

    // Video boyutlarını kontrol et
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert("Video henüz yüklenmedi. Lütfen bekleyin.");
      return;
    }

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        alert("Canvas context alınamadı.");
        return;
      }

      // Fotoğraf çek
      context.drawImage(video, 0, 0);
      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);

      console.log("📸 Fotoğraf çekildi");

      // Fotoğrafı listeye ekle
      const newImages = [...selectedImages, imageDataUrl];
      setSelectedImages(newImages);
      setCurrentImageIndex(newImages.length - 1);

      // Kamerayı kapat
      stopCamera();

      console.log("✅ Fotoğraf başarıyla eklendi. Toplam:", newImages.length);
    } catch (error) {
      console.error("❌ Fotoğraf çekme hatası:", error);
      alert("Fotoğraf çekerken hata oluştu.");
    }
  };

  const handleAnalyze = async () => {
    if (selectedImages.length === 0) return;

    setIsAnalyzing(true);

    // API çağrısı için mevcut resmi kullan
    const currentImage = selectedImages[currentImageIndex];
    console.log(
      `🔍 Tek fotoğraf analizi başlatılıyor - ${currentImageIndex + 1}/${selectedImages.length}`,
    );
    console.log(
      "📸 Analiz edilecek fotoğraf boyutu:",
      currentImage?.length || "undefined",
    );

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: currentImage,
          imageIndex: currentImageIndex + 1,
          totalImages: selectedImages.length,
        }),
      });

      console.log(
        "🌐 Tek fotoğraf API yanıt durumu:",
        response.status,
        response.statusText,
      );

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Tek fotoğraf analizi tamamlandı:", result);

        // Sonuç kontrolü
        if (!result || typeof result !== "object") {
          throw new Error("Geçersiz API yanıtı");
        }

        setAnalysisResult(result);
      } else {
        const errorText = await response.text();
        console.error(
          "❌ Tek fotoğraf API hatası:",
          response.status,
          errorText,
        );
        throw new Error(`API hatası: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Tek fotoğraf analiz hatası:", error);
      alert("Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAll = async () => {
    if (selectedImages.length === 0) return;

    setIsAnalyzing(true);

    try {
      console.log(`🚀 ${selectedImages.length} fotoğraf analiz ediliyor...`);
      console.log("📸 Gönderilecek fotoğraf sayısı:", selectedImages.length);
      console.log(
        "📋 İlk fotoğraf boyutu:",
        selectedImages[0]?.length || "undefined",
      );

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: selectedImages, // Tüm fotoğrafları gönder
          totalImages: selectedImages.length,
          analysisType: "multiple",
        }),
      });

      console.log("🌐 API yanıt durumu:", response.status, response.statusText);

      if (response.ok) {
        const result = await response.json();
        console.log(
          `✅ ${selectedImages.length} fotoğraf başarıyla analiz edildi:`,
          result,
        );

        // Sonuçları kontrol et
        if (!result || typeof result !== "object") {
          throw new Error("Geçersiz API yanıtı");
        }

        // Boş sonuç kontrolü
        if (!result.animalType && !result.breed && !result.estimatedWeight) {
          console.warn("⚠️ Boş analiz sonucu alındı, tekrar denenecek...");
          throw new Error("Analiz sonucu boş");
        }

        setAnalysisResult(result);
      } else {
        const errorText = await response.text();
        console.error("❌ API Hatası:", response.status, errorText);
        throw new Error(`API hatası: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("❌ Çoklu analiz hatası:", error);

      // Kullanıcıya daha açıklayıcı hata mesajı göster
      if (error instanceof Error) {
        if (error.message.includes("Analiz sonucu boş")) {
          alert(
            "Analiz sonucu boş geldi. Lütfen fotoğrafları tekrar kontrol edin ve yeniden deneyin.",
          );
        } else if (error.message.includes("API hatası")) {
          alert("Sunucu hatası oluştu. Lütfen bir süre sonra tekrar deneyin.");
        } else {
          alert(`Çoklu analiz hatası: ${error.message}`);
        }
      } else {
        alert(
          "Çoklu analiz sırasında beklenmedik bir hata oluştu. Lütfen tekrar deneyin.",
        );
      }
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
            <span className="text-2xl font-bold text-neutral-800">
              Kurbanlık Analiz
            </span>
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
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Fotoğraf Yükleyin
              </h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Analiz etmek istediğiniz hayvanın net bir fotoğrafını seçin
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary btn-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                    />
                  </svg>
                  Galeriden Seç
                </button>

                <button
                  onClick={startCamera}
                  className="btn btn-secondary btn-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
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
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Kamera Görünümü
              </h3>

              <div className="relative w-full max-w-lg mx-auto mb-6">
                <video
                  ref={cameraRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                    backgroundColor: "#1f2937",
                  }}
                  className="rounded-lg border-2 border-gray-200"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />

                {/* Kamera frame overlay */}
                <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-lg pointer-events-none">
                  <div className="absolute top-4 left-4 right-4 text-white text-sm font-medium bg-black/50 rounded px-2 py-1">
                    Hayvanı çerçeveye yerleştirin
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={capturePhoto}
                  className="btn btn-primary btn-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Fotoğraf Çek
                </button>

                <button
                  onClick={() => {
                    console.log("🔍 Video debug bilgileri:", {
                      videoElement: cameraRef.current,
                      srcObject: cameraRef.current?.srcObject,
                      videoWidth: cameraRef.current?.videoWidth,
                      videoHeight: cameraRef.current?.videoHeight,
                      readyState: cameraRef.current?.readyState,
                      currentTime: cameraRef.current?.currentTime,
                      paused: cameraRef.current?.paused,
                      ended: cameraRef.current?.ended,
                    });
                  }}
                  className="btn btn-accent btn-lg"
                >
                  Debug Video
                </button>

                <button
                  onClick={stopCamera}
                  className="btn btn-secondary btn-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
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
                <p className="text-neutral-600">
                  Analiz etmek istediğiniz fotoğrafı seçin
                </p>
              </div>

              {/* Image Thumbnails */}
              {selectedImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-2 mb-6 bg-gray-50 rounded-lg">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <Image
                        src={image}
                        alt={`Fotoğraf ${index + 1}`}
                        width={64}
                        height={64}
                        className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-green-500 ring-2 ring-green-200"
                            : "border-gray-200 hover:border-gray-300"
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
                  <Image
                    src={getCurrentImage()!}
                    alt={`Seçilen hayvan ${currentImageIndex + 1}`}
                    width={320}
                    height={240}
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
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Bu Fotoğrafı Analiz Et
                </button>

                {/* Çoklu fotoğraf analizi butonu - sadece birden fazla fotoğraf varsa göster */}
                {selectedImages.length > 1 && (
                  <button
                    onClick={handleAnalyzeAll}
                    className="btn btn-accent btn-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
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
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Daha Fazla Ekle
                  </button>

                  <button
                    onClick={resetAnalysis}
                    className="btn btn-secondary btn-md"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
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
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Analiz Yapılıyor...
              </h3>
              <p className="text-neutral-600 mb-8">
                Yapay zeka modelimiz fotoğrafınızı inceliyor. Bu işlem birkaç
                saniye sürebilir.
              </p>

              <div className="progress max-w-md mx-auto mb-4">
                <div className="progress-primary w-3/4"></div>
              </div>
              <p className="text-sm text-neutral-500">%75 tamamlandı</p>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6 animate-slide-up">
              {/* AI Analysis Disclaimer */}
              <div className="card p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-amber-600 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-bold text-amber-800 mb-1">
                      ⚠️ Önemli Uyarı
                    </h3>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      <strong>
                        Bu analiz yapay zeka tarafından oluşturulmuştur ve
                        sadece tahmini bilgiler içermektedir.
                      </strong>
                      Gerçek hayvan değerlendirmesi için mutlaka uzman veteriner
                      hekim ve deneyimli besicilik uzmanlarından görüş alınız.
                      Kesin alım-satım kararları vermeden önce profesyonel
                      inceleme yaptırmanız önerilir.
                    </p>
                    <div className="mt-2 text-xs text-amber-600">
                      📋 Bu rapor referans amaçlıdır • 🧑‍⚕️ Veteriner kontrolü
                      gereklidir • 💰 Piyasa fiyatları değişkendir
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Success Header */}
              <div className="card p-6 bg-gradient-to-r from-success/10 to-primary-50 border-success/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="icon-container bg-success/20 text-success mr-4">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">
                        Analiz Tamamlandı!
                      </h3>
                      <p className="text-neutral-600">
                        %{analysisResult.confidence} güven oranı •{" "}
                        {analysisResult.analysisType === "multiple_same_animal"
                          ? `${analysisResult.totalImages} fotoğraf analizi`
                          : "Tek fotoğraf analizi"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      {analysisResult.marketValue?.toLocaleString()} ₺
                    </div>
                    <div className="text-sm text-neutral-500">
                      Tahmini Değer
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Analysis Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Hayvan Bilgileri */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Hayvan Bilgileri
                    </h3>
                  </div>
                  <div className="card-body space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Tür:</span>
                      <span className="font-semibold text-primary-700">
                        {analysisResult?.animalType}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Cins:</span>
                      <span className="font-semibold">
                        {analysisResult?.breed}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Canlı Ağırlık:</span>
                      <span className="font-semibold text-lg">
                        {analysisResult?.estimatedWeight} kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Sağlık Skoru:</span>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">
                          {analysisResult?.healthScore}/100
                        </span>
                        <span
                          className={`badge ${analysisResult?.healthScore >= 90 ? "badge-success" : analysisResult?.healthScore >= 80 ? "badge-warning" : "badge-error"}`}
                        >
                          {analysisResult?.healthScore >= 90
                            ? "Mükemmel"
                            : analysisResult?.healthScore >= 80
                              ? "İyi"
                              : "Orta"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Güven Oranı:</span>
                      <span className="font-semibold text-green-600">
                        %{analysisResult?.confidence}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Et Verimi Analizi */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Et Verimi
                    </h3>
                  </div>
                  <div className="card-body space-y-4">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600">
                          Karkas Ağırlığı:
                        </span>
                        <span className="font-bold text-orange-700">
                          {analysisResult?.meatYield?.karkasWeight} kg
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Karkas Verimi: %
                        {analysisResult?.meatYield?.yieldRatios?.karkasYield}
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600">Kemiksiz Et:</span>
                        <span className="font-bold text-green-700">
                          {analysisResult?.meatYield?.bonelessMeat} kg
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Kemiksiz Verimi: %
                        {analysisResult?.meatYield?.yieldRatios?.bonelessYield}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600">
                          Kemik Ağırlığı:
                        </span>
                        <span className="font-bold text-gray-700">
                          {analysisResult?.meatYield?.boneWeight} kg
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Toplam Et Verimi: %
                        {analysisResult?.meatYield?.yieldRatios?.totalYield}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ekonomik Analiz */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      Fiyat Analizi
                    </h3>
                  </div>
                  <div className="card-body space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600">Toplam Değer:</span>
                        <span className="font-bold text-blue-700 text-lg">
                          {analysisResult?.marketValue?.toLocaleString()} ₺
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Canlı kg: {analysisResult?.pricing?.liveWeightPrice}{" "}
                        ₺/kg
                      </div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600">Et Değeri:</span>
                        <span className="font-bold text-purple-700">
                          {analysisResult?.pricing?.estimatedMeatValue?.toLocaleString()}{" "}
                          ₺
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Et kg: {analysisResult?.pricing?.meatPrice} ₺/kg
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600">
                          Hisse Başı (7 kişi):
                        </span>
                        <span className="font-bold text-yellow-700">
                          {analysisResult?.costPerShare?.toLocaleString()} ₺
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Kişi başı maliyet
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Öneriler ve Detaylar */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Öneriler */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      Öneriler
                    </h3>
                  </div>
                  <div className="card-body">
                    <ul className="space-y-3">
                      {analysisResult?.recommendations?.map(
                        (recommendation: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-neutral-700">
                              {recommendation}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {/* Analiz Detayları */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Analiz Bilgileri
                    </h3>
                  </div>
                  <div className="card-body space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Analiz Türü:</span>
                      <span className="font-semibold">
                        {analysisResult?.analysisType === "multiple_same_animal"
                          ? "Çoklu Fotoğraf"
                          : "Tek Fotoğraf"}
                      </span>
                    </div>
                    {analysisResult?.totalImages > 1 && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">
                          Fotoğraf Sayısı:
                        </span>
                        <span className="font-semibold">
                          {analysisResult.totalImages} adet
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Analiz Tarihi:</span>
                      <span className="font-semibold text-sm">
                        {new Date(
                          analysisResult?.analysisDate,
                        ).toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {analysisResult?.analysisNote && (
                      <div className="bg-blue-50 p-3 rounded-lg mt-4">
                        <p className="text-sm text-blue-800">
                          {analysisResult.analysisNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Analiz Edilen Fotoğraflar */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-xl font-bold text-neutral-900 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
                      />
                    </svg>
                    Analiz Edilen Fotoğraflar
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({selectedImages.length}{" "}
                      {selectedImages.length === 1 ? "fotoğraf" : "fotoğraf"})
                    </span>
                  </h3>
                </div>
                <div className="card-body">
                  {selectedImages.length === 1 ? (
                    /* Tek Fotoğraf Görünümü */
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <Image
                          src={selectedImages[0]}
                          alt="Analiz edilen fotoğraf"
                          width={320}
                          height={240}
                          className="w-64 h-48 object-cover rounded-lg border-2 border-green-200 shadow-md"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ✓ Analiz Edildi
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 text-center">
                        Bu fotoğraf üzerinden analiz gerçekleştirildi
                      </p>
                    </div>
                  ) : (
                    /* Çoklu Fotoğraf Grid Görünümü */
                    <div>
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 text-center">
                          <strong>Çoklu Fotoğraf Analizi:</strong> Aynı hayvana
                          ait {selectedImages.length} farklı açıdan fotoğraf
                          analiz edildi
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {selectedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={image}
                              alt={`Fotoğraf ${index + 1}`}
                              width={128}
                              height={96}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-400 transition-colors cursor-pointer"
                              onClick={() => {
                                // Modal açma işlevi (daha sonra eklenebilir)
                                console.log(`Fotoğraf ${index + 1} tıklandı`);
                              }}
                            />
                            <div className="absolute top-1 right-1 bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">
                              {index + 1}
                            </div>
                            {index === 0 && (
                              <div className="absolute bottom-1 left-1 bg-green-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">
                                Ana Analiz
                              </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                          <strong>Not:</strong> Çoklu fotoğraf analizi daha
                          yüksek doğruluk oranı sağlar. Ana analiz 1. fotoğraf
                          üzerinden yapılıp diğer açılarla desteklenmiştir.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <button className="btn btn-primary btn-lg">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  PDF Raporu İndir
                </button>

                <button className="btn btn-accent btn-lg">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Paylaş
                </button>

                <button className="btn btn-secondary btn-lg">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Favorilere Ekle
                </button>

                <button
                  onClick={resetAnalysis}
                  className="btn btn-secondary btn-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Yeni Analiz
                </button>
              </div>

              {/* Comprehensive Legal Disclaimer */}
              <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    📋 Yasal Uyarılar ve Sorumluluk Reddi
                  </h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">
                      🤖 AI Analizi Hakkında
                    </h5>
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Bu platform yapay zeka destekli tahmin sistemi
                        kullanır
                      </li>
                      <li>• Sonuçlar %100 doğru olmayabilir</li>
                      <li>• Fotoğraf kalitesi sonuçları etkileyebilir</li>
                      <li>• Algoritma sürekli geliştirilmektedir</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">
                      💰 Fiyat Bilgileri
                    </h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Fiyatlar güncel piyasa verilerine dayalıdır</li>
                      <li>• Bölgesel farklılıklar olabilir</li>
                      <li>
                        • Mevsimsel dalgalanmalar göz önünde bulundurulmalı
                      </li>
                      <li>• Kesin fiyat için uzman görüşü alın</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">
                      🩺 Sağlık ve Veterinerlik
                    </h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Sağlık skorları tahmini değerlerdir</li>
                      <li>• Veteriner muayenesi gereklidir</li>
                      <li>• Hastalık tespiti kesin değildir</li>
                      <li>• Aşı ve tedavi planı için uzman danışın</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">
                      ⚖️ Hukuki Sorumluluk
                    </h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Platform sadece bilgi amaçlıdır</li>
                      <li>• Alım-satım riskleri kullanıcıya aittir</li>
                      <li>• Hatalı analiz sorumluluğu kabul edilmez</li>
                      <li>• Profesyonel danışmanlık yerine geçmez</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-center text-sm text-yellow-800">
                    <strong>📞 Önemli:</strong> Bu analiz sonuçlarına dayanarak
                    alım-satım kararı vermeden önce mutlaka{" "}
                    <strong>uzman veteriner hekim</strong> ve{" "}
                    <strong>deneyimli besicilik uzmanlarından</strong>
                    görüş alınız. Kurbanlık hayvan seçiminde profesyonel
                    inceleme şarttır.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
