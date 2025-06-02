# Google Gemini API Kurulum Rehberi

## 1. API Anahtarı Alma

1. **Google AI Studio'ya gidin:** https://aistudio.google.com/
2. **Google hesabınızla giriş yapın**
3. **"Get API key" butonuna tıklayın**
4. **"Create API key in new project" seçin** veya mevcut projeyi kullanın
5. **API anahtarınızı kopyalayın**

## 2. Environment Değişkeni Ayarlama

Proje kök dizininde `.env.local` dosyası oluşturun:

```bash
# Google AI API Key
GOOGLE_AI_API_KEY=your_actual_api_key_here
```

**ÖNEMLİ:** `your_actual_api_key_here` yerine gerçek API anahtarınızı yazın!

## 3. Önerilen Model

**Gemini 2.0 Flash** - En uygun maliyet/performans oranı

- ✅ Ücretsiz katmanda sınırsız kullanım
- ✅ Hızlı analiz
- ✅ Mükemmel görüntü analizi
- ✅ Düşük maliyet

## 4. Fiyatlandırma

### Ücretsiz Katman

- Google AI Studio tamamen ücretsiz
- Günlük limitleri vardır
- Test ve geliştirme için idealdir

### Ücretli Katman (ihtiyaç halinde)

- **Gemini 2.0 Flash:**
  - Input: $0.10 / 1M token
  - Output: $0.40 / 1M token
- **Her resim = 258 token**
- **10 fotoğraf analizi ≈ $0.26**

## 5. Kurulum Tamamlandı

SDK yüklendi ve API hazır!

```bash
npm install @google/generative-ai  # ✅ Tamamlandı
```

## 6. Test Etme

1. `.env.local` dosyasını oluşturun
2. API anahtarınızı ekleyin
3. Uygulamayı restart edin
4. Fotoğraf yükleyip analiz edin

## 7. Hata Giderme

- API anahtarı geçersizse mock data kullanılır
- Console'da hata mesajlarını kontrol edin
- API limitleri aşılırsa bekleme süreleri artar

## 8. Güvenlik

- `.env.local` dosyası Git'e eklenmesin (zaten .gitignore'da)
- API anahtarını kimseyle paylaşmayın
- Production'da environment variables kullanın
