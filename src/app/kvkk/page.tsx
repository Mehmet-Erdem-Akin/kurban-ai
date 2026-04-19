import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function KVKKPage() {
  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <h1 className="font-display text-4xl font-semibold text-neutral-900 mb-2">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-neutral-600 mb-8">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
            </p>

            <div className="prose prose-lg max-w-none">
              <div className="bg-primary-50 border border-primary-200 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold text-primary-800 mb-3">
                  🔒 Kişisel Verilerinizin Güvenliği Önceliğimizdir
                </h2>
                <p className="text-primary-700 leading-relaxed">
                  Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
                  Kanunu (KVKK) uyarınca, kişisel verilerinizin nasıl işlendiği
                  hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Veri Sorumlusu Kimliği
              </h2>
              <div className="bg-white border border-neutral-200 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">
                      Proje Bilgileri
                    </h3>
                    <ul className="text-neutral-700 space-y-1">
                      <li>
                        <strong>Proje Sahibi:</strong> Mehmet Erdem Akın
                      </li>
                      <li>
                        <strong>Adres:</strong> Ataşehir, İstanbul
                      </li>
                      <li>
                        <strong>Proje Türü:</strong> Bireysel geliştirilen
                        platform
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">
                      İletişim
                    </h3>
                    <ul className="text-neutral-700 space-y-1">
                      <li>
                        <strong>E-posta:</strong> mehmet.erdem.akin@outlook.com
                      </li>
                      <li>
                        <strong>KVKK:</strong> mehmet.erdem.akin@outlook.com
                      </li>
                      <li>
                        <strong>Web:</strong> kurbanlikanaliz.netlify.app
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Kişisel Verilerin İşlenme Amaçları
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 p-8 rounded-lg mb-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    🎯
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    Kişisel Veri İşleme Amacı Yok
                  </h3>
                  <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-6">
                    Kurban-AI platformu kişisel veri toplamadığı için,
                    <strong>kişisel veri işleme amacı bulunmamaktadır</strong>.
                    Platform yalnızca teknik hizmet sunumu için gerekli
                    işlemleri yapar.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 backdrop-blur-sm border border-green-200 p-6 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">
                      ✅ Platform Amaçları
                    </h3>
                    <ul className="list-disc list-inside text-green-700 space-y-2">
                      <li>Yapay zeka destekli görsel analiz hizmeti sunmak</li>
                      <li>Fotoğraf işleme ve değerlendirme yapmak</li>
                      <li>Analiz sonuçlarını kullanıcıya iletmek</li>
                      <li>Hizmet kalitesini teknik olarak sağlamak</li>
                    </ul>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm border border-blue-200 p-6 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">
                      🚫 Yapılmayan İşlemler
                    </h3>
                    <ul className="list-disc list-inside text-blue-700 space-y-2">
                      <li>Kullanıcı hesabı oluşturma ve yönetme</li>
                      <li>Kişisel bilgi toplama ve saklama</li>
                      <li>Pazarlama ve reklam amaçlı işlemler</li>
                      <li>Profil oluşturma ve takip etme</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-600 text-xl flex-shrink-0 mt-1">
                      💡
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">
                        Hizmet Modeli
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Platform,{" "}
                        <strong>
                          geleneksel hesap tabanlı sistemlerden farklı
                        </strong>
                        olarak çalışır. Her kullanım oturumu bağımsızdır ve
                        kullanıcı kimliği gerektirmez.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Toplanan Kişisel Veri Kategorileri
              </h2>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-8 rounded-lg mb-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-green-600 mb-4">
                    🚫
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    Kişisel Veri Toplanmaz
                  </h3>
                  <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-6">
                    Kurban-AI platformu,{" "}
                    <strong>veri minimizasyonu prensibi</strong> gereğince
                    kişisel verilerinizi kalıcı olarak toplamaz ve saklamaz. Tüm
                    işlemler geçici olarak yapılır ve işlem sonrası veriler
                    silinir.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-3">
                      📸
                    </div>
                    <h4 className="font-bold text-neutral-900 mb-2">
                      Fotoğraf Analizi
                    </h4>
                    <p className="text-neutral-700 text-sm">
                      Yüklenen fotoğraflar yalnızca analiz süresince geçici
                      olarak işlenir, sonrasında otomatik olarak silinir.
                    </p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 mb-3">
                      🔄
                    </div>
                    <h4 className="font-bold text-neutral-900 mb-2">
                      Geçici İşlem
                    </h4>
                    <p className="text-neutral-700 text-sm">
                      Tüm veriler yalnızca hizmet sunumu süresince RAM&apos;de
                      tutulur, kalıcı depolama yapılmaz.
                    </p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-3">
                      🛡️
                    </div>
                    <h4 className="font-bold text-neutral-900 mb-2">
                      Gizlilik Koruması
                    </h4>
                    <p className="text-neutral-700 text-sm">
                      Hiçbir kişisel veri veritabanında saklanmaz, üçüncü
                      taraflarla paylaşılmaz.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-yellow-600 text-xl flex-shrink-0 mt-1">
                      ℹ️
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-2">
                        Teknik Detay
                      </h4>
                      <p className="text-yellow-700 text-sm leading-relaxed">
                        Platform tamamen <strong>stateless</strong> (durumsuz)
                        olarak çalışır. Bu, her analiz işleminin bağımsız olduğu
                        ve önceki işlemlerle herhangi bir bağlantısının olmadığı
                        anlamına gelir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Kişisel Verilerin İşlenme Hukuki Sebepleri
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-accent-50 border border-accent-200 p-6 rounded-lg">
                  <h3 className="font-bold text-accent-800 mb-3">
                    ⚖️ KVKK Madde 5/2
                  </h3>
                  <ul className="list-disc list-inside text-accent-700 space-y-2">
                    <li>
                      <strong>(a) Açık rıza:</strong> Hizmet kullanımı için onay
                    </li>
                    <li>
                      <strong>(c) Hukuki yükümlülük:</strong> Yasal
                      zorunluluklar
                    </li>
                    <li>
                      <strong>(f) Meşru menfaat:</strong> Hizmet güvenliği
                    </li>
                  </ul>
                </div>
                <div className="bg-secondary-50 border border-secondary-200 p-6 rounded-lg">
                  <h3 className="font-bold text-secondary-800 mb-3">
                    📋 KVKK Madde 6/3
                  </h3>
                  <ul className="list-disc list-inside text-secondary-700 space-y-2">
                    <li>
                      <strong>(a) Açık rıza:</strong> Fotoğraf işleme izni
                    </li>
                    <li>
                      <strong>(ç) Kamu sağlığı:</strong> Gıda güvenliği
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. Kişisel Verilerin Aktarılması
              </h2>
              <div className="bg-warning-50 border border-warning-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-warning-800 mb-3">
                  🌍 Yurt İçi ve Yurt Dışı Aktarım
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-warning-800 mb-2">
                      Yurt İçi Aktarım
                    </h4>
                    <ul className="text-warning-700 space-y-1">
                      <li>• Hizmet sağlayıcı şirketler</li>
                      <li>• Yasal zorunluluk halinde kamu kurumları</li>
                      <li>• İş ortakları (anonim veriler)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warning-800 mb-2">
                      Yurt Dışı Aktarım
                    </h4>
                    <ul className="text-warning-700 space-y-1">
                      <li>• Bulut depolama hizmetleri (AB ülkeleri)</li>
                      <li>• Analiz araçları (güvenli ülkeler)</li>
                      <li>• Sadece gerekli durumlarda</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Veri Saklama Süreleri
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-lg mb-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-4">
                    🚫
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    Veri Saklama Yapılmaz
                  </h3>
                  <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
                    Kurban-AI platformu veri minimizasyonu prensibini benimser.
                    Kişisel verileriniz mümkün olan en kısa süre işlenir ve
                    ardından silinir.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      📸
                    </div>
                    <h3 className="font-bold text-neutral-900 mb-2">
                      Fotoğraflar
                    </h3>
                    <p className="text-neutral-700">
                      Analiz sonrası anında silinir
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      📊
                    </div>
                    <h3 className="font-bold text-neutral-900 mb-2">
                      Analiz Sonuçları
                    </h3>
                    <p className="text-neutral-700">
                      Geçici olarak işlenir, saklanmaz
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      🗂️
                    </div>
                    <h3 className="font-bold text-neutral-900 mb-2">
                      Kişisel Veriler
                    </h3>
                    <p className="text-neutral-700">Kalıcı saklama yapılmaz</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. KVKK Kapsamındaki Haklarınız
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                KVKK Kanunu&apos;nun 11. maddesi gereğince sahip olduğunuz
                haklar:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border-l-4 border-primary-500 p-6">
                  <h3 className="font-bold text-neutral-900 mb-3">
                    📋 Bilgi ve Erişim Hakları
                  </h3>
                  <ul className="text-neutral-700 space-y-2">
                    <li>• Kişisel veri işlenip işlenmediğini öğrenme</li>
                    <li>• İşlenmişse buna ilişkin bilgi talep etme</li>
                    <li>
                      • İşlenme amacını ve bunların amacına uygun kullanılıp
                      kullanılmadığını öğrenme
                    </li>
                    <li>
                      • Yurt içinde veya yurt dışında kişisel verilerin
                      aktarıldığı üçüncü kişileri bilme
                    </li>
                  </ul>
                </div>
                <div className="bg-white border-l-4 border-accent-500 p-6">
                  <h3 className="font-bold text-neutral-900 mb-3">
                    🔧 Düzeltme ve Silme Hakları
                  </h3>
                  <ul className="text-neutral-700 space-y-2">
                    <li>
                      • Kişisel verilerin eksik veya yanlış işlenmiş olması
                      halinde bunların düzeltilmesini isteme
                    </li>
                    <li>
                      • Kanunda öngörülen şartlar çerçevesinde kişisel verilerin
                      silinmesini isteme
                    </li>
                    <li>
                      • Düzeltme ve silme taleplerinin kişisel verilerin
                      aktarıldığı üçüncü kişilere bildirilmesini isteme
                    </li>
                    <li>
                      • İşlenen verilerin münhasıran otomatik sistemler
                      vasıtasıyla analiz edilmesi suretiyle kişinin aleyhine bir
                      sonucun ortaya çıkmasına itiraz etme
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                8. Hak Kullanım Prosedürü
              </h2>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-blue-800 mb-3">
                  📝 Başvuru Şekli
                </h3>
                <p className="text-blue-700 mb-4 leading-relaxed">
                  KVKK haklarınızı kullanmak için aşağıdaki yöntemlerle başvuru
                  yapabilirsiniz:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      📧 Elektronik Ortam
                    </h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• E-posta: mehmet.erdem.akin@outlook.com</li>
                      <li>• Online form: kurbanlikanaliz.netlify.app/kvkk</li>
                      <li>• Güvenli iletişim kanalları</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      📮 Fiziksel Ortam
                    </h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Posta: Ataşehir, İstanbul</li>
                      <li>• Elden teslim</li>
                      <li>• Noter kanalıyla</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                9. Başvuru Değerlendirme Süreci
              </h2>
              <div className="bg-success-50 border border-success-200 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      1
                    </div>
                    <h4 className="font-bold text-success-800 mb-1">Başvuru</h4>
                    <p className="text-success-700 text-sm">Talep alınır</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      2
                    </div>
                    <h4 className="font-bold text-success-800 mb-1">
                      İnceleme
                    </h4>
                    <p className="text-success-700 text-sm">30 gün içinde</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      3
                    </div>
                    <h4 className="font-bold text-success-800 mb-1">Cevap</h4>
                    <p className="text-success-700 text-sm">Yazılı bildirim</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      4
                    </div>
                    <h4 className="font-bold text-success-800 mb-1">İcra</h4>
                    <p className="text-success-700 text-sm">Talepte bulgular</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                10. Şikayet Hakkı
              </h2>
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-red-800 mb-3">
                  ⚠️ Veri Koruma Kurulu&apos;na Başvuru
                </h3>
                <p className="text-red-700 mb-4 leading-relaxed">
                  Başvurunuzun reddedilmesi, verilen cevabın yetersiz bulunması
                  veya başvurunuza süresinde cevap verilmemesi halinde Veri
                  Koruma Kurulu&apos;na şikayette bulunabilirsiniz.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">
                      📍 İletişim Bilgileri
                    </h4>
                    <ul className="text-red-700 space-y-1">
                      <li>• Web: www.kvkk.gov.tr</li>
                      <li>• E-posta: kvkk@kvkk.gov.tr</li>
                      <li>• Telefon: 0 (312) 216 50 50</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">
                      📋 Başvuru Şartları
                    </h4>
                    <ul className="text-red-700 space-y-1">
                      <li>• 30 gün bekleme süresi</li>
                      <li>• Yazılı başvuru</li>
                      <li>• Belge eklenmesi</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                11. Çerez Politikası
              </h2>
              <p className="mb-4 text-neutral-700 leading-relaxed">
                Web sitemizde kullanılan çerezler hakkında bilgi:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-neutral-300">
                  <thead>
                    <tr className="bg-neutral-100">
                      <th className="border border-neutral-300 p-3 text-left">
                        Çerez Türü
                      </th>
                      <th className="border border-neutral-300 p-3 text-left">
                        Amacı
                      </th>
                      <th className="border border-neutral-300 p-3 text-left">
                        Hukuki Dayanak
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-300 p-3">
                        Zorunlu Çerezler
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Site işlevselliği
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Meşru menfaat
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 p-3">
                        Analitik Çerezler
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Performans ölçümü
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Açık rıza
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 p-3">
                        Pazarlama Çerezleri
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Kişiselleştirme
                      </td>
                      <td className="border border-neutral-300 p-3">
                        Açık rıza
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                12. Güvenlik Önlemleri
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl">🔐</div>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-center">
                    Teknik Güvenlik
                  </h3>
                  <ul className="text-neutral-700 text-sm space-y-1">
                    <li>• SSL/TLS şifreleme</li>
                    <li>• Güvenli veri merkezi</li>
                    <li>• Düzenli güvenlik testleri</li>
                    <li>• Erişim kontrolü</li>
                  </ul>
                </div>
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl">👥</div>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-center">
                    İdari Güvenlik
                  </h3>
                  <ul className="text-neutral-700 text-sm space-y-1">
                    <li>• Personel eğitimleri</li>
                    <li>• Gizlilik sözleşmeleri</li>
                    <li>• Düzenli denetimler</li>
                    <li>• Prosedür belgeleri</li>
                  </ul>
                </div>
                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl">🏢</div>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-center">
                    Fiziksel Güvenlik
                  </h3>
                  <ul className="text-neutral-700 text-sm space-y-1">
                    <li>• Güvenli ofis ortamı</li>
                    <li>• Kamera sistemleri</li>
                    <li>• Kartlı giriş sistemi</li>
                    <li>• Güvenlik personeli</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">İletişim ve Destek</h3>
                <p className="mb-6 text-primary-100">
                  KVKK haklarınız konusunda sorularınız için bizimle iletişime
                  geçin
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-2xl mb-2">📧</div>
                    <p className="font-semibold">E-posta</p>
                    <p className="text-primary-100">
                      mehmet.erdem.akin@outlook.com
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">📍</div>
                    <p className="font-semibold">Adres</p>
                    <p className="text-primary-100">Ataşehir, İstanbul</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🌐</div>
                    <p className="font-semibold">Online</p>
                    <Link
                      href="/contact"
                      className="text-white hover:text-primary-100 underline"
                    >
                      İletişim Formu
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-100 p-6 rounded-lg mt-8">
                <p className="text-neutral-700 text-center">
                  <strong>Son güncelleme:</strong>{" "}
                  {new Date().toLocaleDateString("tr-TR")}
                  <br />
                  <strong>KVKK Aydınlatma Metni versiyonu:</strong> 1.0
                  <br />
                  <em>Bu metin 6698 sayılı KVKK uyarınca hazırlanmıştır.</em>
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
