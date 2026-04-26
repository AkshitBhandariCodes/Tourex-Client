"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TourDetailExperience.module.css";
import { TourOption, TourPackage, TourSection } from "@/types/tourPackage";

type TabKey = "summary" | "information" | "terms" | "itinerary" | "activities";
type StepKey = "search_results" | "add_on" | "traveler_details" | "payment";

interface Props {
  tourPackage: TourPackage;
  step?: StepKey;
}

interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
  qty: number;
}

interface PassengerForm {
  title: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentId: string;
  nationality: string;
}

interface HotelOptionItem {
  id: string;
  name: string;
  score: number;
  reviews: number;
  address: string;
  image: string;
}

const tabs: { id: TabKey; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "information", label: "Information" },
  { id: "terms", label: "Terms And Conditions" },
  { id: "itinerary", label: "Itinerary" },
  { id: "activities", label: "Activities" }
];

const steps: { id: StepKey; label: string; icon: string }[] = [
  { id: "search_results", label: "Search Results", icon: "fa-light fa-chart-line-up" },
  { id: "add_on", label: "Add On", icon: "fa-light fa-receipt" },
  { id: "traveler_details", label: "Traveler Details", icon: "fa-light fa-user-group" },
  { id: "payment", label: "Payment", icon: "fa-light fa-credit-card" }
];

const money = (currency: string, value: number) => `${currency}${value.toLocaleString()}`;

const getSectionOption = (section: TourSection, optionId: string): TourOption => {
  return section.options.find((item) => item.id === optionId) ?? section.options[0];
};

const toCount = (value: string): number => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2;
};

const sectionIcon = (type: TourSection["type"]) => {
  if (type === "flight") return "fa-light fa-plane";
  if (type === "hotel") return "fa-light fa-bed-front";
  if (type === "transfer") return "fa-light fa-car-side";
  return "fa-light fa-map";
};

