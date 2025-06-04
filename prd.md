# Kurban-AI - Product Requirements Document (PRD)

## Proje Genel Bakış

Kurban-AI, yapay zeka teknolojisini kullanarak kurbanlık hayvan analizi yapan web tabanlı bir uygulamadır. Kullanıcılar hayvan fotoğrafları yükleyerek detaylı analiz raporları alabilirler.

## Özellikler

### Mevcut Özellikler

#### Ana Sayfa (/)

- ✅ Hero section with animated elements
- ✅ Interactive drawing canvas for animals
- ✅ Feature cards showcasing AI analysis capabilities
- ✅ Statistics section with key metrics
- ✅ How it works workflow explanation
- ✅ Call-to-action section

#### Analiz Sayfası (/analyze)

- ✅ File upload functionality
- ✅ Camera capture support
- ✅ AI-powered image analysis
- ✅ Detailed animal report generation

#### Diğer Sayfalar

- ✅ Privacy Policy (/privacy)
- ✅ Terms of Service (/terms)
- ✅ KVKK compliance (/kvkk)
- ✅ Contact page (/contact)
- ✅ Demo page (/demo)

### Yeni Eklenen Özellikler

#### Pastel Tema Sistemi

- ✅ **Pastel Renk Paleti**: Soft lavender, rose, sky, mint, cream, peach tonları
- ✅ **Gradient Backgrounds**: Çoklu pastel renk geçişleri
- ✅ **Glass Effect**: Backdrop blur ve şeffaflık efektleri
- ✅ **Enhanced Shadows**: Pastel renklerde yumuşak gölgeler
- ✅ **Rounded Design**: Modern 2xl ve 3xl border radius

#### Parallax ve Animasyon Efektleri

- ✅ **Background Parallax**: Sabit pozisyonda hareket eden hayvan emojileri
- ✅ **Floating Elements**: Sayfada süzülen interactive elementler
- ✅ **Enhanced Animations**: Float, parallax, bounce-slow animasyonları
- ✅ **Hover Effects**: Scale ve transform efektleri
- ✅ **Shimmer Effects**: CTA butonlarında parlama animasyonları

#### Gelişmiş UI/UX

- ✅ **Pastel Button System**: Gradient renkli butonlar
- ✅ **Card Redesign**: Glass effect ve pastel arka planlar
- ✅ **Icon Enhancement**: Daha büyük ve animate icon containerlar
- ✅ **Typography Improvements**: Gradient text efektleri
- ✅ **Responsive Design**: Tüm ekran boyutlarına uyumlu

#### İçerik Genişletmeleri

- ✅ **Gelişmiş Özellikler Bölümü**: DNA analizi, sağlık taraması, ağırlık tahmini, et kalitesi
- ✅ **Kullanıcı Testimonials**: Gerçekçi kullanıcı yorumları ve değerlendirmeleri
- ✅ **İstatistik Güncellemeleri**: 15K+ analiz, %98 doğruluk, 24/7 hizmet, 2 saniye analiz
- ✅ **FAQ Bölümü**: Sıkça sorulan sorular ve detaylı cevaplar
- ✅ **Enhanced Canvas**: Pastel renkli çizim alanı ve gelişmiş araçlar

#### Teknik İyileştirmeler

- ✅ **Tailwind Config**: Pastel renk sistemi eklendi
- ✅ **CSS Animations**: Yeni keyframe animasyonları
- ✅ **Component Structure**: Modüler component yapısı
- ✅ **Performance**: Parallax ve floating elementler optimize edildi

## Teknik Detaylar

### Renk Sistemi

```typescript
pastel: {
  rose: { 50-900 }, // Soft pinks
  lavender: { 50-900 }, // Soft purples
  sky: { 50-900 }, // Soft blues
  mint: { 50-900 }, // Soft greens
  cream: { 50-900 }, // Soft yellows
  peach: { 50-900 } // Soft oranges
}
```

### Animasyon Sistemi

- **Float**: 6s ease-in-out infinite
- **Parallax**: 20s ease-in-out infinite
- **Bounce-slow**: 2s infinite
- **Shimmer**: 3s infinite

### Komponent Hiyerarşisi

