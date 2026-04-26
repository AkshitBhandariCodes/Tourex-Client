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
    title: `${tourPackage.title} - Traveler Details | Tourex`
  };
}

const TourDetailTravelerPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const tourPackage = getTourPackageBySlug(slug);

  return (
    <>
      <HeaderThree solid />
      <main>
        <TourDetailExperience tourPackage={tourPackage} step="traveler_details" />
      </main>
      <FooterSix />
    </>
  );
};

export default TourDetailTravelerPage;
