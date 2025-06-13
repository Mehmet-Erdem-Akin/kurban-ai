from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import io
import json
from pathlib import Path
import logging
from typing import Optional, List

# Logging ayarla
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Cattle Weight Prediction Service",
    description="Hibrit AI modeli ile kurbanlık hayvan ağırlık tahmini servisi",
    version="1.0.0"
)

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://kurbanlikanaliz.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response modelleri
class WeightPrediction(BaseModel):
    ml_prediction: float
    confidence_score: float
    model_used: str
    processing_time: float

class HybridPrediction(BaseModel):
    ml_prediction: float
    gemini_prediction: Optional[float] = None
    ensemble_prediction: float
    confidence_score: float
    agreement_score: float
    processing_time: float

class HealthStatus(BaseModel):
    status: str = "OK"
    models_loaded: bool = True
    version: str = "1.0.0"

# Global model değişkenleri
ml_model = None
ensemble_models = {}

class ModelService:
    def __init__(self):
        self.models = {}
        self.ensemble_weights = {}
        self.load_models()
    
    def load_models(self):
        """Eğitilmiş modelleri yükle"""
        try:
            logger.info("🔄 Modeller yükleniyor...")
            
            models_dir = Path("models")
            if not models_dir.exists():
                raise FileNotFoundError("Models directory bulunamadı")
            
            # Ana ensemble modelini yükle
            ensemble_path = models_dir / "cattle_weight_ensemble.h5"
            if ensemble_path.exists():
                self.models['ensemble'] = tf.keras.models.load_model(str(ensemble_path))
                logger.info("✅ Ensemble model yüklendi")
            
            # Bireysel modelleri yükle
            for model_file in models_dir.glob("cattle_weight_*.h5"):
                if "ensemble" not in model_file.name:
                    arch_name = model_file.stem.replace("cattle_weight_", "")
                    self.models[arch_name] = tf.keras.models.load_model(str(model_file))
                    logger.info(f"✅ {arch_name} model yüklendi")
            
            # Ensemble ağırlıklarını yükle
            weights_file = models_dir / "ensemble_weights.json"
            if weights_file.exists():
                with open(weights_file, 'r') as f:
                    self.ensemble_weights = json.load(f)
                logger.info("✅ Ensemble ağırlıkları yüklendi")
            
        except Exception as e:
            logger.error(f"❌ Model yükleme hatası: {e}")
            raise
    
    def preprocess_image(self, image_bytes: bytes) -> np.ndarray:
        """Görsel ön işleme"""
        try:
            # PIL Image'e çevir
            image = Image.open(io.BytesIO(image_bytes))
            
            # RGB'ye çevir
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # NumPy array'e çevir
            image_array = np.array(image)
            
            # OpenCV formatına çevir (RGB -> BGR)
            image_bgr = cv2.cvtColor(image_array, cv2.COLOR_RGB2BGR)
            
            # Resize et (224x224)
            image_resized = cv2.resize(image_bgr, (224, 224))
            
            # Normalize et
            image_normalized = image_resized / 255.0
            
            # Batch dimension ekle
            image_batch = np.expand_dims(image_normalized, axis=0)
            
            return image_batch
            
        except Exception as e:
            logger.error(f"❌ Görsel ön işleme hatası: {e}")
            raise HTTPException(status_code=400, detail="Görsel işlenemedi")
    
    def predict_single_model(self, image: np.ndarray, model_name: str) -> dict:
        """Tek model ile tahmin"""
        import time
        start_time = time.time()
        
        try:
            if model_name not in self.models:
                raise ValueError(f"Model bulunamadı: {model_name}")
            
            model = self.models[model_name]
            prediction = model.predict(image, verbose=0)
            weight = float(prediction[0][0])
            
            # Güven skoru hesapla (basit versi)
            confidence = min(0.95, max(0.7, 1.0 - abs(weight - 400) / 1000))
            
            processing_time = time.time() - start_time
            
            return {
                'weight': weight,
                'confidence': confidence,
                'processing_time': processing_time,
                'model': model_name
            }
            
        except Exception as e:
            logger.error(f"❌ Model tahmin hatası: {e}")
            raise HTTPException(status_code=500, detail="Tahmin işlemi başarısız")
    
    def predict_ensemble(self, image: np.ndarray) -> dict:
        """Ensemble tahmin"""
        import time
        start_time = time.time()
        
        try:
            predictions = {}
            total_weight = 0
            total_confidence = 0
            
            # Her model için tahmin yap
            for model_name, model in self.models.items():
                if model_name != 'ensemble':  # Ensemble modelini ayrı yönet
                    pred_result = self.predict_single_model(image, model_name)
                    predictions[model_name] = pred_result
                    
                    # Ağırlıklı ortalama hesapla
                    weight = self.ensemble_weights.get(model_name, 1.0)
                    total_weight += pred_result['weight'] * weight
                    total_confidence += pred_result['confidence'] * weight
            
            # Normalize et
            total_weight_sum = sum(self.ensemble_weights.values())
            ensemble_weight = total_weight / total_weight_sum
            ensemble_confidence = total_confidence / total_weight_sum
            
            processing_time = time.time() - start_time
            
            return {
                'ensemble_weight': ensemble_weight,
                'individual_predictions': predictions,
                'confidence': ensemble_confidence,
                'processing_time': processing_time
            }
            
        except Exception as e:
            logger.error(f"❌ Ensemble tahmin hatası: {e}")
            raise HTTPException(status_code=500, detail="Ensemble tahmin başarısız")

