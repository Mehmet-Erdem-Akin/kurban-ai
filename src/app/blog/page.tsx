import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import BlogCard from "@/components/blog/BlogCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { blogPosts } from "@/lib/blog";
import { getCanonicalUrl } from "@/lib/seo";

const blogListStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Kurbanlık Kilo Hesaplama Rehberi",
  url: getCanonicalUrl("/blog"),
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: getCanonicalUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "tr-TR",
  })),
};

const BlogPage = () => {
  return (
    <AppPageShell>
      <SiteHeader />
      <script
        id="blog-list-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListStructuredData),
        }}
      />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker mx-auto">Rehber</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            Kurban hesaplama blogu
          </h1>
          <p className="mt-4 text-pretty text-stone-600 dark:text-stone-400">
            Diyanet, TDV ve et bilimi kaynaklarına dayalı uzun rehberler: kurbanlık
            kilo hesaplama, hisse fiyatı, dana randımanı ve küçükbaş kilosu.
          </p>
          <Link
            href="/#hesaplama"
            className="btn btn-primary btn-md mt-8 inline-flex"
          >
            Hemen kilo hesapla
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </AppPageShell>
  );
};

export default BlogPage;
