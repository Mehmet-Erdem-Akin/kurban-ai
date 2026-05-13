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
            <h1 className="font-display text-4xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
            </p>

            <div className="prose prose-lg max-w-none">
              <div className="bg-primary-50 dark:bg-primary-950/40 dark:border-primary-800 border border-primary-200 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold text-primary-800 dark:text-primary-200 mb-3">
                  🔒 Kişisel Verilerinizin Güvenliği Önceliğimizdir
                </h2>
                <p className="text-primary-700 dark:text-primary-300 leading-relaxed">
                  Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
                  Kanunu (KVKK) uyarınca, kişisel verilerinizin nasıl işlendiği
                  hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                1. Veri Sorumlusu Kimliği
              </h2>
              <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Proje Bilgileri
                    </h3>
                    <ul className="text-neutral-700 dark:text-neutral-300 space-y-1">
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
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      İletişim
                    </h3>
                    <ul className="text-neutral-700 dark:text-neutral-300 space-y-1">
                      <li>
                        <strong>E-posta:</strong> mehmet.erdem.akin@outlook.com
                      </li>
                      <li>
                        <strong>KVKK:</strong> mehmet.erdem.akin@outlook.com
                      </li>
                      <li>
                        <strong>Web:</strong> kurbanlikkilohesaplama.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                2. Kişisel Verilerin İşlenme Amaçları
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/40 dark:to-emerald-950/35 border border-blue-200 dark:border-blue-800/50 p-8 rounded-lg mb-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    🎯
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Kişisel Verilerin İşlenme Amaçları
                  </h3>
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-6">
                    Verileriniz,{" "}
                    <strong>yalnızca hizmetin sunulması ve yasal yükümlülükler</strong>{" "}
                    kapsamında ve veri minimizasyonu ilkesiyle işlenir.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 dark:bg-neutral-900/80 backdrop-blur-sm border border-green-200 dark:border-emerald-800/45 p-6 rounded-lg">
                    <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
                      ✅ Platform Amaçları
                    </h3>
                    <ul className="list-disc list-inside text-green-700 dark:text-green-300/95 space-y-2">
                      <li>Yapay zeka destekli görsel analiz hizmeti sunmak</li>
                      <li>Fotoğraf işleme ve değerlendirme yapmak</li>
                      <li>Analiz sonuçlarını kullanıcıya iletmek</li>
                      <li>Hesap oluşturma ve oturum yönetimi (tercih ettiğinizde)</li>
                      <li>Analiz geçmişi ve hizmet sürekliliği (özellik açıksa)</li>
                      <li>Hizmet güvenliği ve kalitesinin sağlanması</li>
                    </ul>
                  </div>

                  <div className="bg-white/70 dark:bg-neutral-900/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800/45 p-6 rounded-lg">
                    <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
                      📌 İşleme İlkeleri
                    </h3>
                    <ul className="list-disc list-inside text-blue-700 dark:text-blue-300/95 space-y-2">
                      <li>Amaçla sınırlı ve orantılı saklama</li>
                      <li>İzinsiz ticari profilleme ve hedefli reklam yapmama</li>
                      <li>Üçüncü taraflarla yalnızca gerekli ve hukuka uygun paylaşım</li>
                      <li>KVKK kapsamındaki haklarınıza saygı</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-600 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-gray-600 dark:text-neutral-400 text-xl flex-shrink-0 mt-1">
                      💡
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-neutral-100 mb-2">
                        Hizmet Modeli
                      </h4>
                      <p className="text-gray-700 dark:text-neutral-300 text-sm leading-relaxed">
                        Analiz istekleri teknik olarak birbirinden bağımsız
                        işlenebilir; hesap veya geçmiş özelliklerini
                        kullandığınızda ise kimliğinizle ilişkili sınırlı veri
                        saklaması yapılabilir. Ayrıntılar bu metinde ve
                        Gizlilik Politikası&apos;nda açıklanmıştır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                3. Toplanan Kişisel Veri Kategorileri
              </h2>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-emerald-950/35 dark:to-blue-950/40 border border-green-200 dark:border-emerald-800/50 p-8 rounded-lg mb-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-green-600 mb-4">
                    📋
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    İşlenen Veri ve Minimizasyon
                  </h3>
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-6">
                    Kurban-AI,{" "}
                    <strong>veri minimizasyonu</strong> ilkesiyle yalnızca hizmet
                    için gerekli verileri işler. Görüntüler analiz ve yapay
                    zeka işlemi süresince kullanılır; ham fotoğraf dosyası
                    sunucuda kalıcı arşiv olarak tutulmaz. Hesap veya analiz
                    geçmişi kullanıldığında kimlik ve özet sonuç verileri
                    sınırlı süre ve kapsamda saklanabilir.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/70 dark:bg-neutral-900/75 backdrop-blur-sm dark:ring-1 dark:ring-neutral-700/60 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-3">
                      📸
                    </div>
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Fotoğraf Analizi
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Yüklenen görüntüler analiz süresince işlenir; işlem
                      tamamlandıktan sonra sunucuda kalıcı fotoğraf arşivi
                      oluşturulmaz.
                    </p>
                  </div>

                  <div className="bg-white/70 dark:bg-neutral-900/75 backdrop-blur-sm dark:ring-1 dark:ring-neutral-700/60 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 mb-3">
                      🔄
                    </div>
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      İşlem ve Saklama
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Analiz çoğunlukla oturum süresince bellek üzerinden
                      tamamlanır; hesap ve geçmiş özellikleri için sunucu
                      tarafında dosya tabanlı sınırlı saklama yapılabilir.
                    </p>
                  </div>

                  <div className="bg-white/70 dark:bg-neutral-900/75 backdrop-blur-sm dark:ring-1 dark:ring-neutral-700/60 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-3">
                      🛡️
                    </div>
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Gizlilik Koruması
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Kişisel veriler yalnızca hizmet ve yükümlülükler için
                      gerekli ölçüde saklanır; izinsiz üçüncü taraflarla
                      paylaşılmaz.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-yellow-600 dark:text-yellow-400 text-xl flex-shrink-0 mt-1">
                      ℹ️
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                        Teknik Detay
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-300/95 text-sm leading-relaxed">
                        Analiz istekleri teknik olarak birbirinden bağımsız
                        işlenebilir. Hesap veya geçmiş kullanımında ise
                        kimliğinizle ilişkili kayıtlar oluşturulabilir; bu
                        kayıtlar amaçla sınırlı tutulur ve Gizlilik
                        Politikası&apos;nda özetlenir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                4. Kişisel Verilerin İşlenme Hukuki Sebepleri
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-accent-50 dark:bg-accent-950/35 dark:border-accent-800 border border-accent-200 p-6 rounded-lg">
                  <h3 className="font-bold text-accent-800 dark:text-accent-200 mb-3">
                    ⚖️ KVKK Madde 5/2
                  </h3>
                  <ul className="list-disc list-inside text-accent-700 dark:text-accent-300/95 space-y-2">
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
                <div className="bg-secondary-50 dark:bg-secondary-950/35 dark:border-secondary-800 border border-secondary-200 p-6 rounded-lg">
                  <h3 className="font-bold text-secondary-800 dark:text-secondary-200 mb-3">
                    📋 KVKK Madde 6/3
                  </h3>
                  <ul className="list-disc list-inside text-secondary-700 dark:text-secondary-300/95 space-y-2">
                    <li>
                      <strong>(a) Açık rıza:</strong> Fotoğraf işleme izni
                    </li>
                    <li>
                      <strong>(ç) Kamu sağlığı:</strong> Gıda güvenliği
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                5. Kişisel Verilerin Aktarılması
              </h2>
              <div className="bg-warning-50 dark:bg-amber-950/35 dark:border-amber-800/55 border border-warning-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-warning-800 dark:text-amber-200 mb-3">
                  🌍 Yurt İçi ve Yurt Dışı Aktarım
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-warning-800 dark:text-amber-200 mb-2">
                      Yurt İçi Aktarım
                    </h4>
                    <ul className="text-warning-700 dark:text-amber-300/95 space-y-1">
                      <li>• Hizmet sağlayıcı şirketler</li>
                      <li>• Yasal zorunluluk halinde kamu kurumları</li>
                      <li>• İş ortakları (anonim veriler)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warning-800 dark:text-amber-200 mb-2">
                      Yurt Dışı Aktarım
                    </h4>
                    <ul className="text-warning-700 dark:text-amber-300/95 space-y-1">
                      <li>• Bulut depolama hizmetleri (AB ülkeleri)</li>
                      <li>• Analiz araçları (güvenli ülkeler)</li>
                      <li>• Sadece gerekli durumlarda</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                6. Saklama süreleri
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/40 dark:to-accent-950/40 p-6 rounded-lg mb-6 ring-1 ring-transparent dark:ring-neutral-700/50">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-4">
                    📅
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Saklama süreleri ve minimizasyon
                  </h3>
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                    Veri minimizasyonu ilkesi uygulanır: veriler yalnızca hizmetin
                    sunulması ve yasal yükümlülükler için gerekli süre boyunca
                    işlenir ve saklanır. Saklama süreleri işlem türüne göre
                    değişebilir; güncel ayrıntılar Gizlilik Politikası&apos;nda
                    yer alır.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      📸
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Fotoğraflar
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Analiz için işlenir; sunucuda kalıcı fotoğraf arşivi tutulmaz
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      📊
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Analiz Sonuçları
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Geçmiş veya hesap özelliği kullanıldığında özet olarak
                      saklanabilir; amaç dışı kullanılmaz
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      🗂️
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Hesap ve iletişim
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Hesap bilgileri hizmet süresince saklanır; iptal veya talep
                      halinde silinmesi hedeflenir
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                7. KVKK Kapsamındaki Haklarınız
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                KVKK Kanunu&apos;nun 11. maddesi gereğince sahip olduğunuz
                haklar:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-neutral-900/95 border-l-4 border-primary-500 dark:border-l-primary-400 p-6">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    📋 Bilgi ve Erişim Hakları
                  </h3>
                  <ul className="text-neutral-700 dark:text-neutral-300 space-y-2">
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
                <div className="bg-white dark:bg-neutral-900/95 border-l-4 border-accent-500 dark:border-l-accent-400 p-6">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    🔧 Düzeltme ve Silme Hakları
                  </h3>
                  <ul className="text-neutral-700 dark:text-neutral-300 space-y-2">
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

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                8. Hak Kullanım Prosedürü
              </h2>
              <div className="bg-blue-50 dark:bg-blue-950/35 dark:border-blue-800/50 border border-blue-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
                  📝 Başvuru Şekli
                </h3>
                <p className="text-blue-700 dark:text-blue-300/95 mb-4 leading-relaxed">
                  KVKK haklarınızı kullanmak için aşağıdaki yöntemlerle başvuru
                  yapabilirsiniz:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      📧 Elektronik Ortam
                    </h4>
                    <ul className="text-blue-700 dark:text-blue-300/95 space-y-1">
                      <li>• E-posta: mehmet.erdem.akin@outlook.com</li>
                      <li>• Online form: kurbanlikkilohesaplama.com/kvkk</li>
                      <li>• Güvenli iletişim kanalları</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      📮 Fiziksel Ortam
                    </h4>
                    <ul className="text-blue-700 dark:text-blue-300/95 space-y-1">
                      <li>• Posta: Ataşehir, İstanbul</li>
                      <li>• Elden teslim</li>
                      <li>• Noter kanalıyla</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                9. Başvuru Değerlendirme Süreci
              </h2>
              <div className="bg-success-50 dark:bg-emerald-950/35 dark:border-emerald-800/50 border border-success-200 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      1
                    </div>
                    <h4 className="font-bold text-success-800 dark:text-emerald-200 mb-1">Başvuru</h4>
                    <p className="text-success-700 dark:text-emerald-300/95 text-sm">Talep alınır</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      2
                    </div>
                    <h4 className="font-bold text-success-800 dark:text-emerald-200 mb-1">
                      İnceleme
                    </h4>
                    <p className="text-success-700 dark:text-emerald-300/95 text-sm">30 gün içinde</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      3
                    </div>
                    <h4 className="font-bold text-success-800 dark:text-emerald-200 mb-1">Cevap</h4>
                    <p className="text-success-700 dark:text-emerald-300/95 text-sm">Yazılı bildirim</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success-600 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                      4
                    </div>
                    <h4 className="font-bold text-success-800 dark:text-emerald-200 mb-1">İcra</h4>
                    <p className="text-success-700 dark:text-emerald-300/95 text-sm">Talepte bulgular</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                10. Şikayet Hakkı
              </h2>
              <div className="bg-red-50 dark:bg-red-950/30 dark:border-red-900/50 border border-red-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-3">
                  ⚠️ Veri Koruma Kurulu&apos;na Başvuru
                </h3>
                <p className="text-red-700 dark:text-red-300/95 mb-4 leading-relaxed">
                  Başvurunuzun reddedilmesi, verilen cevabın yetersiz bulunması
                  veya başvurunuza süresinde cevap verilmemesi halinde Veri
                  Koruma Kurulu&apos;na şikayette bulunabilirsiniz.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                      📍 İletişim Bilgileri
                    </h4>
                    <ul className="text-red-700 dark:text-red-300/95 space-y-1">
                      <li>• Web: www.kvkk.gov.tr</li>
                      <li>• E-posta: kvkk@kvkk.gov.tr</li>
                      <li>• Telefon: 0 (312) 216 50 50</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                      📋 Başvuru Şartları
                    </h4>
                    <ul className="text-red-700 dark:text-red-300/95 space-y-1">
                      <li>• 30 gün bekleme süresi</li>
                      <li>• Yazılı başvuru</li>
                      <li>• Belge eklenmesi</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                11. Çerez Politikası
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Web sitemizde kullanılan çerezler hakkında bilgi:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                      <th className="border border-neutral-300 dark:border-neutral-600 p-3 text-left">
                        Çerez Türü
                      </th>
                      <th className="border border-neutral-300 dark:border-neutral-600 p-3 text-left">
                        Amacı
                      </th>
                      <th className="border border-neutral-300 dark:border-neutral-600 p-3 text-left">
                        Hukuki Dayanak
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="dark:bg-neutral-950/50">
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Zorunlu Çerezler
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Site işlevselliği
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Meşru menfaat
                      </td>
                    </tr>
                    <tr className="dark:bg-neutral-900/40">
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Analitik Çerezler
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Performans ölçümü
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Açık rıza
                      </td>
                    </tr>
                    <tr className="dark:bg-neutral-950/50">
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Pazarlama Çerezleri
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Kişiselleştirme
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 p-3">
                        Açık rıza
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                12. Güvenlik Önlemleri
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl">🔐</div>
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                    Teknik Güvenlik
                  </h3>
                  <ul className="text-neutral-700 dark:text-neutral-300 text-sm space-y-1">
                    <li>• SSL/TLS şifreleme</li>
                    <li>• Güvenli veri merkezi</li>
                    <li>• Düzenli güvenlik testleri</li>
                    <li>• Erişim kontrolü</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl">👥</div>
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                    İdari Güvenlik
                  </h3>
                  <ul className="text-neutral-700 dark:text-neutral-300 text-sm space-y-1">
                    <li>• Personel eğitimleri</li>
                    <li>• Gizlilik sözleşmeleri</li>
                    <li>• Düzenli denetimler</li>
                    <li>• Prosedür belgeleri</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl">🏢</div>
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                    Fiziksel Güvenlik
                  </h3>
                  <ul className="text-neutral-700 dark:text-neutral-300 text-sm space-y-1">
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

              <div className="bg-neutral-100 dark:bg-neutral-800/90 dark:border-neutral-600 border border-transparent p-6 rounded-lg mt-8">
                <p className="text-neutral-700 dark:text-neutral-300 text-center">
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
