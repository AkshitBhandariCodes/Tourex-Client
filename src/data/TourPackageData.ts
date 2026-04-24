import { TourPackage } from "@/types/tourPackage";
import { DEFAULT_TOUR_SLUG, toTourSlug } from "@/utils/tourDetailRoute";
import listing_data from "@/data/ListingData";

const basePackage: TourPackage = {
  id: "pkg-eid-bandos",
  slug: DEFAULT_TOUR_SLUG,
  title: "Eid Tropical Getaway at Bandos Island Resort",
  destination: "Maldives",
  currency: "SAR",
  heroImage: "/assets/img/banner/banner-5.jpg",
  imageGallery: [
    "/assets/img/tour-details/thumb-1.jpg",
    "/assets/img/tour-details/thumb-2.jpg",
    "/assets/img/tour-details/thumb-3.jpg",
    "/assets/img/tour-details/thumb-4.jpg"
  ],
  startDate: "27/05/2026",
  travelers: "2 Adults",
  durationLabel: "3 Nights",
  locationLabel: "North Male Atoll, Maldives",
  ratingLabel: "4.8 (128 reviews)",
  overview: [
    "Celebrate your holiday on a private-island style stay with clear water, white sand beaches, and fast airport transfers.",
    "The package is configurable end-to-end: flights, transfers, and hotel room selection can be changed while pricing updates instantly."
  ],
  description: [
    "Step into a tropical island retreat with smooth airport connectivity, curated stay options, and quick transfer flows made for a stress-free holiday.",
    "With configurable flights, transfers, and room categories, this trip can be customized live while preserving itinerary consistency and transparent pricing."
  ],
  highlights: [
    "Flexible flight choices with real-time package repricing.",
    "Roundtrip transfer options aligned to your selected arrival and departure.",
    "Hotel room upgrades with side-by-side price differences."
  ],
  inclusions: [
    "Accommodation in Maldives",
    "Roundtrip airport transfers",
    "Flights (optional)",
    "Activities (optional)"
  ],
  exclusions: [
    "Visa",
    "Personal expenses",
    "Early check-in and late check-out charges",
    "Anything not listed in inclusions"
  ],
  terms: [
    "Passport must be valid for at least six months from departure date.",
    "Flight or hotel modifications may incur supplier charges.",
    "In case of hotel unavailability, equivalent or higher category may be offered."
  ],
  basePrice: 10320,
  defaultNights: 3,
  sections: [
    {
      id: "flight_outbound",
      title: "Flight from Dubai to Male",
      dateLabel: "27 May",
      type: "flight",
      options: [
        {
          id: "outbound-flex-long",
          name: "Dubai (DXB) 12:50 -> Male (MLE) 17:20 (+1)",
          subtitle: "Via CMB | FlexFlight",
          provider: "FlexFlight",
          duration: "27h 30m",
          baggage: "Adult: 30kg",
          priceDelta: 1184,
          nightsImpact: 3,
          confirmationMessage: "This flight arrives one day later and can reduce your hotel nights. Continue?",
          recommendedReturnOptionId: "return-flydubai-evening",
          meta: ["Economy", "1 stop"]
        },
        {
          id: "outbound-emirates-morning",
          name: "Dubai (DXB) 04:20 -> Male (MLE) 09:30",
          subtitle: "Non-stop | Emirates EK658",
          provider: "Emirates",
          duration: "4h 10m",
          baggage: "Adult: 30kg",
          priceDelta: 6470,
          nightsImpact: 2,
          confirmationMessage: "Arrival timing changes your itinerary and stay duration to 2 nights. Continue?",
          recommendedReturnOptionId: "return-flydubai-evening",
          meta: ["Economy", "Non-stop"]
        },
        {
          id: "outbound-emirates-afternoon",
          name: "Dubai (DXB) 09:45 -> Male (MLE) 15:00",
          subtitle: "Non-stop | Emirates EK652",
          provider: "Emirates",
          duration: "4h 15m",
          baggage: "Adult: 30kg",
          priceDelta: 5930,
          nightsImpact: 3,
          recommendedReturnOptionId: "return-emirates-midday",
          meta: ["Economy", "Non-stop"]
        }
      ],
      defaultOptionId: "outbound-flex-long"
    },
    {
      id: "transfer_arrival",
      title: "Transfer from airport to hotel",
      dateLabel: "28 May",
      type: "transfer",
      options: [
        {
          id: "transfer-speedboat-shared",
          name: "Speedboat shared transfer",
          subtitle: "Airport (MLE) to resort",
          duration: "00:30",
          paxInfo: "1-9 pax",
          priceDelta: 0,
          meta: ["Luggage 1 piece"]
        },
        {
          id: "transfer-speedboat-private",
          name: "Private speedboat transfer",
          subtitle: "Direct transfer with priority boarding",
          duration: "00:25",
          paxInfo: "Up to 6 pax",
          priceDelta: 980,
          meta: ["Luggage 2 pieces"]
        }
      ],
      defaultOptionId: "transfer-speedboat-shared"
    },
    {
      id: "hotel",
      title: "Hotels in Maldives",
      dateLabel: "28 May",
      type: "hotel",
      options: [
        {
          id: "hotel-bandos-standard",
          name: "Bandos Maldives - Standard Beachfront Room",
          subtitle: "North Male Atoll",
          priceDelta: 0,
          meta: ["Breakfast included", "5-star"]
        },
        {
          id: "hotel-bandos-deluxe",
          name: "Bandos Maldives - Deluxe Ocean View",
          subtitle: "North Male Atoll",
          priceDelta: 2150,
          meta: ["Breakfast + dinner", "5-star"]
        },
        {
          id: "hotel-bandos-villa",
          name: "Bandos Maldives - Sunset Water Villa",
          subtitle: "North Male Atoll",
          priceDelta: 4920,
          meta: ["All-inclusive", "5-star"]
        }
      ],
      defaultOptionId: "hotel-bandos-standard"
    },
    {
      id: "transfer_departure",
      title: "Transfer from hotel to airport",
      dateLabel: "30 May",
      type: "transfer",
      options: [
        {
          id: "transfer-return-shared",
          name: "Speedboat shared transfer",
          subtitle: "Resort to Airport (MLE)",
          duration: "00:30",
          paxInfo: "1-9 pax",
          priceDelta: 0,
          meta: ["Luggage 1 piece"]
        },
        {
          id: "transfer-return-private",
          name: "Private speedboat transfer",
          subtitle: "Resort to Airport (MLE)",
          duration: "00:25",
          paxInfo: "Up to 6 pax",
          priceDelta: 980,
          meta: ["Luggage 2 pieces"]
        }
      ],
      defaultOptionId: "transfer-return-shared"
    },
    {
      id: "flight_return",
      title: "Flight from Male to Dubai",
      dateLabel: "30 May",
      type: "flight",
      options: [
        {
          id: "return-emirates-midday",
          name: "Male (MLE) 09:15 -> Dubai (DXB) 12:15",
          subtitle: "Non-stop | Emirates",
          provider: "Emirates",
          duration: "4h 00m",
          baggage: "Adult: 40kg",
          priceDelta: 0,
          meta: ["Economy", "Non-stop"]
        },
        {
          id: "return-flydubai-evening",
          name: "Male (MLE) 14:55 -> Dubai (DXB) 18:15",
          subtitle: "Non-stop | flydubai",
          provider: "flydubai",
          duration: "4h 20m",
          baggage: "Adult: 30kg",
          priceDelta: 2060,
          meta: ["Economy", "Non-stop"]
        }
      ],
      defaultOptionId: "return-emirates-midday"
    }
  ]
};

