export type BlogPostSubsection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  subsections?: BlogPostSubsection[];
};

export type BlogPostFaq = {
  q: string;
  a: string;
};

export type BlogPostSource = {
  label: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  intro: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  category: string;
  keywords: string[];
  sections: BlogPostSection[];
  faqs: BlogPostFaq[];
  sources: BlogPostSource[];
};