```
HomePage
├── ParallaxBackground
├── FloatingAnimals
├── Header (Enhanced)
├── HeroSection (Expanded)
├── DrawingCanvas (Pastel)
├── FeaturesSection (Enhanced)
├── AdvancedFeatures (New)
├── AnimalStats (Enhanced)
├── Testimonials (New)
├── HowItWorks (Enhanced)
├── FAQ (New)
├── CTA (Enhanced)
└── Footer (Enhanced)
```

## Performans ve Optimizasyon

### CSS Optimizasyonları

- Glass effect ve backdrop-blur optimize edildi
- Parallax elementleri fixed positioning ile optimize edildi
- Animation timeline'ları düzenlendi

### Responsive Design

- Mobile-first approach
- Breakpoint optimizasyonları
- Touch gesture desteği

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- ARIA labels güncellendi
- Color contrast pastel tema için optimize edildi
- Keyboard navigation desteklendi
- Screen reader uyumluluğu

## Yapılacaklar (Roadmap)

### Phase 2 - İleri Özellikler

- [ ] Dark mode toggle
- [ ] Advanced parallax effects with scroll-based animations
- [ ] 3D transform effects
- [ ] Video backgrounds
- [ ] Interactive animal models

### Phase 3 - AI Geliştirmeleri

- [ ] Real-time analysis preview
- [ ] Batch processing
- [ ] Advanced reporting features
- [ ] API endpoints for third-party integration

## Yapıldı

### İletişim ve URL Güncellemeleri (2025-01-27)

- ✅ İletişim sayfasındaki form kaldırıldı, kişisel bilgiler (Mehmet Erdem Akın) eklendi
- ✅ Sosyal medya linkleri gerçek hesaplarla güncellendi:
  - Twitter: https://x.com/Mehmetoloji_
  - GitHub: https://github.com/Mehmet-Erdem-Akin/kurban-ai
  - LinkedIn: https://www.linkedin.com/in/mehmet-erdem-akin-77453b1a0/
- ✅ Proje URL'si kurbanlikanaliz.netlify.app olarak güncellendi
- ✅ KVKK sayfasında veri saklama süreleri kaldırıldı, "veri saklanmaz" politikası eklendi
- ✅ Privacy sayfasında veri saklama tablosu güncellendi, minimizasyon prensibi vurgulandı
- ✅ Tüm sayfalarda veri saklama ibareleri kaldırıldı/güncellendi
- ✅ README.md dosyası yeni özellikler ve linklerle güncellendi

### Çoklu Fotoğraf Çekim Özelliği (2025-01-25)

- ✅ Çoklu fotoğraf çekim özelliği eklendi
- ✅ Fotoğraf sayacı ve dinamik buton metinleri eklendi
- ✅ Kamera açık kalma özelliği eklendi
- ✅ "Çekimi Bitir" butonu ve rehberlik metinleri eklendi
- ✅ Farklı açılardan çekim için ipuçları eklendi

### Anasayfa İçerik Genişletmesi (2025-01-24)

- ✅ Gelişmiş özellikler bölümü eklendi (4 kart)
- ✅ Desteklenen hayvan türleri bölümü eklendi
- ✅ Teknoloji altyapısı bölümü eklendi
- ✅ "Nasıl Çalışır" bölümü 4 adıma çıkarıldı
- ✅ Analiz parametreleri listesi eklendi (9 parametre)
- ✅ İstatistik verileri güncellendi (95%+, 15+, 100%, <30sn)
- ✅ Güvenlik & gizlilik bölümü eklendi
- ✅ Kullanıcı deneyimleri (testimonials) eklendi
- ✅ FAQ bölümü eklendi (4 soru-cevap)
- ✅ Gelişmiş CTA bölümü eklendi

### Hayvan Türü Badge Standardizasyonu (2025-01-23)

- ✅ Tüm hayvan türleri için standart 4 badge sistemi uygulandı:
  - Ağırlık Tahmini (yeşil)
  - Et Miktarı (mavi)
  - Değer Hesaplama (sarı)
  - Sağlık Durumu (kırmızı)

### İletişim Sayfası Oluşturma (2025-01-22)

- ✅ Kapsamlı iletişim sayfası oluşturuldu (/contact)
- ✅ İletişim formu eklendi (ad, email, konu, mesaj)
- ✅ İletişim bilgileri bölümü eklendi
- ✅ Hızlı yardım linkleri eklendi
- ✅ Sosyal medya entegrasyonu eklendi
- ✅ Footer iletişim linki güncellendi

### Renk Sistemi Değişikliği (2025-01-21)