const TourDetailExperience = ({ tourPackage, step = "search_results" }: Props) => {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(tourPackage.sections.map((section) => [section.id, section.defaultOptionId]))
  );
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(tourPackage.sections.map((section) => [section.id, true]))
  );
  const [tripModalOpen, setTripModalOpen] = useState(false);
  const [changeSectionId, setChangeSectionId] = useState<string | null>(null);
  const [hotelModalOpen, setHotelModalOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isRepricing, setIsRepricing] = useState(false);
  const [nightCount, setNightCount] = useState(tourPackage.defaultNights);

  const [addOns, setAddOns] = useState<AddOnItem[]>([
    { id: "a1", name: "Airport Lounge Access", description: "DXB & MLE lounge access for each traveler.", price: 220, selected: true, qty: 2 },
    { id: "a2", name: "Travel Insurance", description: "Comprehensive trip coverage.", price: 180, selected: false, qty: 2 },
    { id: "a3", name: "Priority Fast Track", description: "Immigration fast-track on departure and arrival.", price: 160, selected: false, qty: 2 }
  ]);

  const [contact, setContact] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "India"
  });

  const passengerCount = toCount(tourPackage.travelers);
  const [passengers, setPassengers] = useState<PassengerForm[]>(
    Array.from({ length: passengerCount }).map(() => ({
      title: "Mr",
      firstName: "",
      lastName: "",
      documentType: "Passport",
      documentId: "",
      nationality: "India"
    }))
  );

  const summaryRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLElement | null>(null);
  const termsRef = useRef<HTMLElement | null>(null);
  const itineraryRef = useRef<HTMLElement | null>(null);
  const activitiesRef = useRef<HTMLElement | null>(null);
  const searchStepRef = useRef<HTMLElement | null>(null);
  const itineraryCardRefs = useRef<Record<string, HTMLElement | null>>({});

  const selectedDetails = useMemo(() => {
    return tourPackage.sections.map((section) => {
      const option = getSectionOption(section, selection[section.id]);
      return { section, option, enabled: enabled[section.id] || !section.optional };
    });
  }, [enabled, selection, tourPackage.sections]);

  const timelineItems = useMemo(() => selectedDetails.filter((item) => item.enabled), [selectedDetails]);

  const basePriceWithNights = useMemo(() => {
    const diff = nightCount - tourPackage.defaultNights;
    return tourPackage.basePrice + diff * 880;
  }, [nightCount, tourPackage.basePrice, tourPackage.defaultNights]);

  const addOnTotal = useMemo(() => {
    return addOns.reduce((sum, item) => (item.selected ? sum + item.price * item.qty : sum), 0);
  }, [addOns]);

  const totalPrice = useMemo(() => {
    const sectionTotal = selectedDetails.reduce((sum, item) => (item.enabled ? sum + item.option.priceDelta : sum), 0);
    return basePriceWithNights + sectionTotal + addOnTotal;
  }, [addOnTotal, basePriceWithNights, selectedDetails]);

  const galleryImages = useMemo(() => {
    const imgs = [tourPackage.heroImage, ...tourPackage.imageGallery];
    return imgs.length ? imgs : ["/assets/img/hero/hero-1.jpg"];
  }, [tourPackage.heroImage, tourPackage.imageGallery]);

  const topGallery = useMemo(() => {
    const picks = [...galleryImages];
    while (picks.length < 7) picks.push(galleryImages[picks.length % galleryImages.length]);
    return picks.slice(0, 7);
  }, [galleryImages]);

  const activeSection = useMemo(() => {
    if (!changeSectionId) return null;
    return tourPackage.sections.find((item) => item.id === changeSectionId) ?? null;
  }, [changeSectionId, tourPackage.sections]);

  const hotels: HotelOptionItem[] = useMemo(
    () => [
      { id: "h1", name: "The Somerset Hotel", score: 4.0, reviews: 436, address: "M. Melaa, Keneree Magu, Male, 20191, MV", image: "/assets/img/listing/listing-2/listing-8.jpg" },
      { id: "h2", name: "H78 Maldives", score: 4.5, reviews: 108, address: "Plot 11049, Nirolhu Magu, Hulhumale, 23000, MV", image: "/assets/img/listing/listing-2/listing-7.jpg" },
      { id: "h3", name: "Hotel Ocean Grand at Hulhumale", score: 4.5, reviews: 474, address: "LOT 10717, Kaani Magu, Hulhumale, 23000, MV", image: "/assets/img/listing/listing-2/listing-6.jpg" }
    ],
    []
  );

  useEffect(() => {
    if (!tripModalOpen && !changeSectionId && !galleryOpen && !hotelModalOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [changeSectionId, galleryOpen, hotelModalOpen, tripModalOpen]);

  const runRepricing = (onDone?: () => void) => {
    setIsRepricing(true);
    window.setTimeout(() => {
      setIsRepricing(false);
      onDone?.();
    }, 850);
  };

  const sectionByTab: Record<TabKey, React.RefObject<HTMLElement | null>> = {
    summary: summaryRef,
    information: infoRef,
    terms: termsRef,
    itinerary: itineraryRef,
    activities: activitiesRef
  };

  const scrollToTab = (tab: TabKey) => {
    setActiveTab(tab);
    sectionByTab[tab].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyContactToLead = () => {
    setPassengers((prev) =>
      prev.map((item, index) => (index === 0 ? { ...item, title: contact.title, firstName: contact.firstName, lastName: contact.lastName, nationality: contact.country } : item))
    );
  };

  const setPassengerField = (index: number, field: keyof PassengerForm, value: string) => {
    setPassengers((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
  };

  const stepPaths: Record<StepKey, string> = {
    search_results: `/tour-detail/${tourPackage.slug}`,
    add_on: `/tour-detail/${tourPackage.slug}/add-on`,
    traveler_details: `/tour-detail/${tourPackage.slug}/traveler-details`,
    payment: `/tour-detail/${tourPackage.slug}/payment`
  };

  const isSearchStep = step === "search_results";
  const isAddOnStep = step === "add_on";
  const isTravelerStep = step === "traveler_details";
  const isPaymentStep = step === "payment";

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.stepper} ref={searchStepRef}>
          {steps.map((item) => (
            <Link key={item.id} href={stepPaths[item.id]} className={`${styles.stepButton} ${item.id === step ? styles.stepButtonActive : ""}`}>
              <span><i className={item.icon} aria-hidden="true"></i></span>
              <strong>{item.label}</strong>
            </Link>
          ))}
        </section>

        {isSearchStep ? (
          <>
            <section className={styles.galleryTop}>
              <button type="button" className={styles.galleryHero} onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}>
                <Image src={topGallery[0]} alt="Gallery Hero" fill sizes="(max-width: 992px) 100vw, 48vw" />
              </button>
              <div className={styles.galleryGrid}>
                {topGallery.slice(1).map((item, index) => (
                  <button key={`${item}-${index}`} type="button" className={styles.galleryTile} onClick={() => { setGalleryIndex(index + 1); setGalleryOpen(true); }}>
                    <Image src={item} alt={`Gallery ${index + 2}`} fill sizes="(max-width: 992px) 48vw, 16vw" />
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.subnavSticky}>
              <div className={styles.subnavTabs}>
                {tabs.map((tab) => (
                  <button key={tab.id} type="button" className={`${styles.subnavTab} ${activeTab === tab.id ? styles.subnavTabActive : ""}`} onClick={() => scrollToTab(tab.id)}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className={styles.subnavTotal}>
                <div>
                  <strong>{money(tourPackage.currency, totalPrice)}</strong>
                  <span>Total</span>
                </div>
                <Link href={stepPaths.add_on}>Book</Link>
              </div>
            </section>
          </>
        ) : null}

        <div className={styles.layout}>
          <main className={styles.main}>
            {isSearchStep ? (
              <>
                <section className={styles.card} ref={summaryRef}>
                  <div className={styles.cardHead}>
                    <h1>{tourPackage.title}</h1>
                    <button type="button" className={styles.redGhostBtn} onClick={() => setTripModalOpen(true)}>Edit</button>
                  </div>
                  <div className={styles.infoPills}>
                    <span>From {money(tourPackage.currency, totalPrice)}</span>
                    <span>{tourPackage.travelers}</span>
                    <span>{tourPackage.startDate}</span>
                    <span>{nightCount} nights</span>
                  </div>
                  {tourPackage.overview.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </section>

                <section className={styles.card} ref={infoRef}>
                  <h2>Information</h2>
                  <div className={styles.infoTwoCol}>
                    <div>
                      <h3>Highlights</h3>
                      <ul>{tourPackage.highlights.map((line) => <li key={line}>{line}</li>)}</ul>
                    </div>
                    <div>
                      <h3>Inclusions</h3>
                      <ul>{tourPackage.inclusions.map((line) => <li key={line}>{line}</li>)}</ul>
                      <h3>Exclusions</h3>
                      <ul>{tourPackage.exclusions.map((line) => <li key={line}>{line}</li>)}</ul>
                    </div>
                  </div>
                </section>

                <section className={styles.card} ref={termsRef}>
                  <h2>Terms And Conditions</h2>
                  <ul>{tourPackage.terms.map((line) => <li key={line}>{line}</li>)}</ul>
                </section>

                <section className={styles.card} ref={itineraryRef}>
                  <h2>Itinerary</h2>
                  {timelineItems.map((item, index) => (
                    <article key={item.section.id} className={styles.itineraryBlock} ref={(node) => { itineraryCardRefs.current[item.section.id] = node; }}>
                      <div className={styles.blockHead}>
                        <div className={styles.blockDate}>{item.section.dateLabel}</div>
                        <h3>{item.section.title}</h3>
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={(event) => setEnabled((prev) => ({ ...prev, [item.section.id]: event.target.checked }))}
                          />
                        </label>
                      </div>

                      <div className={styles.blockBody}>
                        <div className={styles.blockThumb}>
                          <Image src={galleryImages[(index + 1) % galleryImages.length]} alt={item.section.title} fill sizes="160px" />
                        </div>
                        <div className={styles.blockContent}>
                          <strong>{item.option.name}</strong>
                          {item.option.subtitle ? <p>{item.option.subtitle}</p> : null}
                          <div className={styles.metaLine}>
                            {item.option.duration ? <span>{item.option.duration}</span> : null}
                            {item.option.paxInfo ? <span>{item.option.paxInfo}</span> : null}
                            {item.option.baggage ? <span>{item.option.baggage}</span> : null}
                          </div>
                        </div>
                        <div className={styles.blockActions}>
                          <button type="button" className={styles.ghostBtn}>Details</button>
                          <button type="button" className={styles.redBtn} onClick={() => setChangeSectionId(item.section.id)}>Change Option</button>
                          {item.section.type === "hotel" ? <button type="button" className={styles.redBtnSoft} onClick={() => setHotelModalOpen(true)}>More Hotels</button> : null}
                          <span className={styles.selected}>Selected</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>

                <section className={styles.card} ref={activitiesRef}>
                  <h2>Activities</h2>
                  <p>Optional island activities can be added in Add On. Pricing updates instantly.</p>
                  {isRepricing ? <p className={styles.loading}>Getting Best Price...</p> : null}
                </section>
              </>
            ) : null}

            {isAddOnStep ? (
              <section className={styles.card}>
                <div className={styles.sectionTitle}>
                  <h2>Add On</h2>
                  <p>Choose extras to personalize the trip.</p>
                </div>
                <div className={styles.addOnGrid}>
                  {addOns.map((item) => (
                    <article key={item.id} className={styles.addOnCard}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <strong>{money(tourPackage.currency, item.price)}</strong>
                      </div>
                      <div className={styles.addOnControl}>
                        <label>
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={(event) => setAddOns((prev) => prev.map((row) => (row.id === item.id ? { ...row, selected: event.target.checked } : row)))}
                          />
                          Include
                        </label>
                        <div>
                          <button type="button" onClick={() => setAddOns((prev) => prev.map((row) => (row.id === item.id ? { ...row, qty: Math.max(1, row.qty - 1) } : row)))}>-</button>
                          <span>{item.qty}</span>
                          <button type="button" onClick={() => setAddOns((prev) => prev.map((row) => (row.id === item.id ? { ...row, qty: row.qty + 1 } : row)))}>+</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className={styles.flowCtaRow}>
                  <Link href={stepPaths.traveler_details} className={styles.redBtn}>Continue To Traveler Details</Link>
                </div>
              </section>
            ) : null}

            {isTravelerStep ? (
              <section className={styles.card}>
                <div className={styles.sectionTitle}>
                  <h2>Contact and Traveler Details</h2>
                  <p>Names should match government-issued documents.</p>
                </div>

                <article className={styles.formCard}>
                  <h3>Contact</h3>
                  <div className={styles.formGridThree}>
                    <label>
                      Title
                      <select value={contact.title} onChange={(event) => setContact((prev) => ({ ...prev, title: event.target.value }))}>
                        <option>Mr</option>
                        <option>Ms</option>
                        <option>Mrs</option>
                      </select>
                    </label>
                    <label>
                      First Name
                      <input type="text" value={contact.firstName} onChange={(event) => setContact((prev) => ({ ...prev, firstName: event.target.value }))} />
                    </label>
                    <label>
                      Last Name
                      <input type="text" value={contact.lastName} onChange={(event) => setContact((prev) => ({ ...prev, lastName: event.target.value }))} />
                    </label>
                    <label>
                      Email
                      <input type="email" value={contact.email} onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))} />
                    </label>
                    <label>
                      Phone
                      <input type="tel" value={contact.phone} onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))} />
                    </label>
                    <label>
                      Country
                      <input type="text" value={contact.country} onChange={(event) => setContact((prev) => ({ ...prev, country: event.target.value }))} />
                    </label>
                  </div>
                </article>

                {passengers.map((passenger, idx) => (
                  <article key={`traveler-${idx + 1}`} className={styles.formCard}>
                    <div className={styles.formCardHead}>
                      <h3>{idx === 0 ? "Lead Passenger" : `Traveler ${idx + 1}`}</h3>
                      {idx === 0 ? <button type="button" className={styles.redBtnSoft} onClick={copyContactToLead}>Copy From Contact</button> : null}
                    </div>
                    <div className={styles.formGridThree}>
                      <label>
                        Title
                        <select value={passenger.title} onChange={(event) => setPassengerField(idx, "title", event.target.value)}>
                          <option>Mr</option>
                          <option>Ms</option>
                          <option>Mrs</option>
                        </select>
                      </label>
                      <label>
                        First Name
                        <input type="text" value={passenger.firstName} onChange={(event) => setPassengerField(idx, "firstName", event.target.value)} />
                      </label>
                      <label>
                        Last Name
                        <input type="text" value={passenger.lastName} onChange={(event) => setPassengerField(idx, "lastName", event.target.value)} />
                      </label>
                      <label>
                        Document Type
                        <select value={passenger.documentType} onChange={(event) => setPassengerField(idx, "documentType", event.target.value)}>
                          <option>Passport</option>
                          <option>National ID</option>
                        </select>
                      </label>
                      <label>
                        Document ID
                        <input type="text" value={passenger.documentId} onChange={(event) => setPassengerField(idx, "documentId", event.target.value)} />
                      </label>
                      <label>
                        Nationality
                        <input type="text" value={passenger.nationality} onChange={(event) => setPassengerField(idx, "nationality", event.target.value)} />
                      </label>
                    </div>
                  </article>
                ))}
                <div className={styles.flowCtaRow}>
                  <Link href={stepPaths.payment} className={styles.redBtn}>Continue To Payment</Link>
                </div>
              </section>
            ) : null}

            {isPaymentStep ? (
              <section className={styles.card}>
                <div className={styles.sectionTitle}>
                  <h2>Payment</h2>
                  <p>Secure checkout with card details.</p>
                </div>
                <div className={styles.paymentLayout}>
                  <article className={styles.formCard}>
                    <h3>Card Details</h3>
                    <div className={styles.formGridTwo}>
                      <label>Cardholder Name<input type="text" /></label>
                      <label>Card Number<input type="text" placeholder="1234 5678 9012 3456" /></label>
                      <label>Expiry<input type="text" placeholder="MM/YY" /></label>
                      <label>CVV<input type="password" /></label>
                    </div>
                    <label className={styles.checkLine}>
                      <input type="checkbox" />
                      I accept Terms And Conditions.
                    </label>
                  </article>
                  <aside className={styles.paySummary}>
                    <h3>Payment Summary</h3>
                    <div>
                      <span>Trip + Options</span>
                      <strong>{money(tourPackage.currency, totalPrice - addOnTotal)}</strong>
                    </div>
                    <div>
                      <span>Add On Total</span>
                      <strong>{money(tourPackage.currency, addOnTotal)}</strong>
                    </div>
                    <div className={styles.payTotal}>
                      <span>Total</span>
                      <strong>{money(tourPackage.currency, totalPrice)}</strong>
                    </div>
                    <button type="button" className={styles.payNowBtn}>Pay Now</button>
                  </aside>
                </div>
              </section>
            ) : null}
          </main>

          <aside className={styles.ticketWrap}>
            <h3>Ticket Overview</h3>
            <div className={styles.ticketCard}>
              <div className={styles.ticketDateStrip}>
                {timelineItems.map((item) => (
                  <span key={`date-${item.section.id}`}>{item.section.dateLabel}</span>
                ))}
              </div>
              <div className={styles.ticketBody}>
                <div className={styles.ticketCity}>Dubai</div>
                {timelineItems.map((item) => (
                  <button
                    key={`ticket-${item.section.id}`}
                    type="button"
                    className={styles.ticketItem}
                    onClick={() => {
                      if (isSearchStep) itineraryCardRefs.current[item.section.id]?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <div className={styles.ticketItemTitle}>
                      <i className={sectionIcon(item.section.type)} aria-hidden="true"></i>
                      <strong>{item.section.title}</strong>
                    </div>
                    <p>{item.option.name}</p>
                    {item.option.subtitle ? <small>{item.option.subtitle}</small> : null}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {tripModalOpen ? (
        <div className={styles.overlay} onClick={() => setTripModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHead}>
              <h3>Your Trips Details</h3>
              <button type="button" className={styles.ghostBtn} onClick={() => setTripModalOpen(false)}>Close</button>
            </div>
            <div className={styles.modalFields}>
              <div>Dubai (DXB - Dubai Intl.)</div>
              <div>Cabin Class: Economy</div>
              <div>Departure Date: {tourPackage.startDate}</div>
              <div>Traveler(s): 1 Room, {passengerCount} Adults</div>
              <div className={styles.nightsField}>
                <span>Maldives (nights)</span>
                <div>
                  <button type="button" disabled={nightCount <= 2} onClick={() => setNightCount((prev) => prev - 1)}>-</button>
                  <strong>{nightCount}</strong>
                  <button type="button" onClick={() => setNightCount((prev) => prev + 1)}>+</button>
                </div>
              </div>
            </div>
            <button type="button" className={styles.redBtn} onClick={() => runRepricing(() => setTripModalOpen(false))}>Submit</button>
          </div>
        </div>
      ) : null}

      {activeSection ? (
        <div className={styles.overlay} onClick={() => setChangeSectionId(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHead}>
              <h3>Change Option</h3>
              <button type="button" className={styles.ghostBtn} onClick={() => setChangeSectionId(null)}>Close</button>
            </div>
            <div className={styles.optionList}>
              {activeSection.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={styles.optionItem}
                  onClick={() => {
                    runRepricing(() => {
                      setSelection((prev) => ({ ...prev, [activeSection.id]: option.id }));
                      setChangeSectionId(null);
                    });
                  }}
                >
                  <div>
                    <strong>{option.name}</strong>
                    {option.subtitle ? <p>{option.subtitle}</p> : null}
                  </div>
                  <span>{money(tourPackage.currency, option.priceDelta)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {hotelModalOpen ? (
        <div className={styles.overlay} onClick={() => setHotelModalOpen(false)}>
          <div className={styles.hotelModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHead}>
              <h3>Your stay in Maldives</h3>
              <button type="button" className={styles.ghostBtn} onClick={() => setHotelModalOpen(false)}>Close</button>
            </div>
            <div className={styles.hotelList}>
              {hotels.map((hotel) => (
                <article key={hotel.id} className={styles.hotelItem}>
                  <div className={styles.hotelThumb}>
                    <Image src={hotel.image} alt={hotel.name} fill sizes="210px" />
                  </div>
                  <div>
                    <h4>{hotel.name}</h4>
                    <p>{hotel.address}</p>
                    <small>{hotel.score.toFixed(1)} | {hotel.reviews} reviews</small>
                  </div>
                  <div className={styles.hotelPrice}>Getting Best Price...</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {galleryOpen ? (
        <div className={styles.overlay} onClick={() => setGalleryOpen(false)}>
          <div className={styles.galleryModal} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.galleryArrow} onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}>{"<"}</button>
            <div className={styles.galleryMain}>
              <Image src={galleryImages[galleryIndex]} alt={`Gallery ${galleryIndex + 1}`} fill sizes="(max-width: 992px) 100vw, 1120px" />
            </div>
            <button type="button" className={styles.galleryArrow} onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}>{">"}</button>
            <div className={styles.galleryThumbs}>
              {galleryImages.map((img, idx) => (
                <button key={`${img}-${idx}`} type="button" className={idx === galleryIndex ? styles.galleryThumbActive : styles.galleryThumb} onClick={() => setGalleryIndex(idx)}>
                  <Image src={img} alt={`Thumb ${idx + 1}`} fill sizes="96px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TourDetailExperience;
