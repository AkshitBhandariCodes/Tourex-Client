import { redirect } from "next/navigation";
import { DEFAULT_TOUR_SLUG } from "@/utils/tourDetailRoute";

export const metadata = {
  title: "Tour Details | Tourex",
};
const page = () => {
  redirect(`/tour-detail/${DEFAULT_TOUR_SLUG}`);
}

export default page