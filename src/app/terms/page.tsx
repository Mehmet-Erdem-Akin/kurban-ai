import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white text-lg font-bold">KA</span>
              </div>
              <span className="text-2xl font-bold text-neutral-800">
                Kurbanlık Analiz
              </span>
            </Link>
            <Link href="/" className="btn btn-secondary btn-md">
              Ana Sayfa
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">
              Kullanım Şartları
            </h1>
            <p className="text-neutral-600 mb-8">
              Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Genel Hükümler
              </h2>
              <p className="mb-6 text-neutral-700 leading-relaxed">
                Bu Kullanım Şartları (&quot;Şartlar&quot;), Mehmet Erdem Akın
                tarafından geliştirilen kurbanlık hayvan analiz platformu
                (&quot;Hizmet&quot;) kullanımını düzenler. Hizmetimizi
                kullanarak bu şartları kabul etmiş sayılırsınız.
              </p>

              <div className="bg-warning-50 border border-warning-200 p-6 rounded-lg mb-6">
                <p className="text-warning-800 leading-relaxed">
                  <strong>⚠️ Önemli:</strong> Bu şartları dikkatlice okuyunuz.
                  Hizmetimizi kullanmaya devam ederek bu şartları kabul
                  ettiğinizi beyan edersiniz.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Hizmet Tanımı
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                Kurbanlık Analiz, yapay zeka teknolojisi kullanarak aşağıdaki
                hizmetleri sunar:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-2">
                    🤖 AI Analiz Hizmetleri
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    <li>Hayvan türü ve cins belirleme</li>
                    <li>Ağırlık tahmini</li>
                    <li>Sağlık durumu değerlendirmesi</li>
                    <li>Değer hesaplama</li>
                  </ul>
                </div>
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-2">
                    📊 Ek Özellikler
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    <li>Analiz geçmişi</li>
                    <li>Piyasa fiyat bilgileri</li>
                    <li>Raporlama</li>
                    <li>Uzman tavsiyeleri</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Kullanıcı Yükümlülükleri
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                Hizmetimizi kullanırken aşağıdaki kurallara uymanız
                gerekmektedir:
              </p>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-red-800 mb-3">
                  🚫 Yasak Davranışlar
                </h3>
                <ul className="list-disc list-inside text-red-700 space-y-2">
                  <li>Sahte, yanıltıcı veya yasadışı bilgi paylaşmak</li>
                  <li>Sistem güvenliğini tehlikeye atmak</li>
                  <li>Diğer kullanıcıları rahatsız etmek</li>
                  <li>Telif hakkı ihlali yapmak</li>
                  <li>Hizmetimizi ticari amaçla kötüye kullanmak</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-green-800 mb-3">
                  ✅ Doğru Kullanım
                </h3>
                <ul className="list-disc list-inside text-green-700 space-y-2">
                  <li>Net ve gerçek hayvan fotoğrafları yüklemek</li>
                  <li>Doğru kişisel bilgiler vermek</li>
                  <li>Sistem kurallarına uymak</li>
                  <li>Diğer kullanıcılara saygılı davranmak</li>
                  <li>Gizlilik politikasına uymak</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Fotoğraf Yükleme ve İçerik Politikası
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                Platformumuza yüklediğiniz fotoğraflar için aşağıdaki kurallar
                geçerlidir:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-neutral-300">
                  <thead>
                    <tr className="bg-neutral-100">
                      <th className="border border-neutral-300 p-3 text-left">
                        İzin Verilen
                      </th>
                      <th className="border border-neutral-300 p-3 text-left">
                        Yasak
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-300 p-3">
                        Gerçek hayvan fotoğrafları
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Sahte/manipüle edilmiş görüntüler
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 p-3">
                        Net ve kaliteli görüntüler
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Müstehcen içerik
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 p-3">
                        Tek hayvan odaklı
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Şiddet içeren görüntüler
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 p-3">
                        Güncel çekimler
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Telif hakkı ihlali
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. AI Analiz Sonuçları ve Sorumluluk
              </h2>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-blue-800 mb-3">
                  📋 Analiz Sonuçları Hakkında
                </h3>
                <ul className="list-disc list-inside text-blue-700 space-y-2">
                  <li>
                    Sonuçlar <strong>tahmini</strong> niteliktedir
                  </li>
                  <li>%100 doğruluk garantisi verilmez</li>
                  <li>Veteriner muayenesi yerini tutmaz</li>
                  <li>Yatırım tavsiyesi değildir</li>
                  <li>Nihai karar kullanıcıya aittir</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Hesap Oluşturma ve Güvenlik
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                Hesap oluştururken ve kullanırken dikkat edilmesi gerekenler:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-2">
                    🔐 Hesap Güvenliği
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    <li>Güçlü şifre kullanın</li>
                    <li>Şifrenizi kimseyle paylaşmayın</li>
                    <li>Düzenli şifre güncelleyin</li>
                    <li>Şüpheli aktiviteyi bildirin</li>
                  </ul>
                </div>
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-2">
                    📝 Hesap Bilgileri
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    <li>Doğru bilgiler verin</li>
                    <li>Güncel tutun</li>
                    <li>Tek hesap kullanın</li>
                    <li>18 yaşından büyük olun</li>
                  </ul>
                </div>
              </div>

              <div className="bg-success-50 border border-success-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-success-800 mb-3">
                  🆓 Ücretsiz Hizmet
                </h3>
                <p className="text-success-700">
                  Kurbanlık Analiz platformu tamamen ücretsizdir. Tüm analiz
                  özellikleri ve hizmetler hiçbir ücret talep edilmeden
                  sunulmaktadır.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. Fikri Mülkiyet Hakları
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                Platform ve içeriklerle ilgili fikri mülkiyet hakları:
              </p>
              <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                <li>
                  Platform tasarımı ve kodları Mehmet Erdem Akın&apos;a aittir
                </li>
                <li>AI modeli ve algoritmaları korunmaktadır</li>
                <li>Logo ve marka kullanımı izne tabidir</li>
                <li>Kullanıcı fotoğrafları kullanıcıya aittir</li>
                <li>Analiz sonuçları paylaşıma açıktır</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                8. Hizmet Kesintileri ve Güncellemeler
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
                <p className="text-yellow-800 leading-relaxed">
                  <strong>🔧 Bakım ve Güncellemeler:</strong> Hizmet kalitesini
                  artırmak için periyodik bakım ve güncellemeler yapabiliriz. Bu
                  durumda kullanıcılar önceden bilgilendirilir. Plansız
                  kesintiler için sorumluluk kabul etmeyiz.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                9. Sorumluluk Sınırlamaları
              </h2>
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-red-800 mb-3">
                  ⚠️ Sorumluluk Reddi
                </h3>
                <ul className="list-disc list-inside text-red-700 space-y-2">
                  <li>AI analiz sonuçlarının doğruluğu garanti edilmez</li>
                  <li>Ekonomik kayıplardan sorumlu değiliz</li>
                  <li>Üçüncü taraf hizmetler için sorumluluk kabul etmeyiz</li>
                  <li>Hizmet kesintilerinden kaynaklanan zararlar</li>
                  <li>Veri kaybı veya güvenlik ihlalleri</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                10. Hesap İptal ve Fesih
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                Hesap iptali ve fesih koşulları:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-2">
                    Kullanıcı Tarafından
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    <li>İstediğiniz zaman iptal edebilirsiniz</li>
                    <li>Verileriniz silinir</li>
                    <li>İade politikası uygulanır</li>
                    <li>30 gün süre tanınır</li>
                  </ul>
                </div>
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-2">
                    Şirket Tarafından
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    <li>Kural ihlali durumunda</li>
                    <li>Kötüye kullanım tespit edilirse</li>
                    <li>Yasal zorunluluk varsa</li>
                    <li>Bildirim yapılır</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                11. Uygulanacak Hukuk ve Uyuşmazlıklar
              </h2>
              <div className="bg-neutral-100 p-6 rounded-lg mb-6">
                <p className="text-neutral-700 leading-relaxed">
                  <strong>📍 Yetki ve Hukuk:</strong> Bu sözleşmeden doğacak
                  uyuşmazlıklarda Türkiye Cumhuriyeti yasaları uygulanır.
                  İstanbul Mahkemeleri ve İcra Müdürlükleri yetkilidir.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                12. İletişim Bilgileri
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-lg mb-6">
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  Bu şartlarla ilgili sorularınız için:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">
                      📧 E-posta
                    </p>
                    <p className="text-neutral-700">
                      mehmet.erdem.akin@outlook.com
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">📮 Adres</p>
                    <p className="text-neutral-700">Ataşehir, İstanbul</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">
                      🌐 İletişim
                    </p>
                    <Link
                      href="/contact"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      İletişim formu
                    </Link>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">
                      ℹ️ Proje Bilgisi
                    </p>
                    <p className="text-neutral-700">
                      Bireysel geliştirilen proje
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                13. Şartların Değiştirilmesi
              </h2>
              <p className="mb-6 text-neutral-700 leading-relaxed">
                Bu kullanım şartları, yasal düzenlemeler ve hizmet
                değişiklikleri doğrultusunda güncellenebilir. Önemli
                değişiklikler hakkında 30 gün öncesinden bilgilendirileceksiniz.
                Değişikliklere itiraz etme hakkınız vardır.
              </p>

              <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 rounded-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Kabul Etme</h3>
                  <p className="mb-4">
                    Bu şartları okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link href="/privacy" className="btn btn-white btn-sm">
                      Gizlilik Politikası
                    </Link>
                    <Link href="/contact" className="btn btn-secondary btn-sm">
                      İletişim
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-100 p-6 rounded-lg mt-6">
                <p className="text-neutral-700 text-center">
                  <strong>Son güncelleme:</strong>{" "}
                  {new Date().toLocaleDateString("tr-TR")}
                  <br />
                  <strong>Şartlar versiyonu:</strong> 1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-400">
            &copy; 2025 Kurbanlık Analiz. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
