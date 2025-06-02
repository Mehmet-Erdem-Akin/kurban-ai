# Kurbanlık Hayvan Analiz Projesi - Proje Gereksinim Dokümanı

## Proje Özeti

Yapay zeka destekli kurbanlık hayvan analiz platformu. Kullanıcılar fotoğraf yükleyerek hayvanların ağırlık, sağlık durumu, cins ve pazar değeri analizi alabilirler.

## Özellikler

### 🎯 Temel İşlevler

- [x] Fotoğraf yükleme (galeri/kamera)
- [x] AI destekli hayvan analizi
- [x] Ağırlık tahmini
- [x] Sağlık skoru hesaplama
- [x] Pazar değeri analizi
- [x] Et verimi hesaplama

### 🧠 AI Analiz Motoru

- [x] Google Gemini 2.0 Flash entegrasyonu
- [x] Çoklu fotoğraf desteği (aynı hayvan, farklı açılar)
- [x] Türkçe prompt optimizasyonu
- [x] Gerçek zamanlı analiz

### 💰 Fiyat Hesaplama Sistemi

- [x] 2025 güncel Türkiye et fiyatları
- [x] Büyükbaş/küçükbaş ayrımı
- [x] Premium ırk hesaplaması (+%20-25)
- [x] Kurban sezonu primi (+%15-20)
- [x] Kalite derecesi ayarlaması
- [x] Yeni fiyat formülü: (ağırlık ÷ 2) × et_fiyatı

### 📱 Kullanıcı Deneyimi

- [x] Modern ve responsive tasarım
- [x] Çoklu fotoğraf yönetimi
- [x] Gerçek zamanlı kamera desteği
- [x] Detaylı sonuç görüntüleme
- [x] Hisse hesaplama (7 kişi)

## Teknik Detaylar

### 🛠 Teknoloji Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **AI Model:** Google Gemini 2.0 Flash
- **Backend:** Next.js API Routes
- **Deployment:** Vercel/Docker

### 📊 Analiz Parametreleri

- **Büyükbaş Et Fiyatı:** 450 TL/kg
- **Küçükbaş Et Fiyatı:** 520 TL/kg
- **Karkas Verimi:** Büyükbaş %52, Küçükbaş %48
- **Kemiksiz Et:** Büyükbaş %72, Küçükbaş %70

## Yapıldı

### ✅ Gemini API Entegrasyonu (02.06.2025)

- Google Gemini 2.0 Flash API kullanımı
- Environment değişkenleri konfigürasyonu
- API key güvenlik ayarları
- Hata yönetimi ve fallback sistemleri

### ✅ Güncel Türkiye Et Fiyatları Entegrasyonu (02.06.2025)

- 2025 Haziran dönemi güncel fiyat referansları
- Büyükbaş: 450 TL/kg, Küçükbaş: 520 TL/kg
- ESK oranları ve piyasa primleri
- Bölgesel farklılık hesaplaması

### ✅ Gelişmiş Fiyat Hesaplama Sistemi (02.06.2025)

- Yeni formül: (hayvan_ağırlığı ÷ 2) × et_fiyatı
- Premium ırk bonusları (Simental, Holstein, Angus)
- Kurban sezonu dinamik fiyatlandırması
- A/B kalite derecesi ayarlamaları

### ✅ Çoklu Fotoğraf Analiz Sistemi (02.06.2025)

- Aynı hayvana ait farklı açılardan fotoğraf desteği
- Unified assessment (birleşik değerlendirme)
- Yüksek güvenilirlik skorları (%90+)
- Multi-angle ağırlık tahmini

### ✅ Türkçe Prompt Optimizasyonu (02.06.2025)

- Tam Türkçe AI talimatları
- Detaylı field doldurma zorunlulukları
- Gerçekçi örnek değer açıklamaları
- Fallback data Türkçeleştirmesi

### ✅ Kapsamlı Analiz Görselleştirme Sistemi (02.06.2025)

- 3 kolonlu detay grid (Hayvan/Et/Fiyat bilgileri)
- Renkli veri kartları ve metrik gösterimi
- Karkas-kemiksiz et verimi analizi
- Dinamik sağlık rozet sistemi
- Hisse bazında maliyet hesaplama
- Analiz tarihi/türü detay bilgileri

### ✅ Yasal Uyarı ve Sorumluluk Reddi Sistemi (02.06.2025)

- Üst banner AI analizi disclaimer'ı
- 4 kategorili kapsamlı yasal uyarılar
- AI analizi sınırları bilgilendirmesi
- Veteriner kontrolü gereklilik uyarısı
- Hukuki sorumluluk reddi beyanları
- Profesyonel danışmanlık uyarı sistemi

## Gelecek Özellikler

### 🔮 Planlanan

- [ ] Favori hayvanlar sistemi
- [ ] Sosyal paylaşım özellikleri
- [ ] Fiyat geçmişi takibi
- [ ] Offline analiz desteği
- [ ] Toplu fotoğraf analizi
- [ ] PDF rapor çıktısı

### 📈 İyileştirmeler

- [ ] Daha detaylı sağlık analizi
- [ ] Hayvan yaşı tahmin doğruluğu
- [ ] Bölgesel fiyat farklılıkları
- [ ] Mevsimsel trend analizi

---

_Son güncellenme: 02.06.2025_
