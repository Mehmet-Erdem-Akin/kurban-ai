import pandas as pd
import numpy as np
import cv2
import os
from pathlib import Path
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import json

class CattleDataProcessor:
    def __init__(self, dataset_path: str):
        self.dataset_path = Path(dataset_path)
        self.images_path = self.dataset_path / "images"
        self.annotations_path = self.dataset_path / "annotations"
        
    def analyze_dataset(self):
        """Dataset'i analiz et ve istatistikleri çıkar"""
        print("🔍 Dataset analizi başlatılıyor...")
        
        # Görsel dosyalarını say
        image_files = list(self.images_path.glob("*.jpg")) + list(self.images_path.glob("*.png"))
        annotation_files = list(self.annotations_path.glob("*.json")) + list(self.annotations_path.glob("*.csv"))
        
        print(f"📊 Toplam görsel sayısı: {len(image_files)}")
        print(f"📋 Toplam annotasyon sayısı: {len(annotation_files)}")
        
        # Görsel boyutlarını analiz et
        image_sizes = []
        weights = []
        
        for i, img_path in enumerate(image_files[:100]):  # İlk 100 görsel için
            img = cv2.imread(str(img_path))
            if img is not None:
                image_sizes.append(img.shape[:2])
                
                # Corresponding annotation file bul
                annotation_file = self.annotations_path / f"{img_path.stem}.json"
                if annotation_file.exists():
                    with open(annotation_file, 'r') as f:
                        data = json.load(f)
                        if 'weight' in data:
                            weights.append(data['weight'])
        
        # İstatistikleri göster
        if weights:
            print(f"📏 Ağırlık ortalaması: {np.mean(weights):.2f} kg")
            print(f"📏 Ağırlık aralığı: {np.min(weights):.2f} - {np.max(weights):.2f} kg")
            
        if image_sizes:
            heights, widths = zip(*image_sizes)
            print(f"🖼️ Ortalama görsel boyutu: {np.mean(widths):.0f}x{np.mean(heights):.0f}")
            
        return {
            'total_images': len(image_files),
            'total_annotations': len(annotation_files),
            'weight_stats': {
                'mean': np.mean(weights) if weights else 0,
                'min': np.min(weights) if weights else 0,
                'max': np.max(weights) if weights else 0,
                'std': np.std(weights) if weights else 0
            },
            'image_stats': {
                'mean_width': np.mean(widths) if image_sizes else 0,
                'mean_height': np.mean(heights) if image_sizes else 0
            }
        }
    
    def prepare_training_data(self, target_size=(224, 224)):
        """Eğitim verisi hazırla"""
        print("🔄 Eğitim verisi hazırlanıyor...")
        
        X = []  # Görseller
        y = []  # Ağırlıklar
        metadata = []  # Ek bilgiler
        
        image_files = list(self.images_path.glob("*.jpg")) + list(self.images_path.glob("*.png"))
        
        for img_path in image_files:
            # Görsel yükle ve resize et
            img = cv2.imread(str(img_path))
            if img is not None:
                img_resized = cv2.resize(img, target_size)
                img_normalized = img_resized / 255.0
                
                # Annotation dosyasını bul
                annotation_file = self.annotations_path / f"{img_path.stem}.json"
                if annotation_file.exists():
                    with open(annotation_file, 'r') as f:
                        data = json.load(f)
                        
                        if 'weight' in data:
                            X.append(img_normalized)
                            y.append(data['weight'])
                            metadata.append({
                                'filename': img_path.name,
                                'animal_type': data.get('animal_type', 'unknown'),
                                'age': data.get('age', 0),
                                'gender': data.get('gender', 'unknown')
                            })
        
        # Numpy array'e çevir
        X = np.array(X)
        y = np.array(y)
        
        print(f"✅ Hazırlanan veri: {X.shape[0]} örnek")
        print(f"📊 Görsel boyutu: {X.shape[1:]}") 
        print(f"🎯 Hedef değişken aralığı: {y.min():.2f} - {y.max():.2f} kg")
        
        return X, y, metadata
    
    def create_data_splits(self, X, y, metadata, test_size=0.2, val_size=0.1):
        """Veriyi train/validation/test olarak böl"""
        print("📋 Veri bölünüyor...")
        
        # İlk olarak train+val ve test ayır
        X_temp, X_test, y_temp, y_test, meta_temp, meta_test = train_test_split(
            X, y, metadata, test_size=test_size, random_state=42
        )
        
        # Train ve validation ayır
        val_size_adjusted = val_size / (1 - test_size)
        X_train, X_val, y_train, y_val, meta_train, meta_val = train_test_split(
            X_temp, y_temp, meta_temp, test_size=val_size_adjusted, random_state=42
        )
        
        print(f"🔹 Train set: {X_train.shape[0]} örnek")
        print(f"🔹 Validation set: {X_val.shape[0]} örnek") 
        print(f"🔹 Test set: {X_test.shape[0]} örnek")
        
        return {
            'train': (X_train, y_train, meta_train),
            'val': (X_val, y_val, meta_val),
            'test': (X_test, y_test, meta_test)
        }
    
    def save_processed_data(self, data_splits, output_dir="processed_data"):
        """İşlenmiş veriyi kaydet"""
        output_path = Path(output_dir)
        output_path.mkdir(exist_ok=True)
        
        for split_name, (X, y, metadata) in data_splits.items():
            np.save(output_path / f"X_{split_name}.npy", X)
            np.save(output_path / f"y_{split_name}.npy", y)
            
            with open(output_path / f"metadata_{split_name}.json", 'w') as f:
                json.dump(metadata, f, indent=2)
        
        print(f"💾 İşlenmiş veri kaydedildi: {output_path}")

if __name__ == "__main__":
    # Dataset yolunu belirt
    dataset_path = "cattle_weight_dataset"
    
    processor = CattleDataProcessor(dataset_path)
    
    # 1. Dataset analizi
    stats = processor.analyze_dataset()
    print(f"📈 Dataset istatistikleri: {stats}")
    
    # 2. Eğitim verisi hazırla
    X, y, metadata = processor.prepare_training_data()
    
    # 3. Veriyi böl
    data_splits = processor.create_data_splits(X, y, metadata)
    
    # 4. Kaydet
    processor.save_processed_data(data_splits)
    
    print("✅ Veri hazırlığı tamamlandı!") 