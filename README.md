# 🐄 Kurbanlık Analiz - AI Livestock Analysis

**Yapay zeka destekli kurbanlık hayvan analiz platformu**

Kurbanlık hayvan satın alırken daha bilinçli kararlar verin! Fotoğraf çekip anında hayvanın özelliklerini, değerini ve et miktarını öğrenin.

## ✨ Özellikler

- 📸 **AI Fotoğraf Analizi** - Hayvan fotoğraflarını yapay zeka ile analiz edin
- 💰 **Akıllı Değer Hesaplama** - Güncel piyasa fiyatlarına göre değer analizi
- 📊 **Detaylı Raporlama** - Tür, kilo, et miktarı, sağlık durumu
- 👤 **Kullanıcı Hesabı** - Analiz geçmişi ve favoriler
- 📱 **Responsive Tasarım** - Mobil ve masaüstü uyumlu
- 🔒 **Güvenli** - Kullanıcı verilerinin güvenliği

## 🚀 Canlı Demo

[https://kurbanaliz.vercel.app](https://kurbanaliz.vercel.app)

**Demo Giriş:**
- Email: `demo@kurbanaliz.com`
- Şifre: `demo123`

## 🛠 Teknolojiler

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **AI:** Google Gemini API (planlı)
- **Database:** JSON file based (ücretsiz)
- **Deployment:** Vercel (ücretsiz)
- **Styling:** Tailwind CSS + Custom Components

## 📦 Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/username/kurban-ai.git
cd kurban-ai

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışmaya başlayacak.

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Yeni kullanıcı kaydı

### Analysis
- `POST /api/analyze` - Hayvan fotoğrafı analizi
- `GET /api/market/prices` - Güncel piyasa fiyatları

### User
- `GET /api/user/history` - Kullanıcı analiz geçmişi
- `POST /api/user/history` - Analiz kaydetme

## 🎯 Kullanım

1. **Kayıt Olun** - Ücretsiz hesap oluşturun
2. **Fotoğraf Çekin** - Kurbanlık hayvanın fotoğrafını çekin
3. **Analiz Edin** - AI analizi sonuçlarını bekleyin
4. **Karar Verin** - Detaylı raporu inceleyin

## 🌟 Özellik Roadmap

- [ ] **Gerçek AI Entegrasyonu** - Google Gemini API
- [ ] **Veritabanı Geçişi** - Supabase entegrasyonu
- [ ] **Push Bildirimleri** - Piyasa güncellemeleri
- [ ] **Sosyal Özellikler** - Analiz paylaşımı
- [ ] **Mobil Uygulama** - React Native
- [ ] **Çoklu Dil** - İngilizce, Arapça

## 📊 Proje Yapısı

```
kurban-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── analyze/           # Analiz sayfası
│   │   ├── login/             # Giriş sayfası
│   │   ├── register/          # Kayıt sayfası
│   │   └── globals.css        # Global stiller
│   ├── components/            # React bileşenleri
│   ├── types/                 # TypeScript tipler
│   └── lib/                   # Utility fonksiyonlar
├── data/                      # JSON database
├── public/                    # Statik dosyalar
└── docs/                      # Dökümentasyon
```

## 💡 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 İletişim

- **Geliştirici:** [Your Name]
- **Email:** contact@kurbanaliz.com
- **LinkedIn:** [Your LinkedIn]
- **Twitter:** [@kurbanaliz](https://twitter.com/kurbanaliz)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Hosting
- [Lucide Icons](https://lucide.dev/) - İkonlar

---

**🌟 Beğendiyseniz star vermeyi unutmayın!**
