import { Metadata } from "next";
import { LABS, getLabByCourseAndSlug } from "../../../../../data/labs";
import LabPrintView from "../../../../../components/LabPrintView";
import LabNotFound from "../../../../../components/LabNotFound";

type Params = { course: string; slug: string };

export const metadata: Metadata = {
  title: "Lab Print Sheet",
  robots: { index: false, follow: false },
};

export default async function LabPrintPage({ params }: { params: Promise<Params> }) {
  const { course, slug } = await params;
  const lab = getLabByCourseAndSlug(course, slug);

  if (!lab || lab.comingSoon) {
    return <LabNotFound />;
  }

  return (
    <LabPrintView
      labs={[lab]}
      heading={lab.title}
      subheading={`${lab.course ?? lab.level ?? ""} | Printable command sheet`}
    />
  );
}

export async function generateStaticParams() {
  return LABS.filter((l) => !l.comingSoon).map((lab) => ({
    course: lab.courseSlug,
    slug: lab.slug,
  }));
}
