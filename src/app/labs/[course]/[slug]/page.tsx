import { LABS, getLabByCourseAndSlug } from "../../../../data/labs";
import LabDetailContent from "../../../../components/LabDetailContent";
import LabNotFound from "../../../../components/LabNotFound";

export default function LabPage({ params }: { params: { course: string; slug: string } }) {
  const { course, slug } = params;
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
