import type { Metadata } from "next";
import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik Politikası",
  description:
    "Kurbanlık Analiz gizlilik politikası: kişisel verilerin işlenmesi, saklanması ve KVKK kapsamındaki haklar.",
  path: "/privacy",
  keywords: ["gizlilik politikası", "kvkk", "kişisel veri koruma"],
});

export default function PrivacyPage() {
  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <h1 className="font-display text-4xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Gizlilik Politikası
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                1. Giriş
              </h2>
              <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Kurbanlık Analiz olarak, kişisel verilerinizin güvenliği ve
                gizliliği bizim için son derece önemlidir. Bu Gizlilik
                Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu
                (KVKK) ve ilgili mevzuat kapsamında, kişisel verilerinizin nasıl
                toplandığı, işlendiği, korunduğu ve paylaşıldığı hakkında sizi
                bilgilendirmek amacıyla hazırlanmıştır.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                2. Veri Sorumlusu
              </h2>
              <div className="bg-primary-50 dark:bg-primary-950/40 p-6 rounded-lg mb-6 ring-1 ring-primary-200/60 dark:ring-primary-800/50">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <strong>Proje Sahibi:</strong> Mehmet Erdem Akın
                  <br />
                  <strong>Adres:</strong> Ataşehir, İstanbul
                  <br />
                  <strong>E-posta:</strong> mehmet.erdem.akin@outlook.com
                  <br />
                  <strong>Web:</strong> kurbanlikkilohesaplama.com
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                3. Toplanan Kişisel Veriler
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Hizmetlerimizi kullanırken aşağıdaki kişisel verilerinizi
                toplayabiliriz:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Kimlik Verileri
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>Ad ve soyad</li>
                    <li>E-posta adresi</li>
                    <li>Telefon numarası (isteğe bağlı)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Teknik Veriler
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>IP adresi</li>
                    <li>Tarayıcı bilgileri</li>
                    <li>Cihaz bilgileri</li>
                    <li>Konum bilgisi (izin verildiğinde)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Uygulama Verileri
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>Yüklenen hayvan fotoğrafları</li>
                    <li>Analiz sonuçları</li>
                    <li>Kullanım geçmişi</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    İletişim Verileri
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>Destek talepleri</li>
                    <li>Geri bildirimler</li>
                    <li>Şikayetler</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                4. Kişisel Verilerin İşlenme Amaçları
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Kişisel verilerinizi aşağıdaki amaçlarla işlemekteyiz:
              </p>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
                <li>Yapay zeka destekli hayvan analiz hizmeti sağlamak</li>
                <li>Kullanıcı hesabı oluşturmak ve yönetmek</li>
                <li>Analiz sonuçlarını göstermek</li>
                <li>Hizmet kalitesini artırmak ve geliştirmek</li>
                <li>Teknik destek sağlamak</li>
                <li>Yasal yükümlülükleri yerine getirmek</li>
                <li>Güvenlik önlemleri almak</li>
                <li>İstatistiksel analizler yapmak</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                5. Kişisel Verilerin İşlenme Hukuki Sebepleri
              </h2>
              <div className="bg-accent-50 dark:bg-accent-950/40 p-6 rounded-lg mb-6 ring-1 ring-accent-200/60 dark:ring-accent-800/50">
                <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2">
                  <li>
                    <strong>Açık rıza:</strong> Hizmetlerimizi kullanmak için
                    verdiğiniz onay
                  </li>
                  <li>
                    <strong>Sözleşmenin ifası:</strong> Hizmet sözleşmesinin
                    gereği
                  </li>
                  <li>
                    <strong>Yasal yükümlülük:</strong> Kanuni zorunluluklar
                  </li>
                  <li>
                    <strong>Meşru menfaat:</strong> Hizmet güvenliği ve
                    geliştirilmesi
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                6. Kişisel Verilerin Paylaşılması
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Kişisel verilerinizi aşağıdaki durumlarda üçüncü taraflarla
                paylaşabiliriz:
              </p>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
                <li>
                  Yasal zorunluluklar gereği (mahkeme kararı, kolluk kuvvetleri
                  talebi)
                </li>
                <li>
                  Hizmet sağlayıcılarımızla (bulut depolama, analitik hizmetler)
                </li>
                <li>İş ortaklarımızla (anonim istatistiksel veriler)</li>
                <li>Acil durumlarda (güvenlik tehdidi, dolandırıcılık)</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                7. Kişisel Verilerin Saklanma Süresi
              </h2>
              <div className="bg-green-50 dark:bg-emerald-950/35 dark:border-emerald-800/50 border border-green-200 p-6 rounded-lg mb-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">
                    Saklama: Minimizasyon ve süreler
                  </h3>
                  <p className="text-green-700 dark:text-green-300/95 leading-relaxed max-w-2xl mx-auto">
                    Veri minimizasyonu ilkesiyle kişisel veriler yalnızca hizmetin
                    sunulması için gerekli süre boyunca işlenir ve saklanır.
                    Ham fotoğraf dosyaları kalıcı arşiv olarak tutulmaz; hesap
                    veya geçmiş özellikleri kullanıldığında analiz özetleri ve
                    hesap bilgileri sunucu tarafında sınırlı şekilde kaydedilebilir.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-neutral-900/90 dark:ring-1 dark:ring-neutral-700/70 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">📸</div>
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Fotoğraflar
                    </h4>
                    <p className="text-green-700 dark:text-green-300/95 text-sm">
                      Analiz için işlenir; sunucuda kalıcı fotoğraf arşivi tutulmaz
                    </p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900/90 dark:ring-1 dark:ring-neutral-700/70 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Analiz Sonuçları
                    </h4>
                    <p className="text-green-700 dark:text-green-300/95 text-sm">
                      İsteğe bağlı geçmişte özet olarak saklanabilir; amaç dışı kullanılmaz
                    </p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900/90 dark:ring-1 dark:ring-neutral-700/70 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">💾</div>
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Log Kayıtları
                    </h4>
                    <p className="text-green-700 dark:text-green-300/95 text-sm">
                      Güvenlik amaçlı minimum süre
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                8. Kişisel Veri Güvenliği
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Verilerinizin güvenliği için aldığımız teknik ve idari önlemler:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-success-50 dark:bg-emerald-950/35 dark:ring-1 dark:ring-emerald-800/40 p-4 rounded-lg">
                  <h3 className="font-bold text-success-800 dark:text-emerald-200 mb-2">
                    🔒 Teknik Önlemler
                  </h3>
                  <ul className="text-success-700 dark:text-emerald-300/95 space-y-1">
                    <li>SSL/TLS şifreleme</li>
                    <li>Güvenli veri merkezi</li>
                    <li>Düzenli güvenlik testleri</li>
                    <li>Erişim kontrolü</li>
                  </ul>
                </div>
                <div className="bg-primary-50 dark:bg-primary-950/40 dark:ring-1 dark:ring-primary-800/45 p-4 rounded-lg">
                  <h3 className="font-bold text-primary-800 dark:text-primary-200 mb-2">
                    👥 İdari Önlemler
                  </h3>
                  <ul className="text-primary-700 dark:text-primary-300/95 space-y-1">
                    <li>Personel eğitimleri</li>
                    <li>Gizlilik sözleşmeleri</li>
                    <li>Düzenli denetimler</li>
                    <li>Olay müdahale planı</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                9. KVKK Hakları
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                KVKK Kanunu kapsamındaki haklarınız:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-neutral-900/95 dark:ring-1 dark:ring-neutral-700/70 border-l-4 border-primary-500 dark:border-l-primary-400 p-4">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    ✅ Temel Haklar
                  </h3>
                  <ul className="text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>• Bilgi talep etme</li>
                    <li>• Verilere erişim</li>
                    <li>• Düzeltme talep etme</li>
                    <li>• Silme talep etme</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:ring-1 dark:ring-neutral-700/70 border-l-4 border-accent-500 dark:border-l-accent-400 p-4">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    🔄 İleri Haklar
                  </h3>
                  <ul className="text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>• Aktarma talep etme</li>
                    <li>• İtiraz etme</li>
                    <li>• Zararın giderilmesi</li>
                    <li>• Şikayet etme</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                10. Çerezler (Cookies)
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Web sitemizde kullanılan çerez türleri:
              </p>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
                <li>
                  <strong>Zorunlu Çerezler:</strong> Site işlevselliği için
                  gerekli
                </li>
                <li>
                  <strong>Performans Çerezleri:</strong> Site performansını
                  ölçmek için
                </li>
                <li>
                  <strong>Fonksiyonel Çerezler:</strong> Kullanıcı deneyimini
                  iyileştirmek için
                </li>
                <li>
                  <strong>Pazarlama Çerezleri:</strong> İçerik kişiselleştirme
                  için (izin ile)
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                11. Yapay Zeka ve Fotoğraf İşleme
              </h2>
              <div className="bg-warning-50 dark:bg-amber-950/35 dark:border-amber-800/55 border border-warning-200 p-6 rounded-lg mb-6">
                <p className="text-warning-800 dark:text-amber-200 leading-relaxed">
                  <strong>Önemli Bilgi:</strong> Yüklediğiniz hayvan
                  fotoğrafları, yapay zeka modelimiz tarafından analiz edilir.
                  Bu fotoğraflar sadece analiz amacıyla kullanılır ve hiçbir
                  üçüncü tarafla paylaşılmaz. İsterseniz analiz sonrası
                  fotoğraflarınızın silinmesini talep edebilirsiniz.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                12. İletişim ve Başvuru
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/40 dark:to-accent-950/40 p-6 rounded-lg mb-6 ring-1 ring-primary-200/50 dark:ring-neutral-700/50">
                <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                  KVKK haklarınızı kullanmak için aşağıdaki yollarla bize
                  ulaşabilirsiniz:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      📧 E-posta
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      mehmet.erdem.akin@outlook.com
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">📮 Adres</p>
                    <p className="text-neutral-700 dark:text-neutral-300">Ataşehir, İstanbul</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      🌐 Online Form
                    </p>
                    <Link
                      href="/contact"
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      İletişim formu
                    </Link>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      ℹ️ Proje Bilgisi
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Bireysel geliştirilen proje
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                13. Politika Değişiklikleri
              </h2>
              <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Bu Gizlilik Politikası, yasal düzenlemeler ve hizmet
                değişiklikleri doğrultusunda güncellenebilir. Önemli
                değişiklikler hakkında e-posta yoluyla bilgilendirileceksiniz.
                Güncel versiyonu her zaman web sitemizde bulabilirsiniz.
              </p>

              <div className="bg-neutral-100 dark:bg-neutral-800/90 dark:border-neutral-600 border border-transparent p-6 rounded-lg">
                <p className="text-neutral-700 dark:text-neutral-300 text-center">
                  <strong>Son güncelleme:</strong>{" "}
                  {new Date().toLocaleDateString("tr-TR")}
                  <br />
                  <strong>Politika versiyonu:</strong> 1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </AppPageShell>
  );
}
