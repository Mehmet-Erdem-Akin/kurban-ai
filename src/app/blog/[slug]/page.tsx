import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import AppPageShell from "@/components/AppPageShell";
import BlogPostBody from "@/components/blog/BlogPostBody";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { blogPosts, getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import { buildMetadata, getCanonicalUrl } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const generateStaticParams = () =>
  getAllBlogSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Yazı bulunamadı" };
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "tr-TR",
    keywords: post.keywords.join(", "),
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Organization",
      name: "Kurbanlık Kilo Hesaplama",
    },
    publisher: {
      "@type": "Organization",
      name: "Kurbanlık Kilo Hesaplama",
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <AppPageShell>
      <SiteHeader />
      <script
        id="blog-article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        id="blog-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 transition hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden />
          Tüm yazılar
        </Link>

        <header className="mx-auto mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300">
            {post.category}
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" aria-hidden />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" aria-hidden />
              {post.readingMinutes} dakika okuma
            </span>
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-3xl">
          <BlogPostBody post={post} />
        </div>

        <div className="animal-cta relative mx-auto mt-14 max-w-3xl overflow-hidden px-6 py-10 sm:px-8">
          <div className="relative z-[1] text-center">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">
              Hesaplamayı deneyin
            </h2>
            <p className="mt-2 text-sm text-emerald-100">
              Canlı kilo, karkas ve hisse fiyatını anında hesaplayın.
            </p>
            <Link href="/#hesaplama" className="animal-cta-btn btn-md mt-6 inline-flex">
              Ücretsiz hesapla
            </Link>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-stone-200 pt-12 dark:border-stone-800">
            <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50">
              İlgili yazılar
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="card-hover block p-5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                      {item.category}
                    </p>
                    <p className="mt-2 font-semibold text-stone-900 dark:text-stone-50">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </AppPageShell>
  );
};

export default BlogPostPage;
