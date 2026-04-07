import { Metadata } from "next";
import { LABS, getLabByCourseAndSlug, getLabPath } from "../../../../data/labs";
import LabDetailContent from "../../../../components/LabDetailContent";
import LabNotFound from "../../../../components/LabNotFound";

type Params = { course: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { course, slug } = await params;
  const lab = getLabByCourseAndSlug(course, slug);

  if (!lab || lab.comingSoon) {
    return { title: "Lab Not Found" };
  }

  const title = lab.title;
  const description = lab.summary;
  const keywords = [
    ...(lab.tools || []),
    ...(lab.skillsDemonstrated || []),
    lab.focus,
    lab.level,
    "cybersecurity",
    "security lab",
  ].filter((k): k is string => Boolean(k));

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.luislozoya.com${getLabPath(lab)}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LabPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { course, slug } = await params;
  const lab = getLabByCourseAndSlug(course, slug);

  if (!lab || lab.comingSoon) {
    return <LabNotFound />;
  }

  const labUrl = `https://www.luislozoya.com${getLabPath(lab)}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.luislozoya.com" },
        { "@type": "ListItem", position: 2, name: "Security Labs", item: "https://www.luislozoya.com/#security-labs" },
        { "@type": "ListItem", position: 3, name: lab.title, item: labUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: lab.title,
      description: lab.summary,
      url: labUrl,
      author: {
        "@type": "Person",
        name: "Luis Javier Lozoya",
        url: "https://www.luislozoya.com",
      },
      publisher: {
        "@type": "Person",
        name: "Luis Javier Lozoya",
      },
      ...(lab.date && { datePublished: lab.date }),
      proficiencyLevel: "Beginner",
      dependencies: lab.tools.join(", "),
      about: [
        ...(lab.skillsDemonstrated || []).map((skill) => ({
          "@type": "Thing",
          name: skill,
        })),
      ],
      keywords: [
        ...(lab.tools || []),
        ...(lab.skillsDemonstrated || []),
        lab.focus,
        "cybersecurity",
      ].filter(Boolean).join(", "),
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
      <LabDetailContent lab={lab} />
    </>
  );
}

export async function generateStaticParams() {
  return LABS.filter((l) => !l.comingSoon).map((lab) => ({
    course: lab.courseSlug,
    slug: lab.slug,
  }));
}
