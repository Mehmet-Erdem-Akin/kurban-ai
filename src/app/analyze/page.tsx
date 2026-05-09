"use client";

import AppPageShell from "@/components/AppPageShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CameraIcon,
  ChartBarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  DocumentArrowDownIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PhotoIcon,
  PlusIcon,
  RectangleStackIcon,
  SparklesIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

interface AdditionalInfo {
  animalCategory?: string; // büyükbaş/küçükbaş
  animalType?: string; // dana, koyun vs
  estimatedAge?: string;
  gender?: string;
  healthCondition?: string;
  feedingStatus?: string;
  pregnancyStatus?: string;
  region?: string;
  specialNotes?: string;
  weight?: string;
}

interface AnalysisError {
  errorType: string;
  message: string;
  detectedType?: string;
  analysisType?: string;
  totalImages?: number;
}

export default function AnalyzePage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [analysisError, setAnalysisError] = useState<AnalysisError | null>(
    null,
  );
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({});
  // Image Modal States
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Analysis results container reference for downloads
  const analysisContainerRef = useRef<HTMLDivElement>(null);

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

      // Kamerayı KAPATMA - çoklu çekim için açık bırak

      console.log("✅ Fotoğraf başarıyla eklendi. Toplam:", newImages.length);
    } catch (error) {
      console.error("❌ Fotoğraf çekme hatası:", error);
      alert("Fotoğraf çekerken hata oluştu.");
    }
  };

  const handleAnalyze = async () => {
    if (selectedImages.length === 0) return;

    setIsAnalyzing(true);
    setAnalysisError(null); // Clear previous errors

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
          additionalInfo: additionalInfo,
        }),
      });

      console.log(
        "🌐 Tek fotoğraf API yanıt durumu:",
        response.status,
        response.statusText,
      );

      const result = await response.json();
      console.log("✅ Tek fotoğraf API yanıtı:", result);

      // Check if response indicates success or error
      if (result.success === false || result.error) {
        // Handle API error responses
        let errorMessage = "Analiz başarısız oldu.";

        switch (result.error) {
          case "NO_ANIMAL_DETECTED":
            errorMessage =
              "Fotoğrafta kurbanlık hayvan tespit edilemedi. Lütfen hayvanın net bir şekilde görünür olduğu bir fotoğraf yükleyin.";
            break;
          case "INVALID_ANIMAL_TYPE":
            errorMessage = `Tespit edilen hayvan kurbanlık türlerden değil. ${result.detectedType ? `Tespit edilen: ${result.detectedType}. ` : ""}Lütfen dana, boğa, inek, koç, koyun, keçi veya manda fotoğrafı yükleyin.`;
            break;
          case "INCOMPLETE_ANALYSIS":
            errorMessage =
              "Hayvan net olarak tespit edilemedi. Lütfen daha net ve açık bir fotoğraf yükleyin.";
            break;
          case "ANALYSIS_FAILED":
            errorMessage =
              "Fotoğraf analizi başarısız oldu. Lütfen farklı bir fotoğraf deneyin veya tekrar yükleyin.";
            break;
          case "API_ERROR":
            errorMessage =
              "Yapay zeka servisinde geçici bir sorun oluştu. Lütfen bir dakika sonra tekrar deneyin.";
            break;
          default:
            errorMessage =
              result.message || "Analiz sırasında bir hata oluştu.";
        }

        setAnalysisError({
          errorType: result.error,
          message: errorMessage,
          detectedType: result.detectedType,
          analysisType: "single",
          totalImages: selectedImages.length,
        });
        return;
      }

      // Successful analysis
      if (!result || typeof result !== "object") {
        throw new Error("Geçersiz API yanıtı");
      }

      setAnalysisResult(result);
    } catch (error) {
      console.error("❌ Tek fotoğraf analiz hatası:", error);
      setAnalysisError({
        errorType: "NETWORK_ERROR",
        message:
          "Analiz sırasında beklenmeyen bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.",
        analysisType: "single",
        totalImages: selectedImages.length,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAll = async () => {
    if (selectedImages.length === 0) return;

    setIsAnalyzing(true);
    setAnalysisError(null); // Clear previous errors

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
          additionalInfo: additionalInfo, // Ek bilgileri gönder
        }),
      });

      console.log("🌐 API yanıt durumu:", response.status, response.statusText);

      const result = await response.json();
      console.log(`✅ ${selectedImages.length} fotoğraf API yanıtı:`, result);

      // Check if response indicates success or error
      if (result.success === false || result.error) {
        // Handle API error responses
        let errorMessage = "Çoklu fotoğraf analizi başarısız oldu.";

        switch (result.error) {
          case "NO_ANIMAL_DETECTED":
            errorMessage =
              "Fotoğraflarda kurbanlık hayvan tespit edilemedi. Lütfen hayvanın net bir şekilde görünür olduğu fotoğraflar yükleyin.";
            break;
          case "INVALID_ANIMAL_TYPE":
            errorMessage = `Tespit edilen hayvan kurbanlık türlerden değil. ${result.detectedType ? `Tespit edilen: ${result.detectedType}. ` : ""}Lütfen dana, boğa, inek, koç, koyun, keçi veya manda fotoğrafları yükleyin.`;
            break;
          case "INCOMPLETE_ANALYSIS":
            errorMessage =
              "Hayvan fotoğraflarda net olarak tespit edilemedi. Lütfen daha net ve açık fotoğraflar yükleyin.";
            break;
          case "ANALYSIS_ERROR":
            errorMessage =
              "Çoklu fotoğraf analizi başarısız oldu. Lütfen farklı fotoğraflar deneyin veya tekrar yükleyin.";
            break;
          case "API_ERROR":
            errorMessage =
              "Yapay zeka servisinde geçici bir sorun oluştu. Lütfen bir dakika sonra tekrar deneyin.";
            break;
          default:
            errorMessage =
              result.message || "Çoklu analiz sırasında bir hata oluştu.";
        }

        setAnalysisError({
          errorType: result.error,
          message: errorMessage,
          detectedType: result.detectedType,
          analysisType: "multiple",
          totalImages: selectedImages.length,
        });
        return;
      }

      // Successful analysis
      if (!result || typeof result !== "object") {
        throw new Error("Geçersiz API yanıtı");
      }

      setAnalysisResult(result);
    } catch (error) {
      console.error("❌ Çoklu analiz hatası:", error);
      setAnalysisError({
        errorType: "NETWORK_ERROR",
        message:
          "Çoklu fotoğraf analizi sırasında beklenmeyen bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.",
        analysisType: "multiple",
        totalImages: selectedImages.length,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImages([]);
    setCurrentImageIndex(0);
    setAnalysisResult(null);
    setAnalysisError(null); // Clear errors
    setIsAnalyzing(false);
    setAdditionalInfo({});
  };

  const handleAdditionalInfoChange = (
    field: keyof AdditionalInfo,
    value: string,
  ) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const switchImage = (index: number) => {
    setCurrentImageIndex(index);
    setAnalysisResult(null); // Yeni resim seçildiğinde analizi sıfırla
    setAnalysisError(null); // Clear errors
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);

    if (newImages.length === 0) {
      setCurrentImageIndex(0);
      setAnalysisResult(null);
      setAnalysisError(null); // Clear errors
    } else if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(newImages.length - 1);
    }
  };

  const getCurrentImage = () => {
    return selectedImages[currentImageIndex] || null;
  };

  // Modal Functions
  const openImageModal = (imageIndex: number) => {
    if (
      !selectedImages ||
      selectedImages.length === 0 ||
      imageIndex >= selectedImages.length
    ) {
      console.error("Geçersiz fotoğraf indeksi veya boş fotoğraf listesi");
      return;
    }
    setModalImageIndex(imageIndex);
    setShowImageModal(true);
    setImageZoom(1);
    console.log(
      "Modal açılıyor - Fotoğraf indeksi:",
      imageIndex,
      "Toplam fotoğraf:",
      selectedImages.length,
    );
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setImageZoom(1);
  };

  const nextImageInModal = useCallback(() => {
    if (modalImageIndex < selectedImages.length - 1) {
      setModalImageIndex(modalImageIndex + 1);
      setImageZoom(1);
    }
  }, [modalImageIndex, selectedImages.length]);

  const prevImageInModal = useCallback(() => {
    if (modalImageIndex > 0) {
      setModalImageIndex(modalImageIndex - 1);
      setImageZoom(1);
    }
  }, [modalImageIndex]);

  const handleZoomIn = () => {
    setImageZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setImageZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const resetZoom = () => {
    setImageZoom(1);
  };

  // Keyboard Event Handler
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!showImageModal || !selectedImages || selectedImages.length === 0)
        return;

      switch (e.key) {
        case "Escape":
          closeImageModal();
          break;
        case "ArrowLeft":
          prevImageInModal();
          break;
        case "ArrowRight":
          nextImageInModal();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          resetZoom();
          break;
      }
    },
    [showImageModal, selectedImages, nextImageInModal, prevImageInModal],
  );

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Download Functions
  const handleDownloadImage = async () => {
    if (!analysisContainerRef.current || !analysisResult) return;

    try {
      const canvas = await html2canvas(analysisContainerRef.current, {
        useCORS: true,
        allowTaint: false,
        width: analysisContainerRef.current.scrollWidth,
        height: analysisContainerRef.current.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = `hayvan-analizi-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Görüntü indirme hatası:", error);
      alert(
        "Görüntü indirme sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      );
    }
  };

  const handleDownloadPDF = async () => {
    if (!analysisContainerRef.current || !analysisResult) return;

    try {
      const canvas = await html2canvas(analysisContainerRef.current, {
        useCORS: true,
        allowTaint: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`hayvan-analizi-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF indirme hatası:", error);
      alert("PDF indirme sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
              Hayvan analizi
            </h1>
            <p className="mx-auto max-w-xl text-base text-stone-600 dark:text-stone-400 sm:text-lg">
              Net fotoğraf yükleyin veya kameradan çekin; isteğe bağlı bilgilerle
              doğruluğu artırın.
            </p>
          </div>

          {!selectedImages.length && !analysisResult && !showCamera && (
            <div className="card p-4 sm:p-12 text-center animate-fade-in">
              <div className="icon-container-primary mx-auto mb-6">
                <CameraIcon className="h-8 w-8" strokeWidth={2} aria-hidden />
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Fotoğraf Yükleyin
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                Analiz etmek istediğiniz hayvanın net bir fotoğrafını seçin
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary btn-lg"
                >
                  <PhotoIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Galeriden Seç
                </button>

                <button
                  onClick={startCamera}
                  className="btn btn-secondary btn-lg"
                >
                  <CameraIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
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
            <div className="card p-4 sm:p-8 text-center animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Kamera Görünümü
                </h3>
                {selectedImages.length > 0 && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-green-900/50 dark:text-green-200">
                    📸 {selectedImages.length} fotoğraf çekildi
                  </div>
                )}
              </div>

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
                  className="rounded-lg border-2 border-gray-200 dark:border-gray-600"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />

                {/* Kamera frame overlay */}
                <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-lg pointer-events-none">
                  <div className="absolute top-4 left-4 right-4 text-white text-sm font-medium bg-black/50 rounded px-2 py-1">
                    {selectedImages.length === 0
                      ? "Hayvanı çerçeveye yerleştirin"
                      : "Farklı açıdan fotoğraf çekin"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={capturePhoto}
                  className="btn btn-primary btn-lg"
                >
                  <CameraIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {selectedImages.length === 0 ? "Fotoğraf Çek" : "Başka Çek"}
                </button>

                {selectedImages.length > 0 && (
                  <button
                    onClick={stopCamera}
                    className="btn btn-accent btn-lg"
                  >
                    <CheckIcon
                      className="mr-2 h-5 w-5 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
                    Çekimi Bitir ({selectedImages.length})
                  </button>
                )}

                <button
                  onClick={stopCamera}
                  className="btn btn-secondary btn-lg"
                >
                  <XMarkIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  İptal
                </button>
              </div>

              {selectedImages.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg dark:bg-green-950/35">
                  <p className="text-green-800 text-sm dark:text-green-200">
                    💡 <strong>İpucu:</strong> Hayvanın farklı açılarından
                    (önden, yandan, arkadan) fotoğraf çekerek daha doğru analiz
                    sonucu alabilirsiniz.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {analysisError && !isAnalyzing && (
            <div className="card p-8 animate-scale-in border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/30">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-950/50">
                  {analysisError.errorType === "NO_ANIMAL_DETECTED" ? (
                    <EyeSlashIcon
                      className="h-8 w-8 text-red-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                  ) : analysisError.errorType === "INVALID_ANIMAL_TYPE" ? (
                    <ExclamationTriangleIcon
                      className="h-8 w-8 text-red-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                  ) : analysisError.errorType === "API_ERROR" ? (
                    <ExclamationCircleIcon
                      className="h-8 w-8 text-red-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                  ) : (
                    <XMarkIcon
                      className="h-8 w-8 text-red-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-red-900 mb-4 dark:text-red-200">
                  {analysisError.errorType === "NO_ANIMAL_DETECTED"
                    ? "🚫 Hayvan Tespit Edilemedi"
                    : analysisError.errorType === "INVALID_ANIMAL_TYPE"
                      ? "⚠️ Geçersiz Hayvan Türü"
                      : analysisError.errorType === "INCOMPLETE_ANALYSIS"
                        ? "🔍 Analiz Eksik"
                        : analysisError.errorType === "ANALYSIS_FAILED"
                          ? "❌ Analiz Başarısız"
                          : analysisError.errorType === "API_ERROR"
                            ? "🔧 Servis Hatası"
                            : analysisError.errorType === "NETWORK_ERROR"
                              ? "🌐 Bağlantı Hatası"
                              : "❌ Analiz Hatası"}
                </h3>

                <p className="text-lg text-red-800 mb-6 max-w-2xl mx-auto leading-relaxed dark:text-red-200">
                  {analysisError.message}
                </p>

                {analysisError.detectedType && (
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6 max-w-md mx-auto dark:bg-red-950/40 dark:border-red-800">
                    <p className="text-sm text-red-700 dark:text-red-200">
                      <span className="font-semibold">Tespit edilen:</span>{" "}
                      {analysisError.detectedType}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setAnalysisError(null)}
                    className="btn btn-primary btn-lg"
                  >
                    <ArrowPathIcon
                      className="mr-2 h-5 w-5 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
                    Tekrar Dene
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-secondary btn-lg"
                  >
                    <PhotoIcon
                      className="mr-2 h-5 w-5 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
                    Farklı Fotoğraf Seç
                  </button>
                </div>

                {/* Error Type Specific Tips */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto dark:bg-blue-950/35 dark:border-blue-800/80">
                  <h4 className="font-semibold text-blue-900 mb-3 dark:text-blue-100">
                    💡 İpuçları:
                  </h4>
                  <div className="text-sm text-blue-800 text-left space-y-2 dark:text-blue-200">
                    {analysisError.errorType === "NO_ANIMAL_DETECTED" && (
                      <>
                        <p>
                          • Hayvanın tüm vücudunun görünür olduğundan emin olun
                        </p>
                        <p>
                          • Fotoğrafın net ve aydınlık olduğunu kontrol edin
                        </p>
                        <p>• Hayvan fotoğrafın merkezinde olmalı</p>
                      </>
                    )}
                    {analysisError.errorType === "INVALID_ANIMAL_TYPE" && (
                      <>
                        <p>
                          • Sadece kurbanlık hayvanlar: Dana, Boğa, İnek, Koç,
                          Koyun, Keçi, Manda
                        </p>
                        <p>• Evcil hayvanlar (kedi, köpek) analiz edilemez</p>
                        <p>• Vahşi hayvanlar desteklenmez</p>
                      </>
                    )}
                    {(analysisError.errorType === "INCOMPLETE_ANALYSIS" ||
                      analysisError.errorType === "ANALYSIS_FAILED") && (
                      <>
                        <p>• Daha yüksek çözünürlüklü fotoğraf deneyin</p>
                        <p>• Hayvanın yakın plan fotoğrafını çekin</p>
                        <p>• Farklı açıdan fotoğraf deneyebilirsiniz</p>
                      </>
                    )}
                    {(analysisError.errorType === "API_ERROR" ||
                      analysisError.errorType === "NETWORK_ERROR") && (
                      <>
                        <p>• İnternet bağlantınızı kontrol edin</p>
                        <p>• Birkaç dakika sonra tekrar deneyin</p>
                        <p>• Sayfayı yenileyip tekrar deneyin</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedImages.length > 0 && !analysisResult && !isAnalyzing && (
            <div className="card p-4 sm:p-8 animate-scale-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Seçilen Fotoğraflar ({selectedImages.length})
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Analiz etmek istediğiniz fotoğrafı seçin
                </p>
              </div>

              {/* Image Thumbnails */}
              {selectedImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-2 mb-6 bg-gray-50 rounded-lg dark:bg-gray-900/50">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <Image
                        src={image}
                        alt={`Fotoğraf ${index + 1}`}
                        width={64}
                        height={64}
                        className={`h-16 w-16 cursor-pointer rounded object-cover border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-emerald-600 ring-2 ring-emerald-200/90"
                            : "border-stone-200 hover:border-stone-300 dark:border-stone-600 dark:hover:border-stone-500"
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

              {/* Post-Upload Questionnaire */}
              <div className="mb-6">
                <div className="card p-4 sm:p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      🎯 Analiz Doğruluğunu Artırın
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Hayvan hakkında bilgi vermek AI analizinin doğruluğunu
                      %30-40 artırır. Bu adım opsiyoneldir, istediğiniz kadar
                      doldurun.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200 dark:bg-blue-950/35 dark:border-blue-800/80">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Hayvan Kategorisi */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          🐄 Hayvan Kategorisi
                        </label>
                        <select
                          value={additionalInfo.animalCategory || ""}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              "animalCategory",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          <option value="büyükbaş">
                            🐄 Büyükbaş (Sığır, Dana vb.)
                          </option>
                          <option value="küçükbaş">
                            🐑 Küçükbaş (Koyun, Keçi vb.)
                          </option>
                        </select>
                      </div>

                      {/* Hayvan Türü */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          🏷️ Hayvan Türü
                        </label>
                        <select
                          value={additionalInfo.animalType || ""}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              "animalType",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          {additionalInfo.animalCategory === "büyükbaş" ? (
                            <>
                              <option value="dana">🐄 Dana</option>
                              <option value="tosun">🐂 Tosun</option>
                              <option value="boğa">🐃 Boğa</option>
                              <option value="inek">🐄 İnek</option>
                              <option value="buzağı">🐮 Buzağı</option>
                              <option value="manda">🐃 Manda</option>
                            </>
                          ) : additionalInfo.animalCategory === "küçükbaş" ? (
                            <>
                              <option value="koyun">🐑 Koyun</option>
                              <option value="keçi">🐐 Keçi</option>
                              <option value="kuzu">🐑 Kuzu</option>
                              <option value="oğlak">🐐 Oğlak</option>
                              <option value="teke">🐐 Teke</option>
                              <option value="koç">🐏 Koç</option>
                            </>
                          ) : (
                            <option value="" disabled>
                              Önce kategori seçiniz
                            </option>
                          )}
                        </select>
                      </div>

                      {/* Cinsiyet */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ⚥ Cinsiyet
                        </label>
                        <select
                          value={additionalInfo.gender || ""}
                          onChange={(e) =>
                            handleAdditionalInfoChange("gender", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          <option value="erkek">♂️ Erkek</option>
                          <option value="dişi">♀️ Dişi</option>
                        </select>
                      </div>

                      {/* Yaş Tahmini */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          📅 Tahmini Yaş
                        </label>
                        <select
                          value={additionalInfo.estimatedAge || ""}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              "estimatedAge",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          <option value="genç">🐣 Genç (0-1 yaş)</option>
                          <option value="orta">🐄 Orta yaş (1-3 yaş)</option>
                          <option value="olgun">🐂 Olgun (3+ yaş)</option>
                        </select>
                      </div>

                      {/* Tahmini Ağırlık */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ⚖️ Tahmini Ağırlık
                        </label>
                        <input
                          type="text"
                          placeholder="örn: 300-350 kg"
                          value={additionalInfo.weight || ""}
                          onChange={(e) =>
                            handleAdditionalInfoChange("weight", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Sağlık Durumu */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          🩺 Sağlık Durumu
                        </label>
                        <select
                          value={additionalInfo.healthCondition || ""}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              "healthCondition",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          <option value="mükemmel">💚 Mükemmel</option>
                          <option value="iyi">💛 İyi</option>
                          <option value="orta">🧡 Orta</option>
                          <option value="dikkat">❤️ Dikkat gerekli</option>
                        </select>
                      </div>

                      {/* Gebelik Durumu (sadece dişi seçilirse) */}
                      {additionalInfo.gender === "dişi" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            🤰 Gebelik Durumu
                          </label>
                          <select
                            value={additionalInfo.pregnancyStatus || ""}
                            onChange={(e) =>
                              handleAdditionalInfoChange(
                                "pregnancyStatus",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Seçiniz</option>
                            <option value="gebe_değil">❌ Gebe değil</option>
                            <option value="gebe">✅ Gebe</option>
                            <option value="bilinmiyor">❓ Bilinmiyor</option>
                          </select>
                        </div>
                      )}

                      {/* Bölge */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          📍 Bölge/Şehir
                        </label>
                        <input
                          type="text"
                          placeholder="örn: İstanbul, Ankara..."
                          value={additionalInfo.region || ""}
                          onChange={(e) =>
                            handleAdditionalInfoChange("region", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Özel Notlar - Tam genişlik */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        📝 Özel Notlar
                      </label>
                      <textarea
                        placeholder="Hayvan hakkında bildiğiniz özel durumlar, hastalık geçmişi, beslenme alışkanlıkları vb..."
                        value={additionalInfo.specialNotes || ""}
                        onChange={(e) =>
                          handleAdditionalInfoChange(
                            "specialNotes",
                            e.target.value,
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Bilgilendirme */}
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950/35 dark:border-green-800/70">
                      <p className="text-xs text-green-700 text-center dark:text-green-200">
                        💡 <strong>İpucu:</strong> Ne kadar çok bilgi
                        verirseniz, AI analizi o kadar doğru olur!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-center">
                {/* Tek fotoğraf analizi için ana buton */}
                <button
                  onClick={handleAnalyze}
                  className="btn btn-primary btn-lg text-sm sm:text-base"
                >
                  <SparklesIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Bu Fotoğrafı Analiz Et
                </button>

                {/* Çoklu fotoğraf analizi butonu - sadece birden fazla fotoğraf varsa göster */}
                {selectedImages.length > 1 && (
                  <button
                    onClick={handleAnalyzeAll}
                    className="btn btn-accent btn-lg"
                  >
                    <RectangleStackIcon
                      className="mr-2 h-5 w-5 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
                    Tüm Fotoğrafları Analiz Et ({selectedImages.length} adet)
                  </button>
                )}

                {/* Yardımcı butonlar */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetAnalysis}
                    className="btn btn-secondary btn-md"
                  >
                    <TrashIcon
                      className="mr-2 h-4 w-4 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
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
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Analiz Yapılıyor...
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Yapay zeka modelimiz fotoğrafınızı inceliyor. Bu işlem birkaç
                saniye sürebilir.
              </p>

              <div className="progress max-w-md mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full animate-pulse w-full"></div>
              </div>
              <p className="text-sm text-neutral-500">
                AI modelimiz analiz yapıyor...
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-8 animate-slide-up">
              {/* Download Buttons */}
              <div className="mb-2 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
                <button
                  onClick={handleDownloadImage}
                  className="btn btn-secondary btn-md text-sm sm:text-base"
                >
                  <ArrowDownTrayIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Görüntü İndir (PNG)
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="btn btn-accent btn-md text-sm sm:text-base"
                >
                  <DocumentArrowDownIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  PDF İndir
                </button>
              </div>

              {/* Analysis Results Container - This will be captured for download */}
              <div
                ref={analysisContainerRef}
                className="space-y-8 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-medium dark:border-stone-700/80 dark:bg-stone-900 sm:p-8"
              >
                {/* AI Analysis Disclaimer */}
                <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/95 to-orange-50/70 p-4 shadow-sm sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="hidden shrink-0 sm:block">
                      <ExclamationTriangleIcon
                        className="mt-0.5 h-6 w-6 text-amber-600"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-sm font-bold text-amber-900">
                        Önemli uyarı
                      </h3>
                      <p className="text-sm leading-relaxed text-amber-800/95">
                        <strong>
                          Bu analiz yapay zeka tarafından oluşturulmuştur ve
                          sadece tahmini bilgiler içermektedir.
                        </strong>
                        Gerçek hayvan değerlendirmesi için mutlaka uzman
                        veteriner hekim ve deneyimli besicilik uzmanlarından
                        görüş alınız. Kesin alım-satım kararları vermeden önce
                        profesyonel inceleme yaptırmanız önerilir.
                      </p>
                      <div className="mt-2 text-xs text-amber-700/90">
                        Bu rapor referans amaçlıdır · Veteriner kontrolü
                        gereklidir · Piyasa fiyatları değişkendir
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis summary hero */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/40 p-6 shadow-medium sm:p-8">
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl"
                    aria-hidden
                  />
                  <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-600 to-emerald-900 text-white shadow-lg shadow-emerald-900/25">
                        <CheckIcon
                          className="h-7 w-7"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          Rapor hazır
                        </p>
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
                          {analysisResult.animalType}
                          <span className="block text-base font-normal text-stone-500 dark:text-stone-400 sm:mt-1 sm:inline sm:text-lg">
                            {analysisResult.breed}
                          </span>
                        </h3>
                        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                          {analysisResult.analysisType ===
                          "multiple_same_animal"
                            ? `${analysisResult.totalImages} fotoğraf birleştirildi`
                            : "Tek fotoğraf analizi"}
                        </p>
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto lg:max-w-2xl">
                      <div className="rounded-xl border border-stone-200/90 dark:border-stone-700/90 bg-white/95 dark:bg-stone-900/95 px-3 py-3 text-center shadow-sm sm:px-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">
                          Tahmini değer
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-emerald-800 sm:text-lg">
                          ₺
                          {analysisResult.pricing?.estimatedMeatValue?.toLocaleString(
                            "tr-TR",
                          )}
                        </p>
                      </div>
                      <div className="rounded-xl border border-stone-200/90 dark:border-stone-700/90 bg-white/95 dark:bg-stone-900/95 px-3 py-3 text-center shadow-sm sm:px-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">
                          Canlı ağırlık
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-stone-900 dark:text-stone-50 sm:text-lg">
                          {analysisResult.estimatedWeight} kg
                        </p>
                      </div>
                      <div className="rounded-xl border border-stone-200/90 dark:border-stone-700/90 bg-white/95 dark:bg-stone-900/95 px-3 py-3 text-center shadow-sm sm:px-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">
                          Sağlık skoru
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-stone-900 dark:text-stone-50 sm:text-lg">
                          {analysisResult.healthScore}
                          <span className="text-sm font-normal text-stone-500 dark:text-stone-400">
                            /100
                          </span>
                        </p>
                      </div>
                      <div className="rounded-xl border border-stone-200/90 dark:border-stone-700/90 bg-white/95 dark:bg-stone-900/95 px-3 py-3 text-center shadow-sm sm:px-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">
                          Güven
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-emerald-800 sm:text-lg">
                          %{analysisResult.confidence}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analiz Edilen Fotoğraflar */}
                <div className="card-hover overflow-hidden">
                  <div className="border-b border-stone-100 dark:border-stone-800 bg-gradient-to-r from-stone-50/80 to-white dark:from-stone-900/80 dark:to-stone-950 px-4 py-4 sm:px-6 sm:py-5">
                    <h3 className="flex flex-col items-center gap-2 text-center font-display text-xl font-semibold text-stone-900 dark:text-stone-50 sm:flex-row sm:text-left">
                      <PhotoIcon
                        className="mr-2 h-8 w-8 shrink-0 text-emerald-700"
                        strokeWidth={2}
                        aria-hidden
                      />
                      Analiz Edilen Fotoğraflar
                      <span className="text-sm font-normal text-stone-500 dark:text-stone-400 sm:ml-2">
                        ({selectedImages.length}{" "}
                        {selectedImages.length === 1 ? "fotoğraf" : "fotoğraf"})
                      </span>
                    </h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    {selectedImages.length === 1 ? (
                      /* Tek Fotoğraf Görünümü */
                      <div className="flex flex-col items-center">
                        <div
                          onClick={() => openImageModal(currentImageIndex)}
                          className="relative cursor-pointer"
                        >
                          <Image
                            src={selectedImages[currentImageIndex]}
                            alt="Analiz edilen fotoğraf"
                            width={320}
                            height={240}
                            className="h-48 w-64 cursor-pointer rounded-xl border-2 border-emerald-200 object-cover shadow-md transition-colors hover:border-emerald-400"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                            <MagnifyingGlassIcon
                              className="h-8 w-8 text-white opacity-0 transition-opacity hover:opacity-100"
                              strokeWidth={2}
                              aria-hidden
                            />
                          </div>
                          <div className="absolute right-2 top-2 rounded-full bg-emerald-700 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                            Analiz edildi
                          </div>
                          {/* Büyüteç ikonu */}
                        </div>
                        <p className="mt-3 text-center text-sm text-stone-600 dark:text-stone-400">
                          Bu fotoğraf üzerinden analiz gerçekleştirildi
                          <br />
                          <span className="text-xs text-emerald-700">
                            Büyütmek için tıklayın
                          </span>
                        </p>
                      </div>
                    ) : (
                      /* Çoklu Fotoğraf Grid Görünümü */
                      <div>
                        <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50/80 p-3">
                          <p className="text-center text-sm text-emerald-950/90">
                            <strong>Çoklu fotoğraf analizi:</strong> Aynı
                            hayvana ait {selectedImages.length} farklı açıdan
                            fotoğraf analiz edildi
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
                                className="h-24 w-full cursor-pointer rounded-lg border-2 border-stone-200 dark:border-stone-600 object-cover transition-colors group-hover:border-emerald-400"
                                onClick={() => openImageModal(index)}
                              />
                              <div className="absolute right-1 top-1 rounded-full bg-stone-700 px-1.5 py-0.5 text-xs font-semibold text-white">
                                {index + 1}
                              </div>
                              {index === 0 && (
                                <div className="absolute bottom-1 left-1 rounded-full bg-emerald-700 px-1.5 py-0.5 text-xs font-semibold text-white">
                                  Ana analiz
                                </div>
                              )}

                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                                <MagnifyingGlassIcon
                                  className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                  strokeWidth={2}
                                  aria-hidden
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 text-center">
                          <p className="text-sm text-stone-600 dark:text-stone-400">
                            <strong>Not:</strong> Çoklu fotoğraf analizi daha
                            yüksek doğruluk oranı sağlar. Ana analiz 1. fotoğraf
                            üzerinden yapılıp diğer açılarla desteklenmiştir.
                          </p>
                          <p className="mt-1 text-xs text-emerald-700">
                            Fotoğrafları büyütmek için tıklayın
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Analysis Grid */}
                <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {/* Hayvan Bilgileri */}
                  <div className="card-hover overflow-hidden">
                    <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/70 px-4 py-4 sm:px-6">
                      <h3 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50 sm:text-xl">
                        <InformationCircleIcon
                          className="mr-2 h-5 w-5 shrink-0 text-emerald-700"
                          strokeWidth={2}
                          aria-hidden
                        />
                        Hayvan bilgileri
                      </h3>
                    </div>
                    <div className="space-y-4 p-4 text-sm sm:p-6 sm:text-base">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600 dark:text-stone-400">Tür</span>
                        <span className="font-semibold text-emerald-800">
                          {analysisResult?.animalType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600 dark:text-stone-400">Cins</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-50">
                          {analysisResult?.breed}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600 dark:text-stone-400">Canlı ağırlık</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-50">
                          {analysisResult?.estimatedWeight} kg
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600 dark:text-stone-400">Sağlık skoru</span>
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
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600 dark:text-stone-400">Güven</span>
                        <span className="font-semibold text-emerald-700">
                          %{analysisResult?.confidence}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Et Verimi Analizi */}
                  <div className="card-hover overflow-hidden">
                    <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/70 px-4 py-4 sm:px-6">
                      <h3 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50 sm:text-xl">
                        <ChartBarIcon
                          className="mr-2 h-5 w-5 shrink-0 text-amber-700"
                          strokeWidth={2}
                          aria-hidden
                        />
                        Et verimi
                      </h3>
                    </div>
                    <div className="space-y-4 p-4 text-sm sm:p-6 sm:text-base">
                      <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-stone-600 dark:text-stone-400">Karkas ağırlığı</span>
                          <span className="font-bold text-amber-900">
                            {analysisResult?.meatYield?.karkasWeight} kg
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400">
                          Karkas verimi %
                          {analysisResult?.meatYield?.yieldRatios?.karkasYield}
                        </div>
                      </div>

                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-stone-600 dark:text-stone-400">Kemiksiz et</span>
                          <span className="font-bold text-emerald-900">
                            {analysisResult?.meatYield?.bonelessMeat} kg
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400">
                          Kemiksiz verimi %
                          {
                            analysisResult?.meatYield?.yieldRatios
                              ?.bonelessYield
                          }
                        </div>
                      </div>

                      <div className="rounded-xl border border-stone-200 bg-stone-50/90 dark:border-stone-700 dark:bg-stone-900/80 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-stone-600 dark:text-stone-400">Kemik ağırlığı</span>
                          <span className="font-bold text-stone-800 dark:text-stone-200">
                            {analysisResult?.meatYield?.boneWeight} kg
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400">
                          Toplam et verimi %
                          {analysisResult?.meatYield?.yieldRatios?.totalYield}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fiyat Analizi */}
                  <div className="card-hover overflow-hidden">
                    <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/70 px-4 py-4 sm:px-6">
                      <h3 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50 sm:text-xl">
                        <CurrencyDollarIcon
                          className="mr-2 h-5 w-5 shrink-0 text-emerald-700"
                          strokeWidth={2}
                          aria-hidden
                        />
                        Fiyat analizi
                      </h3>
                    </div>
                    <div className="space-y-4 p-4 text-sm sm:p-6 sm:text-base">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600 dark:text-stone-400">Tahmini değer</span>
                        <span className="text-lg font-bold text-emerald-800">
                          ₺
                          {analysisResult?.pricing?.estimatedMeatValue?.toLocaleString(
                            "tr-TR",
                          )}
                        </span>
                      </div>

                      {/* Hisse bilgisi - hayvan türüne göre dinamik */}
                      {(() => {
                        // Büyükbaş hayvanlar listesi
                        const buyukbasHayvanlar = [
                          "Dana",
                          "Tosun",
                          "Boğa",
                          "İnek",
                          "Manda",
                          "Buzağı",
                          "Sığır",
                        ];
                        // Küçükbaş hayvanlar listesi
                        const kucukbasHayvanlar = [
                          "Koyun",
                          "Keçi",
                          "Oğlak",
                          "Kuzu",
                          "Teke",
                        ];

                        const isBuyukbas = buyukbasHayvanlar.some((hayvan) =>
                          analysisResult?.animalType
                            ?.toLowerCase()
                            .includes(hayvan.toLowerCase()),
                        );

                        const isKucukbas = kucukbasHayvanlar.some((hayvan) =>
                          analysisResult?.animalType
                            ?.toLowerCase()
                            .includes(hayvan.toLowerCase()),
                        );

                        if (isBuyukbas) {
                          // 🐄 Büyükbaş gösterimi
                          return (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-stone-600 dark:text-stone-400">Hisse sayısı</span>
                                <span className="font-semibold text-stone-900 dark:text-stone-50">
                                  7 kişilik
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-stone-600 dark:text-stone-400">Hisse başı</span>
                                <span className="text-lg font-bold text-emerald-800">
                                  ₺
                                  {analysisResult?.costPerShare?.toLocaleString(
                                    "tr-TR",
                                  )}
                                </span>
                              </div>
                            </>
                          );
                        } else if (isKucukbas) {
                          // 🐑 Küçükbaş gösterimi
                          return (
                            <div className="flex items-center justify-between">
                              <span className="text-stone-600 dark:text-stone-400">Hisse durumu</span>
                              <span className="font-semibold text-amber-800">
                                Tek hisse (bölünemez)
                              </span>
                            </div>
                          );
                        } else {
                          // 🐾 Diğer hayvanlar
                          return (
                            <div className="flex items-center justify-between">
                              <span className="text-stone-600 dark:text-stone-400">Hisse durumu</span>
                              <span className="font-semibold text-stone-700 dark:text-stone-300">
                                Değişken
                              </span>
                            </div>
                          );
                        }
                      })()}

                      <div className="rounded-xl border border-stone-200 bg-stone-50/90 dark:border-stone-700 dark:bg-stone-900/80 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-stone-600 dark:text-stone-400">
                            Canlı ağırlık fiyatı
                          </span>
                          <span className="font-bold text-stone-800 dark:text-stone-200">
                            ₺{analysisResult?.pricing?.liveWeightPrice}/kg
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400">
                          Et fiyatı ₺{analysisResult?.pricing?.meatPrice}/kg
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Öneriler ve Detaylar */}
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  {/* Öneriler */}
                  <div className="card-hover overflow-hidden">
                    <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/70 px-4 py-4 sm:px-6">
                      <h3 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50 sm:text-xl">
                        <SparklesIcon
                          className="mr-2 h-5 w-5 shrink-0 text-teal-700"
                          strokeWidth={2}
                          aria-hidden
                        />
                        Öneriler
                      </h3>
                    </div>
                    <div className="p-4 text-sm sm:p-6 sm:text-base">
                      <ul className="space-y-3">
                        {analysisResult?.recommendations?.map(
                          (recommendation: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckIcon
                                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                                strokeWidth={2}
                                aria-hidden
                              />
                              <span className="text-stone-700 dark:text-stone-300">
                                {recommendation}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Analiz Detayları */}
                  <div className="card-hover overflow-hidden">
                    <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/70 px-4 py-4 sm:px-6">
                      <h3 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50 sm:text-xl">
                        <InformationCircleIcon
                          className="mr-2 h-5 w-5 shrink-0 text-stone-500 dark:text-stone-400"
                          strokeWidth={2}
                          aria-hidden
                        />
                        Analiz bilgileri
                      </h3>
                    </div>
                    <div className="space-y-3 p-4 text-sm sm:p-6 sm:text-base">
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-600 dark:text-stone-400">Analiz türü</span>
                        <span className="font-semibold">
                          {analysisResult?.analysisType ===
                          "multiple_same_animal"
                            ? "Çoklu Fotoğraf"
                            : "Tek Fotoğraf"}
                        </span>
                      </div>
                      {analysisResult?.totalImages > 1 && (
                        <div className="flex justify-between gap-4">
                          <span className="text-stone-600 dark:text-stone-400">Fotoğraf sayısı</span>
                          <span className="font-semibold text-stone-900 dark:text-stone-50">
                            {analysisResult.totalImages} adet
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-600 dark:text-stone-400">Analiz tarihi</span>
                        <span className="text-sm font-semibold text-stone-900 dark:text-stone-50">
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

                      {/* Kullanıcının verdiği ek bilgileri göster */}
                      {Object.keys(additionalInfo).some(
                        (key) => additionalInfo[key as keyof AdditionalInfo],
                      ) && (
                        <>
                          <hr className="my-3 border-stone-200 dark:border-stone-700" />
                          <div className="text-sm">
                            <h4 className="mb-2 font-semibold text-emerald-800">
                              Ek bilgiler (analiz girdisi)
                            </h4>
                            <div className="space-y-1 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                              {additionalInfo.animalCategory && (
                                <div className="flex justify-between text-xs">
                                  <span>Kategori:</span>
                                  <span className="font-medium">
                                    {additionalInfo.animalCategory ===
                                    "büyükbaş"
                                      ? "🐄 Büyükbaş"
                                      : "🐑 Küçükbaş"}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.animalType && (
                                <div className="flex justify-between text-xs">
                                  <span>Tür:</span>
                                  <span className="font-medium">
                                    {additionalInfo.animalType}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.gender && (
                                <div className="flex justify-between text-xs">
                                  <span>Cinsiyet:</span>
                                  <span className="font-medium">
                                    {additionalInfo.gender === "erkek"
                                      ? "♂️ Erkek"
                                      : "♀️ Dişi"}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.estimatedAge && (
                                <div className="flex justify-between text-xs">
                                  <span>Yaş:</span>
                                  <span className="font-medium">
                                    {additionalInfo.estimatedAge}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.healthCondition && (
                                <div className="flex justify-between text-xs">
                                  <span>Sağlık:</span>
                                  <span className="font-medium">
                                    {additionalInfo.healthCondition}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.pregnancyStatus && (
                                <div className="flex justify-between text-xs">
                                  <span>Gebelik:</span>
                                  <span className="font-medium">
                                    {additionalInfo.pregnancyStatus}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.weight && (
                                <div className="flex justify-between text-xs">
                                  <span>Tahmini Ağırlık:</span>
                                  <span className="font-medium">
                                    {additionalInfo.weight}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.region && (
                                <div className="flex justify-between text-xs">
                                  <span>Bölge:</span>
                                  <span className="font-medium">
                                    {additionalInfo.region}
                                  </span>
                                </div>
                              )}
                              {additionalInfo.specialNotes && (
                                <div className="text-xs mt-2">
                                  <span className="font-medium">
                                    Özel Notlar:
                                  </span>
                                  <p className="mt-1 italic text-stone-600 dark:text-stone-400">
                                    &ldquo;{additionalInfo.specialNotes}&rdquo;
                                  </p>
                                </div>
                              )}
                            </div>
                            <p className="mt-2 text-center text-xs text-emerald-800/90">
                              Bu bilgiler tahmin doğruluğunu artırmak için
                              kullanıldı.
                            </p>
                          </div>
                        </>
                      )}

                      {analysisResult?.analysisNote && (
                        <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/80 p-3">
                          <p className="text-sm text-sky-950/90">
                            {analysisResult.analysisNote}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Analysis Results Container */}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <button
                  onClick={resetAnalysis}
                  className="btn btn-primary btn-lg"
                >
                  <ArrowPathIcon
                    className="mr-2 h-5 w-5 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Yeni Analiz
                </button>
              </div>

              {/* Comprehensive Legal Disclaimer */}
              <div className="mt-8 rounded-2xl border border-stone-200/90 dark:border-stone-700/90 bg-stone-50/80 dark:bg-stone-900/75 p-6 shadow-sm sm:p-8">
                <div className="mb-5 text-center">
                  <h4 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                    Yasal uyarılar ve sorumluluk reddi
                  </h4>
                </div>

                <div className="grid gap-6 text-sm text-stone-700 dark:text-stone-300 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold text-stone-900 dark:text-stone-50">
                      Yapay zeka analizi
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
                    <h5 className="mb-2 font-semibold text-stone-900 dark:text-stone-50">
                      Fiyat bilgileri
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
                    <h5 className="mb-2 font-semibold text-stone-900 dark:text-stone-50">
                      Sağlık ve veterinerlik
                    </h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Sağlık skorları tahmini değerlerdir</li>
                      <li>• Veteriner muayenesi gereklidir</li>
                      <li>• Hastalık tespiti kesin değildir</li>
                      <li>• Aşı ve tedavi planı için uzman danışın</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="mb-2 font-semibold text-stone-900 dark:text-stone-50">
                      Hukuki sorumluluk
                    </h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Platform sadece bilgi amaçlıdır</li>
                      <li>• Alım-satım riskleri kullanıcıya aittir</li>
                      <li>• Hatalı analiz sorumluluğu kabul edilmez</li>
                      <li>• Profesyonel danışmanlık yerine geçmez</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-amber-200/90 bg-amber-50/70 p-4">
                  <p className="text-center text-sm text-amber-950/90">
                    <strong>Önemli:</strong> Bu analiz sonuçlarına dayanarak
                    alım-satım kararı vermeden önce mutlaka{" "}
                    <strong>uzman veteriner hekim</strong> ve{" "}
                    <strong>deneyimli besicilik uzmanlarından</strong> görüş
                    alınız. Kurbanlık hayvan seçiminde profesyonel inceleme
                    şarttır.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fade-in">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Modalı Kapat"
            >
              <XMarkIcon className="h-6 w-6" strokeWidth={2} aria-hidden />
            </button>

            {/* Navigation Buttons */}
            {selectedImages.length > 1 && (
              <>
                <button
                  onClick={prevImageInModal}
                  disabled={modalImageIndex === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Önceki Fotoğraf"
                >
                  <ChevronLeftIcon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </button>

                <button
                  onClick={nextImageInModal}
                  disabled={modalImageIndex === selectedImages.length - 1}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Sonraki Fotoğraf"
                >
                  <ChevronRightIcon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </button>
              </>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Yakınlaştır"
              >
                <PlusIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Uzaklaştır"
              >
                <MinusIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
              <button
                onClick={resetZoom}
                className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Zoom Sıfırla"
              >
                <ArrowPathIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
              <div className="text-white text-xs text-center bg-black bg-opacity-50 rounded px-2 py-1">
                {Math.round(imageZoom * 100)}%
              </div>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <div
                className="transition-transform duration-200 ease-out"
                style={{ transform: `scale(${imageZoom})` }}
              >
                {selectedImages && selectedImages[modalImageIndex] ? (
                  <Image
                    src={selectedImages[modalImageIndex]}
                    alt={`Fotoğraf ${modalImageIndex + 1}`}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-white">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto mb-4 h-16 w-16 opacity-50"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <p className="text-lg opacity-75">Fotoğraf yüklenemedi</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <div className="text-center">
                <div className="font-semibold">
                  Fotoğraf {modalImageIndex + 1} / {selectedImages?.length || 0}
                </div>
                <div className="text-xs opacity-80 mt-1">
                  ESC: Kapat • ← →: Gezin • +/- : Zoom • 0: Sıfırla
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppPageShell>
  );
}