- ✅ Pembe/mor tonlardan yeşil tema sistemine geçiş
- ✅ Tüm bileşenlerde renk uyumluluğu sağlandı
- ✅ SVG dosyalarında renk güncellemeleri yapıldı
- ✅ CSS gradientleri yeşil tonlarıyla güncellendi

### 3D Efekt Optimizasyonları (2025-01-20)

- ✅ Card3D bileşenindeki aşırı 3D efektler azaltıldı
- ✅ Hover animasyonları minimal seviyeye indirildi
- ✅ Gölge efektleri daha subtle hale getirildi

### UI/UX Improvements (2025-01-27)

- ✅ Pastel tema sistemi eklendi (lavender, rose, sky, mint, cream, peach)
- ✅ Parallax background efektleri eklendi
- ✅ Floating animasyon elementleri eklendi
- ✅ Glass effect ve backdrop blur uygulandı
- ✅ Gelişmiş özellikler bölümü eklendi (DNA analizi, sağlık taraması, ağırlık tahmini, et kalitesi)
- ✅ Kullanıcı testimonials bölümü eklendi
- ✅ FAQ (Sıkça Sorulan Sorular) bölümü eklendi
- ✅ İstatistik verileri güncellendi (15K+ analiz, %98 doğruluk)
- ✅ Canvas çizim alanı pastel renklerle yenilendi
- ✅ Tüm butonlar ve kartlar pastel gradient tasarımla güncellendi
- ✅ Animasyon sistemi geliştirildi (float, shimmer, bounce-slow)
- ✅ Typography gradient text efektleri eklendi

## Proje Genel Bilgiler

- **Proje Adı:** Kurban-AI - Kurbanlık Hayvan Analiz Sistemi
- **Başlangıç Tarihi:** Mart 2025
- **Mevcut Durum:** MVP Geliştirme Aşaması
- **Teknoloji Stack:** Next.js, TypeScript, Tailwind CSS, Google Gemini 2.0 Flash API

## Ana Özellikler

### 🤖 AI Analiz Motoru

- Gemini 2.0 Flash API entegrasyonu
- Kurbanlık hayvan türü tespiti (Dana, Boğa, İnek, Koç, Koyun, Keçi, Manda)
- Ağırlık tahmini algoritması
- Sağlık durumu değerlendirmesi
- Et verimi hesaplama
- Piyasa değeri tahmini

### 📸 Fotoğraf Yükleme & Kamera

- Galeriden çoklu fotoğraf yükleme
- Canlı kamera entegrasyonu
- Tek ve çoklu fotoğraf analizi desteği
- Fotoğraf büyütme (zoom) özelliği
- Modal görüntüleme sistemi

### 📋 Kullanıcı Giriş Formu

- Hayvan kategorisi seçimi (Büyükbaş/Küçükbaş)
- Tür, cinsiyet, yaş bilgileri
- Tahmini ağırlık girişi
- Sağlık ve gebelik durumu
- Bölge bilgisi
- Özel notlar alanı

### 💰 Fiyatlama Sistemi

- Türkiye piyasa fiyatları
- Karkas hesaplama (%55 büyükbaş, %50 küçükbaş)
- Kurban sezonu primleri
- Hisse hesaplama (7 kişilik büyükbaş)
- Kalite premium hesaplaması

### 🎨 Kullanıcı Arayüzü

- Modern ve responsive tasarım
- Animasyon ve geçişler
- Hata yönetimi ve kullanıcı geri bildirimleri
- Türkçe dil desteği
- Accessibility özellikler

## Yapıldı

### ✅ AI Prompt Optimizasyonu - Ağırlık Tahmini Geliştirmesi (Mart 2025)

- **Özellik:** AI modelinin ağırlık tahminini çok daha hassas yapması için prompt optimizasyonu
- **Detaylar:**
  - 6 adımlı ağırlık hesaplama metodolojisi eklendi
  - Görsel indikatörler analizi (karın dolgunluğu, kas yapısı, vücut oranları)
  - Türe göre standart ağırlık aralıkları tanımlandı
  - Kondisyon değerlendirmesi (zayıf/normal/besili) kriterleri
  - Yaş-ağırlık korelasyonu hesaplaması
  - Kullanıcı verisi ile AI tahmininin karşılaştırılması
  - Validasyon ve kontrol mekanizmaları
  - Detaylı örnekler ve hesaplama formülleri
