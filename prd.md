# Kurban-AI Product Requirements Document (PRD)

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
