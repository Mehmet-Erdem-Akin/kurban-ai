import Link from "next/link";

export default function PrivacyPage() {
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
                            Gizlilik Politikası
                        </h1>
                        <p className="text-neutral-600 mb-8">
                            Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
                        </p>

                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                1. Giriş
                            </h2>
                            <p className="mb-6 text-neutral-700 leading-relaxed">
                                Kurbanlık Analiz olarak, kişisel verilerinizin güvenliği ve gizliliği
                                bizim için son derece önemlidir. Bu Gizlilik Politikası, 6698 sayılı
                                Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat
                                kapsamında, kişisel verilerinizin nasıl toplandığı, işlendiği,
                                korunduğu ve paylaşıldığı hakkında sizi bilgilendirmek amacıyla
                                hazırlanmıştır.
                            </p>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                2. Veri Sorumlusu
                            </h2>
                            <div className="bg-primary-50 p-6 rounded-lg mb-6">
                                <p className="text-neutral-700 leading-relaxed">
                                    <strong>Proje Sahibi:</strong> Mehmet Erdem Akın<br />
                                    <strong>Adres:</strong> Ataşehir, İstanbul<br />
                                    <strong>E-posta:</strong> mehmet.erdem.akin@outlook.com<br />
                                    <strong>Web:</strong> kurbanaliz.com
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                3. Toplanan Kişisel Veriler
                            </h2>
                            <p className="mb-4 text-neutral-700 leading-relaxed">
                                Hizmetlerimizi kullanırken aşağıdaki kişisel verilerinizi toplayabiliriz:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                                    <h3 className="font-bold text-neutral-900 mb-2">Kimlik Verileri</h3>
                                    <ul className="list-disc list-inside text-neutral-700 space-y-1">
                                        <li>Ad ve soyad</li>
                                        <li>E-posta adresi</li>
                                        <li>Telefon numarası (isteğe bağlı)</li>
                                    </ul>
                                </div>
                                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                                    <h3 className="font-bold text-neutral-900 mb-2">Teknik Veriler</h3>
                                    <ul className="list-disc list-inside text-neutral-700 space-y-1">
                                        <li>IP adresi</li>
                                        <li>Tarayıcı bilgileri</li>
                                        <li>Cihaz bilgileri</li>
                                        <li>Konum bilgisi (izin verildiğinde)</li>
                                    </ul>
                                </div>
                                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                                    <h3 className="font-bold text-neutral-900 mb-2">Uygulama Verileri</h3>
                                    <ul className="list-disc list-inside text-neutral-700 space-y-1">
                                        <li>Yüklenen hayvan fotoğrafları</li>
                                        <li>Analiz sonuçları</li>
                                        <li>Kullanım geçmişi</li>
                                    </ul>
                                </div>
                                <div className="bg-white border border-neutral-200 p-4 rounded-lg">
                                    <h3 className="font-bold text-neutral-900 mb-2">İletişim Verileri</h3>
                                    <ul className="list-disc list-inside text-neutral-700 space-y-1">
                                        <li>Destek talepleri</li>
                                        <li>Geri bildirimler</li>
                                        <li>Şikayetler</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                4. Kişisel Verilerin İşlenme Amaçları
                            </h2>
                            <p className="mb-4 text-neutral-700 leading-relaxed">
                                Kişisel verilerinizi aşağıdaki amaçlarla işlemekteyiz:
                            </p>
                            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                                <li>Yapay zeka destekli hayvan analiz hizmeti sağlamak</li>
                                <li>Kullanıcı hesabı oluşturmak ve yönetmek</li>
                                <li>Analiz geçmişini saklamak ve sunmak</li>
                                <li>Hizmet kalitesini artırmak ve geliştirmek</li>
                                <li>Teknik destek sağlamak</li>
                                <li>Yasal yükümlülükleri yerine getirmek</li>
                                <li>Güvenlik önlemleri almak</li>
                                <li>İstatistiksel analizler yapmak</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                5. Kişisel Verilerin İşlenme Hukuki Sebepleri
                            </h2>
                            <div className="bg-accent-50 p-6 rounded-lg mb-6">
                                <ul className="list-disc list-inside text-neutral-700 space-y-2">
                                    <li><strong>Açık rıza:</strong> Hizmetlerimizi kullanmak için verdiğiniz onay</li>
                                    <li><strong>Sözleşmenin ifası:</strong> Hizmet sözleşmesinin gereği</li>
                                    <li><strong>Yasal yükümlülük:</strong> Kanuni zorunluluklar</li>
                                    <li><strong>Meşru menfaat:</strong> Hizmet güvenliği ve geliştirilmesi</li>
                                </ul>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                6. Kişisel Verilerin Paylaşılması
                            </h2>
                            <p className="mb-4 text-neutral-700 leading-relaxed">
                                Kişisel verilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:
                            </p>
                            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                                <li>Yasal zorunluluklar gereği (mahkeme kararı, kolluk kuvvetleri talebi)</li>
                                <li>Hizmet sağlayıcılarımızla (bulut depolama, analitik hizmetler)</li>
                                <li>İş ortaklarımızla (anonim istatistiksel veriler)</li>
                                <li>Acil durumlarda (güvenlik tehdidi, dolandırıcılık)</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                7. Kişisel Verilerin Saklanma Süresi
                            </h2>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full border-collapse border border-neutral-300">
                                    <thead>
                                        <tr className="bg-neutral-100">
                                            <th className="border border-neutral-300 p-3 text-left">Veri Türü</th>
                                            <th className="border border-neutral-300 p-3 text-left">Saklama Süresi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-neutral-300 p-3">Hesap bilgileri</td>
                                            <td className="border border-neutral-300 p-3">Hesap silinene kadar</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-neutral-300 p-3">Analiz fotoğrafları</td>
                                            <td className="border border-neutral-300 p-3">1 yıl veya silme talebi</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-neutral-300 p-3">Analiz sonuçları</td>
                                            <td className="border border-neutral-300 p-3">2 yıl</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-neutral-300 p-3">Log kayıtları</td>
                                            <td className="border border-neutral-300 p-3">6 ay</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                8. Kişisel Veri Güvenliği
                            </h2>
                            <p className="mb-4 text-neutral-700 leading-relaxed">
                                Verilerinizin güvenliği için aldığımız teknik ve idari önlemler:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-success-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-success-800 mb-2">🔒 Teknik Önlemler</h3>
                                    <ul className="text-success-700 space-y-1">
                                        <li>SSL/TLS şifreleme</li>
                                        <li>Güvenli veri merkezi</li>
                                        <li>Düzenli güvenlik testleri</li>
                                        <li>Erişim kontrolü</li>
                                    </ul>
                                </div>
                                <div className="bg-primary-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-primary-800 mb-2">👥 İdari Önlemler</h3>
                                    <ul className="text-primary-700 space-y-1">
                                        <li>Personel eğitimleri</li>
                                        <li>Gizlilik sözleşmeleri</li>
                                        <li>Düzenli denetimler</li>
                                        <li>Olay müdahale planı</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                9. KVKK Hakları
                            </h2>
                            <p className="mb-4 text-neutral-700 leading-relaxed">
                                KVKK Kanunu kapsamındaki haklarınız:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-white border-l-4 border-primary-500 p-4">
                                    <h3 className="font-bold text-neutral-900 mb-2">✅ Temel Haklar</h3>
                                    <ul className="text-neutral-700 space-y-1">
                                        <li>• Bilgi talep etme</li>
                                        <li>• Verilere erişim</li>
                                        <li>• Düzeltme talep etme</li>
                                        <li>• Silme talep etme</li>
                                    </ul>
                                </div>
                                <div className="bg-white border-l-4 border-accent-500 p-4">
                                    <h3 className="font-bold text-neutral-900 mb-2">🔄 İleri Haklar</h3>
                                    <ul className="text-neutral-700 space-y-1">
                                        <li>• Aktarma talep etme</li>
                                        <li>• İtiraz etme</li>
                                        <li>• Zararın giderilmesi</li>
                                        <li>• Şikayet etme</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                10. Çerezler (Cookies)
                            </h2>
                            <p className="mb-4 text-neutral-700 leading-relaxed">
                                Web sitemizde kullanılan çerez türleri:
                            </p>
                            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-6">
                                <li><strong>Zorunlu Çerezler:</strong> Site işlevselliği için gerekli</li>
                                <li><strong>Performans Çerezleri:</strong> Site performansını ölçmek için</li>
                                <li><strong>Fonksiyonel Çerezler:</strong> Kullanıcı deneyimini iyileştirmek için</li>
                                <li><strong>Pazarlama Çerezleri:</strong> İçerik kişiselleştirme için (izin ile)</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                11. Yapay Zeka ve Fotoğraf İşleme
                            </h2>
                            <div className="bg-warning-50 border border-warning-200 p-6 rounded-lg mb-6">
                                <p className="text-warning-800 leading-relaxed">
                                    <strong>Önemli Bilgi:</strong> Yüklediğiniz hayvan fotoğrafları, yapay zeka
                                    modelimiz tarafından analiz edilir. Bu fotoğraflar sadece analiz amacıyla
                                    kullanılır ve hiçbir üçüncü tarafla paylaşılmaz. İsterseniz analiz sonrası
                                    fotoğraflarınızın silinmesini talep edebilirsiniz.
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                12. İletişim ve Başvuru
                            </h2>
                            <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-lg mb-6">
                                <p className="text-neutral-700 mb-4 leading-relaxed">
                                    KVKK haklarınızı kullanmak için aşağıdaki yollarla bize ulaşabilirsiniz:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-2">📧 E-posta</p>
                                        <p className="text-neutral-700">mehmet.erdem.akin@outlook.com</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-2">📮 Adres</p>
                                        <p className="text-neutral-700">Ataşehir, İstanbul</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-2">🌐 Online Form</p>
                                        <Link href="/contact" className="text-primary-600 hover:text-primary-700">
                                            İletişim formu
                                        </Link>
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-2">ℹ️ Proje Bilgisi</p>
                                        <p className="text-neutral-700">Bireysel geliştirilen proje</p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                13. Politika Değişiklikleri
                            </h2>
                            <p className="mb-6 text-neutral-700 leading-relaxed">
                                Bu Gizlilik Politikası, yasal düzenlemeler ve hizmet değişiklikleri
                                doğrultusunda güncellenebilir. Önemli değişiklikler hakkında e-posta
                                yoluyla bilgilendirileceksiniz. Güncel versiyonu her zaman web
                                sitemizde bulabilirsiniz.
                            </p>

                            <div className="bg-neutral-100 p-6 rounded-lg">
                                <p className="text-neutral-700 text-center">
                                    <strong>Son güncelleme:</strong> {new Date().toLocaleDateString("tr-TR")}<br />
                                    <strong>Politika versiyonu:</strong> 1.0
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