- **Teknik:**
  - `src/app/api/analyze/route.ts` dosyasında prompt genişletildi
  - Kullanıcının girdiği ağırlık bilgisi AI tarafından dikkate alınıyor
  - %20 tolerans ile kullanıcı verisi-AI tahmin uyumu sağlanıyor
- **Sonuç:** Ağırlık tahmin doğruluğu önemli ölçüde artırıldı

### ✅ Kod Kalitesi İyileştirmeleri ve Build Hata Düzeltmeleri (Mart 2025)

- **Özellik:** TypeScript ve ESLint hatalarının giderilmesi, kod kalitesinin artırılması
- **Detaylar:**
  - TypeScript tip güvenliği iyileştirmeleri
  - ESLint uyarılarının giderilmesi
  - React Hook dependency sorunlarının çözümü
  - Accessibility ve kod standartları uygunluğu
- **Teknik:**
  - `any` type kullanımı kaldırılarak proper interface tanımlandı (`AdditionalInfo`)
  - `useCallback` hook kullanılarak performans optimizasyonu
  - Unused variable (`marketPrice`) temizlendi
  - React unescaped entities sorunu çözüldü
  - Build process başarıyla tamamlanabilir hale getirildi
- **Sonuç:** Üretim ortamına hazır, hatasız kod tabanı elde edildi

## Geliştirilecek Özellikler

### 🚀 Öncelikli (High Priority)

- [ ] Kullanıcı hesap sistemi ve giriş
- [ ] Analiz geçmişi kaydetme
- [ ] PDF rapor oluşturma
- [ ] Karşılaştırma özelliği
- [ ] Offline çalışma desteği

### 📈 Orta Öncelik (Medium Priority)

- [ ] Bölgesel fiyat farklılıkları
- [ ] Dinamik piyasa fiyat güncellemesi
- [ ] Veteriner tavsiyeleri
- [ ] Hayvan bakım rehberi
- [ ] Sosyal paylaşım özellikleri

### 🔮 Uzun Vadeli (Low Priority)

- [ ] Video analiz desteği
- [ ] Çoklu dil desteği
- [ ] API erişimi (B2B)
- [ ] Mobile uygulama
- [ ] Blockchain sertifika sistemi

## Teknik Borçlar

### 🔧 Performance

- [ ] Resim optimizasyonu ve sıkıştırma
- [ ] Lazy loading implementasyonu
- [ ] Cache stratejileri
- [ ] API rate limiting

### 🛡️ Güvenlik

- [ ] Resim güvenlik kontrolü
- [ ] API anahtarları güvenliği
- [ ] CSRF koruması
- [ ] Giriş güvenlik önlemleri

### 📱 Mobile Experience

- [ ] Touch gesture desteği
- [ ] Mobile kamera optimizasyonu
- [ ] Responsive design iyileştirmeleri
- [ ] PWA desteği

## Metrikler ve KPI'lar

### 📊 Kullanım Metrikleri

- Günlük aktif kullanıcı
- Analiz başarı oranı
- Ortalama analiz süresi
- Kullanıcı memnuniyet puanı

### 🎯 İş Metrikleri

- Ağırlık tahmin doğruluk oranı
- Fiyat tahmin hassasiyeti
- Kullanıcı geri dönüş oranı
- Platform güvenilirlik skoru

## Risk Analizi

### ⚠️ Yüksek Riskler

- AI modeli maliyet artışı
- Piyasa fiyat dalgalanmaları
- Yasal düzenlemeler
- Rekabet artışı

### 💡 Risk Azaltma Stratejileri

- Alternatif AI modeli araştırması
- Dinamik fiyatlama sistemi
- Veteriner partnership
- Özellik diferansiasyonu

## Proje Zaman Çizelgesi

### Q2 2025

- ✅ MVP tamamlanması
- ✅ AI optimizasyonu
- [ ] Kullanıcı test süreçleri
- [ ] Beta versiyon yayını

### Q3 2025

- [ ] Kullanıcı hesap sistemi
- [ ] Analiz geçmişi
- [ ] PDF rapor
- [ ] Performance optimizasyonu

### Q4 2025

- [ ] Mobile uygulama
- [ ] API geliştirme
- [ ] Büyük scale test
- [ ] Üretim yayını

---

**Son Güncelleme:** Mart 2025  
**Güncelleme Sıklığı:** Her major özellik tamamlandığında  
**Sorumlular:** Senior Front-End Developer Team
