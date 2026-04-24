export type TourSectionType = "flight" | "transfer" | "hotel" | "activity";

export interface TourOption {
  id: string;
  name: string;
  subtitle?: string;
  provider?: string;
  priceDelta: number;
  duration?: string;
  baggage?: string;
  paxInfo?: string;
  nightsImpact?: number;
  recommendedReturnOptionId?: string;
  confirmationMessage?: string;
  meta?: string[];
}

export interface TourSection {
  id: string;
  title: string;
  dateLabel: string;
  type: TourSectionType;
  optional?: boolean;
  options: TourOption[];
  defaultOptionId: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  destination: string;
  currency: string;
  heroImage: string;
  imageGallery: string[];
  startDate: string;
  travelers: string;
  durationLabel: string;
  locationLabel: string;
  ratingLabel: string;
  overview: string[];
  description: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  terms: string[];
  basePrice: number;
  defaultNights: number;
  sections: TourSection[];
}