const additionalSlugs = [
  "vatican-museums-sistine-chapel-skip-the-line",
  "two-hour-walking-tour-of-manhattan",
  "when-you-visit-the-eternal-dubai-city",
  "day-oahu-tour-honolulu-pearl-harbor-diamond"
];

function clonePackageWithSlug(slug: string): TourPackage {
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    ...basePackage,
    id: `pkg-${slug}`,
    slug,
    title,
    sections: basePackage.sections.map((section) => ({
      ...section,
      options: section.options.map((option) => ({ ...option }))
    }))
  };
}

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : ""))
    .join(" ");
}

function toDestinationFromLocation(location: string): string {
  const firstToken = location.split(",")[0]?.trim();
  return firstToken || "Custom Destination";
}

function buildDynamicPackageBySlug(slug: string): TourPackage {
  const normalizedSlug = toTourSlug(slug);
  const listingItem = listing_data.find((item) => toTourSlug(item.title) === normalizedSlug);

  if (!listingItem) {
    return clonePackageWithSlug(normalizedSlug || DEFAULT_TOUR_SLUG);
  }

  const destination = toDestinationFromLocation(listingItem.location);
  const dynamicTitle = toTitleCase(listingItem.title);
  const dynamicDuration = listingItem.time || `${basePackage.defaultNights} Nights`;
  const dynamicRating = `${listingItem.review.toFixed(1)} (${listingItem.total_review ?? "Guest reviews"})`;

  return {
    ...basePackage,
    id: `pkg-${normalizedSlug}`,
    slug: normalizedSlug,
    title: dynamicTitle,
    destination,
    heroImage: listingItem.thumb.src,
    imageGallery: [
      listingItem.thumb.src,
      ...basePackage.imageGallery.slice(1)
    ],
    startDate: "27/05/2026",
    travelers: listingItem.guest || "2 Adults",
    durationLabel: dynamicDuration,
    locationLabel: listingItem.location,
    ratingLabel: dynamicRating,
    overview: [
      `${dynamicTitle} is a curated itinerary for ${destination}, combining transport, stay, and optional upgrades in one booking flow.`,
      `Selected offers update total package cost dynamically so you can compare value before checkout with full transparency.`
    ],
    description: [
      `This package is dynamically generated from your selected listing and adapted for ${destination}. It includes configurable options for flights, transfers, and rooms while preserving a clean itinerary sequence.`,
      `You can switch between available offers at each stage to optimize comfort and price, and the total is recalculated instantly after each confirmed change.`
    ],
    basePrice: Math.max(listingItem.price * 35, 4200),
    sections: basePackage.sections.map((section) => ({
      ...section,
      options: section.options.map((option) => ({ ...option }))
    }))
  };
}

export const tourPackages: TourPackage[] = [
  basePackage,
  ...additionalSlugs.map((slug) => buildDynamicPackageBySlug(slug))
];

export function getTourPackageBySlug(slug: string): TourPackage {
  const normalizedSlug = toTourSlug(slug);
  const exactMatch = tourPackages.find((item) => item.slug === normalizedSlug);

  if (exactMatch) {
    return exactMatch;
  }

  return buildDynamicPackageBySlug(normalizedSlug || DEFAULT_TOUR_SLUG);
}
