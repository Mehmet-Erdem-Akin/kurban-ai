import type { BlogPost } from "../types";

export const randimanPost: BlogPost = {
  slug: "dana-karkas-randimani",
  title: "Dana Karkas Randımanı: Et Bilimi Verileri ve Hesaplama",
  description:
    "Dana ve sığır karkas randımanı nedir? Öztan ve Türkiye meta-analiz verileri, erkek-dişi farkı, soğuk karkas ve kurbanlık kilo hesaplama bağlantısı.",
  excerpt:
    "Randıman, canlı kilodan karkasa geçen orandır. Sığırda ~%50–55, besi danasında ~%58–65; ırk ve besi kalitesi belirleyicidir.",
  intro:
    "Dana karkas randımanı, kurbanlık fiyat hesaplama ve hisse bölüşümünde en kritik teknik parametredir. Randıman (karkas verimi), kesim sonrası soğuk veya sıcak karkas ağırlığının canlı ağırlığa oranıdır. Bu yazıda et bilimi literatüründeki resmi aralıklar, Türkiye’deki bilimsel çalışma bulguları ve pratik hesaplama adımlarını bir araya getiriyoruz.",
  publishedAt: "2026-05-14",
  updatedAt: "2026-05-22",
  readingMinutes: 13,
  category: "Randıman",
  keywords: [
    "dana karkas randımanı",
    "karkas kilo hesaplama",
    "kurban randıman hesaplama",
    "sığır karkas verimi",
    "soğuk karkas randımanı",
  ],
  sections: [
    {
      heading: "Karkas randımanı ne demek?",
      paragraphs: [
        "Kasaplık hayvanlarda randıman; kesim öncesi canlı ağırlığa göre karkas ağırlığının yüzdesidir. Et Bilimi ve Teknolojisi ders kaynaklarında (Öztan, TMMOB Gıda Mühendisleri Odası) sıcak karkas hemen kesim sonrası, soğuk karkas ise soğutma sonrası tartımda ifade edilir; aradaki fark ‘soğutma firesi’ olarak anılır.",
        "Randımana etki eden başlıca faktörler: tür, yaş, canlı ağırlık, ırk, besi düzeyi ve kesim öncesi kondisyon. Besi sonu canlı ağırlık arttıkça randımanın da yükselme eğilimi literatürde vurgulanır.",
      ],
    },
    {
      heading: "Resmi ve akademik randıman aralıkları",
      paragraphs: [
        "Ankara Üniversitesi açık ders materyallerinde Öztan kaynaklı özet: sığırda randıman yaklaşık %50–55, danada (besi) %58–65, koyunda %48–55 arasında değişir.",
        "Türkiye’de sığır besiciliğini inceleyen meta-analiz çalışmalarında sıcak karkas randımanı (SIKAR) ortalaması yaklaşık %56,94; soğuk karkas randımanı (SOKAR) %55,13 gibi değerler raporlanmıştır. Kültür melezlerinde daha yüksek, yerli ırklarda daha düşük randıman görülebilir.",
        "Sektör araçlarında ırk bazlı tipik değerler de kullanılır: örneğin Simental ~%60, Angus ~%62, Holstein ~%58, yerli kara ~%52 bandında anılır (veteriner yazılım referansları). Bu değerler ortalamadır; tek hayvan için tartı ve kesim sonucu esas alınmalıdır.",
      ],
      list: [
        "Sığır (genel): %50–55",
        "Besi danası: %58–65",
        "Koyun: %48–55",
        "Türkiye meta-analiz SIKAR ort.: ~%57",
      ],
    },
    {
      heading: "Erkek ve dişi büyükbaş farkı",
      paragraphs: [
        "Kurban pazarında erkek (tosun, boğa) ve dişi (inek, düve) hayvanların kas yapısı farklıdır. Genelde erkek besi hayvanlarında randıman daha yüksek, dişi hayvanlarda bir miktar daha düşük kabul edilir.",
        "Platformumuzda ön hesap için erkek büyükbaş profilinde varsayılan %60, dişi profilde %53 kullanılır. Bu değerler pazarlık öncesi senaryo üretmek içindir; kesim sonrası resmi karkas tartımı nihai sonucu verir.",
      ],
      subsections: [
        {
          heading: "Örnek: 700 kg canlı dana",
          paragraphs: [
            "%60 randıman → 420 kg karkas. Kg karkas fiyatı 620 TL ise karkas değeri ≈ 260.400 TL. 7 hisseye bölündüğünde hisse ≈ 37.200 TL.",
            "Aynı hayvan %55 randımanla yorumlanırsa karkas 385 kg, değer ≈ 238.700 TL, hisse ≈ 34.100 TL olur. Randımandaki 5 puanlık fark, hisse başı binlerce lira oynatabilir.",
          ],
        },
      ],
    },
    {
      heading: "Karkas kilo hesaplama formülü",
      paragraphs: [
        "Karkas kilo (kg) = Canlı kilo (kg) × Randıman (%) ÷ 100. Ardından karkas kilo × birim fiyat = toplam satış değeri hesaplanır.",
        "Net sofralık et, karkasın tamamı değildir. Kemik, iç yağ ve işleme firesi düşüldükten sonra kullanılabilir et oranı karkasın yaklaşık %70–75’i civarında anlatılır (sektör rehberleri). Yani karkas 400 kg ise net et 280–300 kg bandında planlanabilir; bu da paylaşım ve saklama planı için önemlidir.",
      ],
    },
    {
      heading: "Kurbanlık alıcı için pratik kontrol listesi",
      paragraphs: [
        "Satıcıdan ırk, yaş ve besi süresi bilgisini isteyin; Diyanet yaş şartının sağlandığını teyit edin.",
        "Mümkünse canlı tartı yapın; yoksa göğüs çevresi ölçüsünü kaydedin.",
        "Randıman vaadinin literatürle uyumlu olup olmadığını kontrol edin (%70+ iddiaları şüpheyle karşılayın).",
        "Hisse sayısının 7’yi geçmediğinden ve pay sahiplerinin kesimden önce belli olduğundan emin olun.",
      ],
    },
    {
      heading: "Tarım politikası bağlamı",
      paragraphs: [
        "Tarım ve Orman Bakanlığı araştırma kuruluşlarının kırmızı et durum raporlarında, Türkiye’de büyükbaş et üretiminin arttığı ve birim hayvan başına verimin toplam arz üzerindeki etkisinin büyüdüğü belirtilir. Randıman artışı, hem üretici kârlılığı hem de tüketici fiyatı açısından stratejik bir göstergedir.",
        "Kurban dönemi kısa süreli yoğun talep yarattığı için kg fiyatları yıllık ortalamadan sapabilir; hesaplamayı güncel piyasa fiyatıyla yenilemek gerekir.",
      ],
    },
  ],
  faqs: [
    {
      q: "Dana karkas randımanı ortalama kaçtır?",
      a: "Et bilimi kaynaklarında besi danası için yaklaşık %58–65 bandı verilir. Tek hayvanın randımanı ırk, besi ve kesim hijyenine göre değişir.",
    },
    {
      q: "Randıman ile karkas kilo nasıl bulunur?",
      a: "Karkas kilo = Canlı kilo × (Randıman ÷ 100). Örneğin 600 kg canlı ve %58 randıman → 348 kg karkas.",
    },
    {
      q: "Soğuk karkas randımanı neden sıcaktan düşük çıkar?",
      a: "Kesim sonrası soğutma ve dinlendirme sırasında nem kaybı olur; soğuk karkas tartımı genelde sıcak tartımdan biraz düşük yüzde verir.",
    },
    {
      q: "Kurban için %65 üzeri randıman gerçekçi mi?",
      a: "Çok yüksek randıman iddiaları her hayvanda görülmez. Literatür ve Türkiye meta-analiz ortalamaları genelde %50–62 bandında yoğunlaşır; şüpheli vaatleri karşılaştırmalı sorun.",
    },
  ],
  sources: [
    {
      label: "Ankara Üniversitesi — Randıman (Öztan, Et Bilimi)",
      url: "https://acikders.ankara.edu.tr/mod/resource/view.php?id=105237",
    },
    {
      label: "DergiPark — Sığır besiciliği meta-analizi (Türkiye)",
      url: "https://dergipark.org.tr/en/download/article-file/3453538",
    },
    {
      label: "Tarım ve Orman Araştırma — Kırmızı Et Durum Raporu 2025",
      url: "https://arastirma.tarimorman.gov.tr/tepge/Belgeler/PDF%20Durum-Tahmin%20Raporlar%C4%B1/2025%20Durum-Tahmin%20Raporlar%C4%B1/K%C4%B1rm%C4%B1z%C4%B1%20Et%20Durum%20Tahmin%20Raporu%202025-422.pdf",
    },
  ],
};