# Model servisi singleton
model_service = ModelService()

@app.get("/health", response_model=HealthStatus)
async def health_check():
    """Servis sağlık kontrolü"""
    return HealthStatus(
        models_loaded=len(model_service.models) > 0,
        status="OK" if len(model_service.models) > 0 else "ERROR"
    )

@app.post("/predict/single", response_model=WeightPrediction)
async def predict_single(
    file: UploadFile = File(...),
    model_name: str = "resnet50"
):
    """Tek model ile ağırlık tahmini"""
    try:
        # Dosya formatı kontrolü
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Sadece görsel dosyaları desteklenir")
        
        # Görsel okuma
        image_bytes = await file.read()
        processed_image = model_service.preprocess_image(image_bytes)
        
        # Tahmin
        result = model_service.predict_single_model(processed_image, model_name)
        
        return WeightPrediction(
            ml_prediction=result['weight'],
            confidence_score=result['confidence'],
            model_used=result['model'],
            processing_time=result['processing_time']
        )
        
    except Exception as e:
        logger.error(f"❌ Single prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/ensemble", response_model=HybridPrediction)
async def predict_ensemble(file: UploadFile = File(...)):
    """Ensemble model ile ağırlık tahmini"""
    try:
        # Dosya formatı kontrolü
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Sadece görsel dosyaları desteklenir")
        
        # Görsel okuma
        image_bytes = await file.read()
        processed_image = model_service.preprocess_image(image_bytes)
        
        # Ensemble tahmin
        result = model_service.predict_ensemble(processed_image)
        
        # Agreement score hesapla (modeller arasındaki uyum)
        predictions = [pred['weight'] for pred in result['individual_predictions'].values()]
        mean_pred = np.mean(predictions)
        std_pred = np.std(predictions)
        agreement_score = max(0.5, 1.0 - (std_pred / mean_pred) if mean_pred > 0 else 0.5)
        
        return HybridPrediction(
            ml_prediction=result['ensemble_weight'],
            ensemble_prediction=result['ensemble_weight'],
            confidence_score=result['confidence'],
            agreement_score=agreement_score,
            processing_time=result['processing_time']
        )
        
    except Exception as e:
        logger.error(f"❌ Ensemble prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/hybrid")
async def predict_hybrid(
    file: UploadFile = File(...),
    gemini_prediction: Optional[float] = None
):
    """Hibrit tahmin (ML + Gemini AI)"""
    try:
        # ML tahmin
        image_bytes = await file.read()
        processed_image = model_service.preprocess_image(image_bytes)
        ml_result = model_service.predict_ensemble(processed_image)
        
        ml_weight = ml_result['ensemble_weight']
        
        # Hibrit hesaplama
        if gemini_prediction is not None:
            # Ağırlıklı ortalama (ML: %70, Gemini: %30)
            hybrid_weight = (ml_weight * 0.7) + (gemini_prediction * 0.3)
            
            # Uyum skoru hesapla
            diff_percentage = abs(ml_weight - gemini_prediction) / max(ml_weight, gemini_prediction) * 100
            agreement_score = max(0.3, 1.0 - (diff_percentage / 100))
        else:
            hybrid_weight = ml_weight
            agreement_score = ml_result['confidence']
        
        return {
            "ml_prediction": ml_weight,
            "gemini_prediction": gemini_prediction,
            "hybrid_prediction": hybrid_weight,
            "agreement_score": agreement_score,
            "confidence": ml_result['confidence'],
            "processing_time": ml_result['processing_time'],
            "individual_models": ml_result['individual_predictions']
        }
        
    except Exception as e:
        logger.error(f"❌ Hybrid prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models/info")
async def get_models_info():
    """Yüklü modeller hakkında bilgi"""
    return {
        "loaded_models": list(model_service.models.keys()),
        "ensemble_weights": model_service.ensemble_weights,
        "total_models": len(model_service.models)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 