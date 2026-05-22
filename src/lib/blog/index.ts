import { hissePost } from "./posts/hisse";
import { kucukbasPost } from "./posts/kucukbas";
import { kurbanlikKiloPost } from "./posts/kurbanlik-kilo";
import { randimanPost } from "./posts/randiman";
import type { BlogPost } from "./types";

export type {
  BlogPost,
  BlogPostFaq,
  BlogPostSection,
  BlogPostSource,
  BlogPostSubsection,
} from "./types";

export const blogPosts: BlogPost[] = [
  kurbanlikKiloPost,
  hissePost,
  randimanPost,
  kucukbasPost,
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

export const getAllBlogSlugs = () => blogPosts.map((post) => post.slug);
