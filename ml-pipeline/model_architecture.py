import tensorflow as tf
from tensorflow.keras import layers, models, optimizers, callbacks
from tensorflow.keras.applications import ResNet50, EfficientNetB0
import numpy as np
from pathlib import Path
import json
import pickle

class CattleWeightPredictor:
    def __init__(self, input_shape=(224, 224, 3)):
        self.input_shape = input_shape
        self.model = None
        self.history = None
        
    def create_model(self, architecture='resnet50'):
        """Model mimarisini oluştur"""
        print(f"🏗️ Model oluşturuluyor: {architecture}")
        
        if architecture == 'resnet50':
            return self._create_resnet_model()
        elif architecture == 'efficientnet':
            return self._create_efficientnet_model()
        elif architecture == 'custom_cnn':
            return self._create_custom_cnn()
        else:
            raise ValueError(f"Desteklenmeyen mimari: {architecture}")
    
    def _create_resnet_model(self):
        """ResNet50 tabanlı transfer learning modeli"""
        # Pre-trained ResNet50 yükle (ImageNet weights)
        base_model = ResNet50(
            weights='imagenet',
            include_top=False,
            input_shape=self.input_shape
        )
        
        # İlk katmanları dondur
        base_model.trainable = False
        
        # Custom head ekle
        model = models.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dropout(0.3),
            layers.Dense(512, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.2),
            layers.Dense(256, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.1),
            layers.Dense(128, activation='relu'),
            layers.Dense(1, activation='linear')  # Regression için linear activation
        ])
        
        model.compile(
            optimizer=optimizers.Adam(learning_rate=0.001),
            loss='mean_squared_error',
            metrics=['mean_absolute_error', 'mean_absolute_percentage_error']
        )
        
        return model
    
    def _create_efficientnet_model(self):
        """EfficientNet tabanlı model"""
        base_model = EfficientNetB0(
            weights='imagenet',
            include_top=False,
            input_shape=self.input_shape
        )
        
        base_model.trainable = False
        
        model = models.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dropout(0.4),
            layers.Dense(512, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.3),
            layers.Dense(256, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.2),
            layers.Dense(1, activation='linear')
        ])
        
        model.compile(
            optimizer=optimizers.Adam(learning_rate=0.001),
            loss='mean_squared_error',
            metrics=['mean_absolute_error', 'mean_absolute_percentage_error']
        )
        
        return model
    
    def _create_custom_cnn(self):
        """Özel CNN mimarisi"""
        model = models.Sequential([
            # İlk konvolüsyon bloğu
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=self.input_shape),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            layers.Dropout(0.1),
            
            # İkinci konvolüsyon bloğu
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            layers.Dropout(0.2),
            
            # Üçüncü konvolüsyon bloğu
            layers.Conv2D(128, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            layers.Dropout(0.2),
            
            # Dördüncü konvolüsyon bloğu
            layers.Conv2D(256, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            layers.Dropout(0.3),
            
            # Fully connected katmanlar
            layers.Flatten(),
            layers.Dense(512, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.4),
            layers.Dense(256, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.3),
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.2),
            layers.Dense(1, activation='linear')
        ])
        
        model.compile(
            optimizer=optimizers.Adam(learning_rate=0.001),
            loss='mean_squared_error',
            metrics=['mean_absolute_error', 'mean_absolute_percentage_error']
        )
        
        return model
    
    def train_model(self, X_train, y_train, X_val, y_val, epochs=50, batch_size=32):
        """Modeli eğit"""
        print("🔥 Model eğitimi başlatılıyor...")
        
        if self.model is None:
            raise ValueError("Model oluşturulmamış! Önce create_model() çağırın.")
        
        # Callbacks tanımla
        callbacks_list = [
            callbacks.EarlyStopping(
                monitor='val_loss',
                patience=10,
                restore_best_weights=True,
                verbose=1
            ),
            callbacks.ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.5,
                patience=5,
                min_lr=1e-7,
                verbose=1
            ),
            callbacks.ModelCheckpoint(
                'best_cattle_model.h5',
                monitor='val_loss',
                save_best_only=True,
                verbose=1
            )
        ]
        
        # Data augmentation
        train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
            rotation_range=15,
            width_shift_range=0.1,
            height_shift_range=0.1,
            horizontal_flip=True,
            zoom_range=0.1,
            brightness_range=[0.8, 1.2]
        )
        
        # Eğitim
        self.history = self.model.fit(
            train_datagen.flow(X_train, y_train, batch_size=batch_size),
            steps_per_epoch=len(X_train) // batch_size,
            epochs=epochs,
            validation_data=(X_val, y_val),
            callbacks=callbacks_list,
            verbose=1
        )
        
        print("✅ Model eğitimi tamamlandı!")
        return self.history
    
    def fine_tune_model(self, X_train, y_train, X_val, y_val, epochs=20):
        """Fine-tuning (transfer learning için)"""
        print("🔧 Fine-tuning başlatılıyor...")
        
        # Base model'in son katmanlarını unfreeze et
        if hasattr(self.model.layers[0], 'trainable'):
            self.model.layers[0].trainable = True
            
            # Daha düşük learning rate ile compile et
            self.model.compile(
                optimizer=optimizers.Adam(learning_rate=0.0001),
                loss='mean_squared_error',
                metrics=['mean_absolute_error', 'mean_absolute_percentage_error']
            )
        
        # Fine-tuning eğitimi
        history_fine = self.model.fit(
            X_train, y_train,
            epochs=epochs,
            validation_data=(X_val, y_val),
            callbacks=[
                callbacks.EarlyStopping(patience=5, restore_best_weights=True),
                callbacks.ReduceLROnPlateau(factor=0.3, patience=3)
            ],
            verbose=1
        )
        
        return history_fine
    
    def evaluate_model(self, X_test, y_test):
        """Model performansını değerlendir"""
        print("📊 Model değerlendiriliyor...")
        
        if self.model is None:
            raise ValueError("Model yüklenmemiş!")
        
        # Tahminler yap
        y_pred = self.model.predict(X_test)
        
        # Metrikler hesapla
        mse = tf.keras.metrics.mean_squared_error(y_test, y_pred).numpy()
        mae = tf.keras.metrics.mean_absolute_error(y_test, y_pred).numpy()
        mape = tf.keras.metrics.mean_absolute_percentage_error(y_test, y_pred).numpy()
        
        # R² score hesapla
        ss_res = np.sum((y_test - y_pred.flatten()) ** 2)
        ss_tot = np.sum((y_test - np.mean(y_test)) ** 2)
        r2_score = 1 - (ss_res / ss_tot)
        
        results = {
            'mse': float(np.mean(mse)),
            'mae': float(np.mean(mae)),
            'mape': float(np.mean(mape)),
            'r2_score': float(r2_score),
            'rmse': float(np.sqrt(np.mean(mse)))
        }
        
        print(f"📈 Model Performansı:")
        print(f"   MSE: {results['mse']:.2f}")
        print(f"   MAE: {results['mae']:.2f} kg")
        print(f"   MAPE: {results['mape']:.2f}%")
        print(f"   RMSE: {results['rmse']:.2f} kg")
        print(f"   R² Score: {results['r2_score']:.4f}")
        
        return results, y_pred
    
    def save_model(self, filepath):
        """Modeli kaydet"""
        if self.model is None:
            raise ValueError("Kaydedilecek model yok!")
        
        self.model.save(filepath)
        
        # History'yi de kaydet
        if self.history:
            with open(f"{filepath}_history.pkl", 'wb') as f:
                pickle.dump(self.history.history, f)
        
        print(f"💾 Model kaydedildi: {filepath}")
    
    def load_model(self, filepath):
        """Modeli yükle"""
        self.model = tf.keras.models.load_model(filepath)
        print(f"📂 Model yüklendi: {filepath}")
    
    def predict_weight(self, image):
        """Tek bir görsel için ağırlık tahmini"""
        if self.model is None:
            raise ValueError("Model yüklenmemiş!")
        
        # Görsel ön işleme
        if len(image.shape) == 3:
            image = np.expand_dims(image, axis=0)
        
        # Tahmin yap
        prediction = self.model.predict(image)
        return float(prediction[0][0])

# Model ensemble sınıfı
class ModelEnsemble:
    def __init__(self, models=None):
        self.models = models or []
        
    def add_model(self, model, weight=1.0):
        """Ensemble'a model ekle"""
        self.models.append({'model': model, 'weight': weight})
    
    def predict(self, X):
        """Ensemble tahmini"""
        if not self.models:
            raise ValueError("Ensemble'da model yok!")
        
        predictions = []
        total_weight = sum(m['weight'] for m in self.models)
        
        for model_info in self.models:
            model = model_info['model']
            weight = model_info['weight'] / total_weight
            pred = model.predict(X) * weight
            predictions.append(pred)
        
        return np.sum(predictions, axis=0) 