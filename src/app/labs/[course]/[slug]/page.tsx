import { LABS, getLabByCourseAndSlug } from "../../../../data/labs";
import LabDetailContent from "../../../../components/LabDetailContent";
import LabNotFound from "../../../../components/LabNotFound";

export default async function LabPage({
  params,
}: {
  params: Promise<{ course: string; slug: string }>;
}) {
  const { course, slug } = await params;
  const lab = getLabByCourseAndSlug(course, slug);

  if (!lab || lab.comingSoon) {
    return <LabNotFound />;
  }

  return <LabDetailContent lab={lab} />;
}

export async function generateStaticParams() {
  return LABS.filter((l) => !l.comingSoon).map((lab) => ({
    course: lab.courseSlug,
    slug: lab.slug,
  }));
}
