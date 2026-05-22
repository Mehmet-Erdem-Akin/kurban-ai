import type { BlogPost } from "@/lib/blog";

type BlogPostBodyProps = {
  post: BlogPost;
};

const BlogPostBody = ({ post }: BlogPostBodyProps) => {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
        {post.intro}
      </p>

      <p className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm leading-relaxed text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/25 dark:text-amber-100">
        <strong>Yasal uyarı:</strong> Bu içerik bilgilendirme amaçlıdır; resmi
        tartı, veteriner ekspertiz raporu veya dini fetva yerine geçmez. Güncel
        mevzuat ve fiyatlar için ilgili resmi kurumları kontrol edin.
      </p>

      {post.sections.map((section) => (
        <section key={section.heading} className="mb-12 mt-12">
          <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50 sm:text-2xl">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={`${section.heading}-p-${index}`}
              className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-400"
            >
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-600 dark:text-stone-400">
              {section.list.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}
          {section.subsections?.map((sub) => (
            <div key={sub.heading} className="mt-8 rounded-2xl border border-stone-200/80 bg-stone-50/50 p-5 dark:border-stone-700 dark:bg-stone-900/50 sm:p-6">
              <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                {sub.heading}
              </h3>
              {sub.paragraphs.map((paragraph, index) => (
                <p
                  key={`${sub.heading}-p-${index}`}
                  className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400"
                >
                  {paragraph}
                </p>
              ))}
              {sub.list && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-600 dark:text-stone-400">
                  {sub.list.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}

      {post.faqs.length > 0 && (
        <section className="mb-12 mt-14 border-t border-stone-200 pt-12 dark:border-stone-800">
          <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-50 sm:text-2xl">
            Sık sorulan sorular
          </h2>
          <dl className="mt-6 space-y-6">
            {post.faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="font-semibold text-stone-900 dark:text-stone-50">
                  {faq.q}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-stone-600 dark:text-stone-400">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {post.sources.length > 0 && (
        <section className="border-t border-stone-200 pt-10 dark:border-stone-800">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            Kaynaklar
          </h2>
          <ul className="mt-4 space-y-3">
            {post.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-emerald-800 underline decoration-emerald-800/30 underline-offset-2 transition hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

export default BlogPostBody;
