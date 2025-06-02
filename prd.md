# Kurbanlık Analiz Mobil Uygulaması - Ürün Gereksinimleri

## Proje Özeti
Kurbanlık Analiz, kullanıcıların kurbanlık hayvan seçimlerinde daha bilinçli kararlar vermelerine yardımcı olan bir mobil uygulamadır. Uygulama, yapay zeka teknolojisi kullanarak hayvan fotoğraflarını analiz eder ve kullanıcılara kapsamlı bilgiler sunar.

## Hedef Kitle
- Kurban bayramında hayvan satın almayı planlayan bireysel kullanıcılar
- Kurbanlık hayvan satışı yapan satıcılar
- Toplu kurban organizasyonu düzenleyen gruplar/kurumlar

## Sorun Tanımı
1. Kurbanlık hayvan alırken hayvanın değerini doğru tespit etmek zordur
2. Birçok alıcı hayvan özellikleri hakkında yeterli bilgiye sahip değildir
3. Piyasa fiyatlarına göre uygun fiyat değerlendirmesi yapmak zordur
4. Hisse sahiplerine düşecek et miktarını önceden tahmin etmek güçtür

## Çözüm Önerisi
Yapay zeka destekli bir uygulama ile:
- Hayvanın fotoğrafını çekip veya galeriden seçip analiz yapabilme
- Hayvanın türü, cinsi, tahmini kilosu gibi bilgilere erişim
- Güncel et fiyatlarına göre hayvanın değerini tahmin etme
- Hissedarlar için et miktarı ve maliyet hesaplama
- Farklı hayvanları karşılaştırma imkanı

## Temel Özellikler

### 1. Fotoğraf Yakalama ve Analiz
- Kamera ile fotoğraf çekebilme
- Galeriden görsel seçebilme
- Yapay zeka modeliyle görüntü analizi
- Sonuçları anlaşılır şekilde gösterme

### 2. Hayvan Bilgileri
- Tür ve cins tespiti (Dana, Koç, Kuzu, vb.)
- Tahmini kilo hesaplama
- Fiziksel özelliklerin değerlendirilmesi
- Sağlık durumu tahmini

### 3. Ekonomik Analiz
- Güncel et fiyatlarına göre değer hesaplama
- Piyasa ortalamasına göre fiyat karşılaştırması (ortalamanın altı/üstü)
- Hisse başına maliyet hesaplama
- Kemikli/kemiksiz et miktarı tahmini

### 4. Karşılaştırma ve Favorileme
- İncelenen hayvanları favorilere ekleme
- Favoriler listesi oluşturma
- Birden fazla hayvanı yan yana karşılaştırabilme
- Karşılaştırma sonuçlarını paylaşabilme

### 5. Kullanıcı Profili
- Geçmiş analizleri görüntüleme
- Fiyat alarmları oluşturma
- Tercihleri kaydetme

## Kullanıcı Akışı
1. Uygulama açılır ve kullanıcı giriş yapar/kayıt olur
2. Ana ekranda fotoğraf çekme veya galeriden seçme seçenekleri sunulur
3. Kullanıcı bir hayvan fotoğrafı seçer
4. Yapay zeka modeli görüntüyü analiz eder
5. Sonuçlar kapsamlı bir rapor halinde sunulur
6. Kullanıcı sonuçları kaydedebilir, paylaşabilir veya favorilerine ekleyebilir
7. Farklı hayvanları karşılaştırmak isterse karşılaştırma ekranına geçiş yapabilir

## Başarı Metrikleri
- Aktif kullanıcı sayısı
- Günlük/aylık yapılan analiz sayısı
- Kullanıcı memnuniyet oranı
- Analiz doğruluk oranı
- Uygulamada geçirilen ortalama süre

## Gelir Modeli
- Freemium model: Temel analizler ücretsiz, detaylı raporlar ücretli
- Premium üyelik: Sınırsız analiz, karşılaştırma ve özel bildirimler
- Reklam gelirleri: Hedefli reklamcılık
- İş ortaklıkları: Kasaplar, çiftlikler ve kurban organizasyonu yapan kurumlarla ortaklıklar

## Geliştirme Öncelikleri
1. MVP (Minimum Viable Product) olarak temel analiz fonksiyonlarını geliştirmek
2. Kullanıcı geri bildirimlerine göre algoritmaları iyileştirmek
3. Karşılaştırma ve favorileme özelliklerini eklemek
4. Sosyal paylaşım ve topluluk özellikleri geliştirmek

## Gelecek Özellikler
- Canlı pazarlık asistanı
- AR (Artırılmış Gerçeklik) ile hayvan boyutu gösterimi
- Satıcılar için özel panel
- Toplu kurban organizasyonları için grup yönetimi
- Lokasyon bazlı kurbanlık hayvan satış noktaları

## Yapıldı
- Next.js ve Tailwind CSS projesi kurulumu tamamlandı
- Kapsamlı renk paleti ve tema sistemi oluşturuldu
- Modern ana sayfa tasarımı ve UI/UX implementasyonu
- Fotoğraf yükleme ve analiz sayfası (/analyze) eklendi
- Demo sayfası (/demo) ile özellik tanıtımı oluşturuldu
- Kullanıcı giriş sayfası (/login) form validasyonu ile eklendi
- TypeScript tip tanımlamaları ve proje yapısı tamamlandı
- Responsive tasarım ve animasyonlar eklendi
- Temel komponent sistemi ve CSS framework oluşturuldu 