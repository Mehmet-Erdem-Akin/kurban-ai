import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/blog";

const BlogTeaser = () => {
  const featured = blogPosts.slice(0, 3);

  return (
    <section
      id="rehber"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:py-20"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="section-kicker mb-3">Blog & rehber</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
            Kurban hesaplama rehberleri
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Kilo, hisse ve randıman hakkında kısa rehberler. Pazar öncesi
            bilmeniz gereken pratik notlar.
          </p>
        </div>
        <Link
          href="/blog"
          className="btn btn-secondary btn-md inline-flex shrink-0 gap-2 self-start sm:self-auto"
        >
          Tüm yazılar
          <ArrowRightIcon className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featured.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default BlogTeaser;
