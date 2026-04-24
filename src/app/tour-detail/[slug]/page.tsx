import { Metadata } from "next";
import TourDetailExperience from "@/components/pages/tour-detail/TourDetailExperience";
import HeaderThree from "@/layouts/headers/HeaderThree";
import FooterSix from "@/layouts/footers/FooterSix";
import { getTourPackageBySlug } from "@/data/TourPackageData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tourPackage = getTourPackageBySlug(slug);

  return {
    title: `${tourPackage.title} | Tourex`
  };
}

const TourDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const tourPackage = getTourPackageBySlug(slug);

  return (
    <>
      <HeaderThree solid />
      <main>
        <TourDetailExperience tourPackage={tourPackage} />
      </main>
      <FooterSix />
    </>
  );
};

export default TourDetailPage;
