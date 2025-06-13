from data_preparation import CattleDataProcessor
from model_architecture import CattleWeightPredictor, ModelEnsemble
import numpy as np
import tensorflow as tf
import json
from pathlib import Path
import matplotlib.pyplot as plt
import pandas as pd

class TrainingPipeline:
    def __init__(self, data_dir="processed_data"):
        self.data_dir = Path(data_dir)
        self.models = {}
        
    def load_processed_data(self):
        """İşlenmiş veriyi yükle"""
        print("📂 İşlenmiş veri yükleniyor...")
        
        data = {}
        for split in ['train', 'val', 'test']:
            X = np.load(self.data_dir / f"X_{split}.npy")
            y = np.load(self.data_dir / f"y_{split}.npy")
            
            with open(self.data_dir / f"metadata_{split}.json", 'r') as f:
                metadata = json.load(f)
            
            data[split] = (X, y, metadata)
            print(f"✅ {split.capitalize()} set: {X.shape[0]} örnek yüklendi")
        
        return data
    
    def train_multiple_models(self, data, architectures=['resnet50', 'efficientnet', 'custom_cnn']):
        """Birden fazla model mimarisi eğit"""
        print("🚀 Çoklu model eğitimi başlatılıyor...")
        
        X_train, y_train, _ = data['train']
        X_val, y_val, _ = data['val']
        X_test, y_test, _ = data['test']
        
        results = {}
        
        for arch in architectures:
            print(f"\n🔥 {arch.upper()} modeli eğitiliyor...")
            
            # Model oluştur
            predictor = CattleWeightPredictor()
            predictor.model = predictor.create_model(architecture=arch)
            
            # Eğit
            history = predictor.train_model(
                X_train, y_train, X_val, y_val,
                epochs=50, batch_size=32
            )
            
            # Fine-tuning (transfer learning için)
            if arch in ['resnet50', 'efficientnet']:
                print(f"🔧 {arch} fine-tuning...")
                predictor.fine_tune_model(X_train, y_train, X_val, y_val, epochs=20)
            
            # Değerlendir
            metrics, predictions = predictor.evaluate_model(X_test, y_test)
            
            # Kaydet
            model_path = f"models/cattle_weight_{arch}.h5"
            Path("models").mkdir(exist_ok=True)
            predictor.save_model(model_path)
            
            # Sonuçları sakla
            results[arch] = {
                'predictor': predictor,
                'metrics': metrics,
                'predictions': predictions,
                'history': history.history if history else None
            }
            
            self.models[arch] = predictor
            
            print(f"✅ {arch} modeli tamamlandı - MAE: {metrics['mae']:.2f} kg")
        
        return results
    
    def create_ensemble_model(self, results):
        """En iyi modelleri birleştirerek ensemble oluştur"""
        print("🎯 Ensemble model oluşturuluyor...")
        
        # Model performanslarına göre ağırlık hesapla
        weights = {}
        total_inverse_mae = 0
        
        for arch, result in results.items():
            mae = result['metrics']['mae']
            inverse_mae = 1 / mae
            weights[arch] = inverse_mae
            total_inverse_mae += inverse_mae
        
        # Normalize et
        for arch in weights:
            weights[arch] = weights[arch] / total_inverse_mae
        
        print("📊 Model ağırlıkları:")
        for arch, weight in weights.items():
            print(f"   {arch}: {weight:.3f}")
        
        # Ensemble oluştur
        ensemble = ModelEnsemble()
        for arch, result in results.items():
            ensemble.add_model(result['predictor'], weights[arch])
        
        return ensemble, weights
    
    def evaluate_ensemble(self, ensemble, data):
        """Ensemble modelini değerlendir"""
        print("🏆 Ensemble model değerlendiriliyor...")
        
        X_test, y_test, _ = data['test']
        
        # Ensemble tahminleri
        y_pred_ensemble = ensemble.predict(X_test)
        
        # Metrikler hesapla
        mse = np.mean((y_test - y_pred_ensemble.flatten()) ** 2)
        mae = np.mean(np.abs(y_test - y_pred_ensemble.flatten()))
        mape = np.mean(np.abs((y_test - y_pred_ensemble.flatten()) / y_test)) * 100
        
        ss_res = np.sum((y_test - y_pred_ensemble.flatten()) ** 2)
        ss_tot = np.sum((y_test - np.mean(y_test)) ** 2)
        r2_score = 1 - (ss_res / ss_tot)
        
        ensemble_metrics = {
            'mse': mse,
            'mae': mae,
            'mape': mape,
            'r2_score': r2_score,
            'rmse': np.sqrt(mse)
        }
        
        print(f"🎊 Ensemble Performansı:")
        print(f"   MAE: {ensemble_metrics['mae']:.2f} kg")
        print(f"   RMSE: {ensemble_metrics['rmse']:.2f} kg") 
        print(f"   MAPE: {ensemble_metrics['mape']:.2f}%")
        print(f"   R² Score: {ensemble_metrics['r2_score']:.4f}")
        
        return ensemble_metrics, y_pred_ensemble
    
    def plot_training_results(self, results):
        """Eğitim sonuçlarını görselleştir"""
        print("📈 Eğitim sonuçları görselleştiriliyor...")
        
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        
        # Loss grafikleri
        ax1 = axes[0, 0]
        for arch, result in results.items():
            if result['history']:
                ax1.plot(result['history']['loss'], label=f'{arch} - train')
                ax1.plot(result['history']['val_loss'], label=f'{arch} - val', linestyle='--')
        ax1.set_title('Model Loss')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Loss')
        ax1.legend()
        ax1.grid(True)
        
        # MAE grafikleri
        ax2 = axes[0, 1]
        for arch, result in results.items():
            if result['history']:
                ax2.plot(result['history']['mean_absolute_error'], label=f'{arch} - train')
                ax2.plot(result['history']['val_mean_absolute_error'], label=f'{arch} - val', linestyle='--')
        ax2.set_title('Mean Absolute Error')
        ax2.set_xlabel('Epoch')
        ax2.set_ylabel('MAE')
        ax2.legend()
        ax2.grid(True)
        
        # Model karşılaştırması
        ax3 = axes[1, 0]
        architectures = list(results.keys())
        mae_scores = [results[arch]['metrics']['mae'] for arch in architectures]
        r2_scores = [results[arch]['metrics']['r2_score'] for arch in architectures]
        
        x = np.arange(len(architectures))
        ax3.bar(x, mae_scores, alpha=0.7)
        ax3.set_title('Model MAE Karşılaştırması')
        ax3.set_xlabel('Model')
        ax3.set_ylabel('MAE (kg)')
        ax3.set_xticks(x)
        ax3.set_xticklabels(architectures)
        
        # R² skorları
        ax4 = axes[1, 1]
        ax4.bar(x, r2_scores, alpha=0.7, color='green')
        ax4.set_title('Model R² Skoru Karşılaştırması')
        ax4.set_xlabel('Model')
        ax4.set_ylabel('R² Score')
        ax4.set_xticks(x)
        ax4.set_xticklabels(architectures)
        
        plt.tight_layout()
        plt.savefig('training_results.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        print("💾 Grafikler 'training_results.png' olarak kaydedildi")
    
    def generate_model_report(self, results, ensemble_metrics):
        """Detaylı model raporu oluştur"""
        print("📋 Model raporu oluşturuluyor...")
        
        report = {
            'training_summary': {
                'total_models': len(results),
                'architectures': list(results.keys()),
                'best_individual_model': min(results.keys(), key=lambda x: results[x]['metrics']['mae']),
                'ensemble_improvement': True
            },
            'individual_models': {},
            'ensemble_performance': ensemble_metrics,
            'recommendations': []
        }
        
        # Bireysel model sonuçları
        for arch, result in results.items():
            report['individual_models'][arch] = result['metrics']
        
        # En iyi modeli bul
        best_model = report['training_summary']['best_individual_model']
        best_mae = results[best_model]['metrics']['mae']
        ensemble_mae = ensemble_metrics['mae']
        
        # Öneriler
        if ensemble_mae < best_mae:
            improvement = ((best_mae - ensemble_mae) / best_mae) * 100
            report['recommendations'].append(f"Ensemble model %{improvement:.1f} daha iyi performans gösteriyor")
        
        if ensemble_metrics['r2_score'] > 0.9:
            report['recommendations'].append("Model çok iyi performans gösteriyor (R² > 0.9)")
        elif ensemble_metrics['r2_score'] > 0.8:
            report['recommendations'].append("Model iyi performans gösteriyor (R² > 0.8)")
        else:
            report['recommendations'].append("Model performansı geliştirilebilir")
        
        # Raporu kaydet
        with open('model_report.json', 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print("📄 Model raporu 'model_report.json' olarak kaydedildi")
        return report

def main():
    """Ana eğitim pipeline'ı"""
    print("🚀 Hibrit AI Model Eğitim Pipeline'ı Başlatılıyor")
    print("=" * 60)
    
    # Pipeline oluştur
    pipeline = TrainingPipeline()
    
    # Veriyi yükle
    data = pipeline.load_processed_data()
    
    # Birden fazla model eğit
    results = pipeline.train_multiple_models(data)
    
    # Ensemble oluştur
    ensemble, weights = pipeline.create_ensemble_model(results)
    
    # Ensemble'ı değerlendir
    ensemble_metrics, _ = pipeline.evaluate_ensemble(ensemble, data)
    
    # Sonuçları görselleştir
    pipeline.plot_training_results(results)
    
    # Rapor oluştur
    report = pipeline.generate_model_report(results, ensemble_metrics)
    
    print("\n🎉 Eğitim tamamlandı!")
    print(f"🏆 En iyi bireysel model: {report['training_summary']['best_individual_model']}")
    print(f"🎯 Ensemble MAE: {ensemble_metrics['mae']:.2f} kg")
    print(f"📊 Ensemble R²: {ensemble_metrics['r2_score']:.4f}")
    
    return pipeline, results, ensemble

if __name__ == "__main__":
    pipeline, results, ensemble = main() 