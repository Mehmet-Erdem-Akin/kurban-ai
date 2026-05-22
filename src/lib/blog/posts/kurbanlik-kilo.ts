import type { BlogPost } from "../types";

export const kurbanlikKiloPost: BlogPost = {
  slug: "kurbanlik-kilo-nasil-hesaplanir",
  title: "Kurbanlık Kilo Nasıl Hesaplanır? Resmi Şartlar ve Ölçü Formülü",
  description:
    "Kurbanlık kilo hesaplama rehberi: Diyanet yaş şartları, göğüs çevresi formülü, kantar tartımı ve fotoğrafla tahmin. Büyükbaş ve küçükbaş için güncel, kaynaklı bilgiler.",
  excerpt:
    "Canlı kilo; hisse bedeli ve et miktarının temelidir. Diyanet kurban şartları, veteriner ölçü yöntemleri ve pratik hesaplama adımları bu rehberde.",
  intro:
    "Kurbanlık kilo hesaplama, bayram öncesi en çok aranan konulardan biridir. Doğru sonuç için hem dini-usul şartlarını (Diyanet İşleri Başkanlığı ve TDV kaynakları) hem de zooteknik ölçüm yöntemlerini birlikte değerlendirmek gerekir. Bu yazıda kurbanlık seçiminde resmi yaş ve sağlık kriterleri, kantar tartımı, göğüs çevresiyle canlı ağırlık tahmini ve dijital araçlarla ön analiz adımlarını bulacaksınız.",
  publishedAt: "2026-05-10",
  updatedAt: "2026-05-22",
  readingMinutes: 14,
  category: "Kilo hesaplama",
  keywords: [
    "kurbanlık kilo hesaplama",
    "kurban kilo hesaplama",
    "canlı kilo tahmini",
    "göğüs çevresi kilo formülü",
    "kurbanlık canlı ağırlık",
  ],
  sections: [
    {
      heading: "Kurbanlık kilo neden önemli?",
      paragraphs: [
        "Kurban alımında canlı ağırlık; ödediğiniz toplam bedelin, hisse başı düşen tutarın ve beklenen et miktarının ortak paydasıdır. Özellikle büyükbaş kurbanlarda 7 kişilik hisse modeli kullanıldığı için birkaç kiloluk sapma, kişi başı maliyeti doğrudan değiştirir.",
        "Pazar yerlerinde her işletmede baskül (kantar) bulunmayabilir. Bu durumda göğüs çevresi ve vücut uzunluğu gibi vücut ölçüleriyle tahmin yapılır. Akademik çalışmalarda göğüs çevresinin canlı ağırlıkla en yüksek korelasyonu gösterdiği (r≈0,97) bilimsel literatürde yer alır; yine de kesin değer için resmi tartı esastır.",
        "Unutmayın: Bu tür hesaplamalar bilgilendirme amaçlıdır; veteriner ekspertiz raporu veya resmi tartı belgesinin yerini tutmaz.",
      ],
    },
    {
      heading: "Diyanet’e göre kurbanlık hayvan şartları (resmi)",
      paragraphs: [
        "Kurbanlık seçiminde önce hayvanın ibadet şartlarını taşıması gerekir. Türkiye Diyanet Vakfı’nın resmi açıklamasına göre kurban; koyun, keçi, sığır, manda ve deveden kesilir.",
        "Yaş şartları kameri yıla göre belirlenir: deve için en az 5 yaş; sığır ve manda için en az 2 yaş; koyun ve keçi için en az 1 yaş. Koyunda, altı ayını tamamlamış olmakla birlikte bir yaşındakiler kadar gösterişli (semiz) olması hâlinde de kurban edilebilir bilgisi TDV kaynaklarında yer alır.",
        "Sağlık yönünden kötürüm derecede hasta, kesileceği yere gidemeyecek kadar topal, bir veya iki gözü kör, boynuzları kökünden kırık, dili-kuyruğu-kulağı veya memesinin yarısından fazlası kesik, dişlerinin tamamı veya çoğu dökülmüş hayvanlar kurban olmaz. Hafif topallık, bir kulağın delik olması veya doğuştan boynuzsuzluk gibi durumlar ise engel sayılmaz.",
      ],
      list: [
        "Büyükbaşta en fazla 7 hissedar — 7’den fazla ortaklık caiz değildir (Diyanet İşleri Başkanlığı SSS)",
        "Küçükbaşta hayvan tek kişiye aittir; birden fazla kişi ortak olamaz",
        "Hissedarlar kesimden önce belirlenmeli; toplu kesimde pay sahipliği net olmalıdır",
      ],
    },
    {
      heading: "Canlı kilo nasıl ölçülür? Kantar ve saha yöntemleri",
      paragraphs: [
        "En güvenilir yöntem, hayvanın kesim öncesi canlı tartımıdır. Tarım ve Orman Bakanlığı’nın hayvancılık istatistiklerinde büyükbaş yetiştiriciliği ve kırmızı et arzı canlı ağırlık ve verim artışı üzerinden izlenir; ticari işlemlerde de tartı belgesi talep etmek alıcının hakkıdır.",
        "Saha koşullarında şerit metre ile yapılan ölçümlerde hayvanın dört ayağının düz, başının normal pozisyonda ve nefes verme anında ölçüm alınması önerilir. Veteriner kaynaklarında göğüs çevresi kalbin hemen arkasından, ön bacakların arkasından geçecek şekilde; vücut uzunluğu ise omuz başından kuyruk sokumuna kadar alınır.",
      ],
      subsections: [
        {
          heading: "Göğüs çevresiyle tahmin formülü",
          paragraphs: [
            "Türkiye’de besi ve kurban pazarlarında yaygın pratik formül: Canlı ağırlık (kg) ≈ (Göğüs çevresi cm)² × (Vücut uzunluğu cm) / 10840. Besili (semiz) hayvanlarda sonuç yaklaşık %8 artırılarak yorumlanabilir.",
            "Uluslararası veteriner kaynaklarında Schaeffer tipi formül de anılır: Ağırlık ≈ Göğüs çevresi² × Vücut uzunluğu / 300 (ölçüm disiplinine göre). Farklı katsayılar ırk, besi düzeyi ve ölçüm hatasından kaynaklanır; bu nedenle tek formül yerine mümkünse kantar kullanın.",
            "Göğüs çevresi tek başına da tabloyla tahmin edilir; Tarım Ziraat gibi sektör kaynaklarında cm başına canlı kilo karşılıkları listelenir. Bu tablolar besi sığırı için hazırlanmış referans değerler sunar.",
          ],
        },
        {
          heading: "Örnek hesaplama",
          paragraphs: [
            "Diyelim ki göğüs çevresi 190 cm, vücut uzunluğu 165 cm ve kondisyon normal. Tahmin: 190² × 165 / 10840 ≈ 549 kg canlı ağırlık. Besili kondisyonda bu değer yaklaşık 593 kg bandına çıkar.",
            "Elde ettiğiniz canlı kiloyu karkas randımanı ve kg et fiyatıyla çarparak toplam değeri; büyükbaşta 7’ye bölerek hisse fiyatını hesaplayabilirsiniz. Ana sayfamızdaki kurbanlık kilo ve hisse hesaplama aracı bu adımları otomatikleştirir.",
          ],
        },
      ],
    },
    {
      heading: "Büyükbaş ve küçükbaşta kilo farkları",
      paragraphs: [
        "Büyükbaş kurbanlıklarda (dana, tosun, inek, manda) canlı ağırlık çoğu pazarda 450–800 kg aralığında görülür; ırk ve besi süresine göre değişir. Et bilimi kaynaklarında sığırda karkas randımanının yaklaşık %50–55, besi danasında %58–65 bandında olduğu belirtilir (Öztan, Et Bilimi ve Teknolojisi).",
        "Küçükbaşta (koyun, koç, keçi) canlı ağırlık genelde 40–80 kg aralığındadır; ırka göre karkas verimi %42–55 arasında değişebilir. Küçükbaş kurban tek kişiliktir; kilo doğrudan ödeyeceğiniz bedeli belirler.",
      ],
    },
    {
      heading: "Fotoğraf ile kurbanlık kilo tahmini",
      paragraphs: [
        "Yapay zeka destekli analiz, net yan profil fotoğraflarda bağlam kurarak tahmini canlı ağırlık üretir. Fotoğrafın bulanık, çok uzak veya hayvanın tamamını göstermemesi hata payını artırır.",
        "Dijital tahmin, pazarlık öncesi hızlı ön kontrol sağlar; nihai karar için mümkünse canlı tartı, veteriner gözlemi ve satıcı sözleşmesindeki kilo ifadesi birlikte değerlendirilmelidir.",
      ],
      list: [
        "Gün ışığında, gövdenin büyük bölümü görünür kareler çekin",
        "Aynı hayvandan mümkünse iki açı kullanın",
        "Sonucu hisse ve karkas hesabına aktararak bütçe planlayın",
      ],
    },
    {
      heading: "Sık yapılan hatalar",
      paragraphs: [
        "Yaşı doldurmamış hayvanı kurban etmek ibadeti geçersiz kılar; satıcıdan doğum/yaş bilgisi isteyin.",
        "Sadece göz kararı fiyat verip tartı yapmamak, özellikle büyükbaşta hisse maliyetini şişirebilir.",
        "Randıman oranını gerçekçi olmayan %70+ gibi göstermek yanıltıcıdır; literatürdeki ırk ve cinsiyet aralıklarını kullanın.",
        "7’den fazla hissedarla anlaşmak Diyanet açıklamalarına göre caiz değildir.",
      ],
    },
  ],
  faqs: [
    {
      q: "Kurbanlık kilo hesaplama için en güvenilir yöntem hangisi?",
      a: "Kesin değer için baskül (kantar) tartımı esastır. Kantar yoksa göğüs çevresi ve vücut uzunluğu formülleri yaklaşık sonuç verir; veteriner kaynaklarında bu yöntemlerin ±%5 civarı sapma ile kullanılabildiği belirtilir.",
    },
    {
      q: "Büyükbaş kurban kaç yaşında olmalı?",
      a: "Diyanet ve TDV kaynaklarına göre sığır ve manda en az 2 kameri yaşını doldurmalıdır. Yaş şartı sağlanmayan hayvan kurban edilemez.",
    },
    {
      q: "Göğüs çevresi 190 cm olan dana kaç kilo gelir?",
      a: "Vücut uzunluğu 165 cm ve normal kondisyon varsayımıyla pratik formül yaklaşık 549 kg canlı ağırlık verir. Besili kondisyonda bu değer bir miktar artırılır; kesin sonuç için tartı şarttır.",
    },
    {
      q: "Fotoğrafla kilo hesaplama resmi tartı yerine geçer mi?",
      a: "Hayır. Fotoğraf analizi ön bilgilendirme sağlar; resmi ekspertiz veya kantar tartısı nihai belgedir.",
    },
  ],
  sources: [
    {
      label: "Türkiye Diyanet Vakfı — Kurban hayvan şartları",
      url: "https://tdv.org/tr-TR/faaliyetlerimiz/kurban/",
    },
    {
      label: "Diyanet İşleri Başkanlığı — Hisse ve vekalet kuralları (Milliyet özeti)",
      url: "https://www.milliyet.com.tr/gundem/kurban-bayrami-2026-vekaletle-kurban-kesimi-nasil-yapilir-diyanet-bedelleri-kesim-vakti-ve-hisse-kurallari-7583181",
    },
    {
      label: "Ankara Üniversitesi açık ders — Randıman (Öztan, Et Bilimi)",
      url: "https://acikders.ankara.edu.tr/mod/resource/view.php?id=105237",
    },
    {
      label: "Tarım ve Orman Araştırma — Kırmızı Et Durum Raporu 2025",
      url: "https://arastirma.tarimorman.gov.tr/tepge/Belgeler/PDF%20Durum-Tahmin%20Raporlar%C4%B1/2025%20Durum-Tahmin%20Raporlar%C4%B1/K%C4%B1rm%C4%B1z%C4%B1%20Et%20Durum%20Tahmin%20Raporu%202025-422.pdf",
    },
  ],
};
