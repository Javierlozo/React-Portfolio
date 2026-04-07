import { Metadata } from "next";
import { BLOG_POSTS, getBlogPost } from "../../../data/blog";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.luislozoya.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Luis Javier Lozoya"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://www.luislozoya.com/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Luis Javier Lozoya",
        url: "https://www.luislozoya.com",
      },
      publisher: {
        "@type": "Person",
        name: "Luis Javier Lozoya",
      },
      keywords: post.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.luislozoya.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.luislozoya.com/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: `https://www.luislozoya.com/blog/${post.slug}` },
      ],
    },
  ];

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <BlogPostClient post={post} />
    </>
  );
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}
