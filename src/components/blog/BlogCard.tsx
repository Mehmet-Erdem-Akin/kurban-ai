import Link from "next/link";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import type { BlogPost } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden">
      <div
        className="h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 opacity-80 transition group-hover:opacity-100"
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-300">
          {post.category}
        </p>
        <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-stone-900 transition group-hover:text-emerald-900 dark:text-stone-50 dark:group-hover:text-emerald-200">
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4" aria-hidden />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" aria-hidden />
            {post.readingMinutes} dk okuma
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 transition hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100"
        >
          Devamını oku
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
