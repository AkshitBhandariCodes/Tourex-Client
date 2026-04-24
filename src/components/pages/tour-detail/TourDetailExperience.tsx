"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./TourDetailExperience.module.css";
import { TourOption, TourPackage, TourSection } from "@/types/tourPackage";

interface Props {
  tourPackage: TourPackage;
}

interface PendingSelection {
  sectionId: string;
  option: TourOption;
}

const money = (currency: string, value: number) => `${currency} ${value.toLocaleString()}`;

const getSectionOption = (section: TourSection, optionId: string): TourOption => {
  return section.options.find((item) => item.id === optionId) ?? section.options[0];
};

const TourDetailExperience = ({ tourPackage }: Props) => {
  const [selection, setSelection] = useState<Record<string, string>>(() => {
    return Object.fromEntries(tourPackage.sections.map((section) => [section.id, section.defaultOptionId]));
  });
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    return Object.fromEntries(tourPackage.sections.map((section) => [section.id, true]));
  });
  const [drawerSectionId, setDrawerSectionId] = useState<string | null>(null);
  const [isRepricing, setIsRepricing] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<PendingSelection | null>(null);

  const activeSection = useMemo(() => {
    return tourPackage.sections.find((section) => section.id === drawerSectionId) ?? null;
  }, [drawerSectionId, tourPackage.sections]);

  useEffect(() => {
    if (!activeSection && !pendingSelection) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeSection, pendingSelection]);

  const selectedDetails = useMemo(() => {
    return tourPackage.sections.map((section) => {
      const option = getSectionOption(section, selection[section.id]);
      return { section, option, enabled: enabled[section.id] || !section.optional };
    });
  }, [enabled, selection, tourPackage.sections]);

  const totalPrice = useMemo(() => {
    const addOns = selectedDetails.reduce((sum, item) => {
      if (!item.enabled) {
        return sum;
      }

      return sum + item.option.priceDelta;
    }, 0);

    return tourPackage.basePrice + addOns;
  }, [selectedDetails, tourPackage.basePrice]);

  const nights = useMemo(() => {
    const outbound = selectedDetails.find((item) => item.section.id === "flight_outbound")?.option;
    return outbound?.nightsImpact ?? tourPackage.defaultNights;
  }, [selectedDetails, tourPackage.defaultNights]);

  const applyOptionSelection = (sectionId: string, option: TourOption) => {
    setIsRepricing(true);

    setSelection((prev) => {
      const next = { ...prev, [sectionId]: option.id };

      if (sectionId === "flight_outbound" && option.recommendedReturnOptionId) {
        next.flight_return = option.recommendedReturnOptionId;
      }

      return next;
    });

    window.setTimeout(() => {
      setIsRepricing(false);
      setDrawerSectionId(null);
    }, 900);
  };

  const handleOptionPick = (sectionId: string, option: TourOption) => {
    if (option.confirmationMessage) {
      setPendingSelection({ sectionId, option });
      return;
    }

    applyOptionSelection(sectionId, option);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1>{tourPackage.title}</h1>
            <p className={styles.meta}>
              {tourPackage.destination} · {nights} nights · Dynamic itinerary and pricing
            </p>
            <div className={styles.factRow}>
              <span>Start: {tourPackage.startDate}</span>
              <span>Travellers: {tourPackage.travelers}</span>
              <span>Location: {tourPackage.locationLabel}</span>
              <span>Rating: {tourPackage.ratingLabel}</span>
            </div>
            {isRepricing ? <span className={styles.loading}>Getting best price...</span> : null}
          </div>
          <div className={styles.totalCard}>
            <p className={styles.totalLabel}>Total package</p>
            <p className={styles.totalValue}>{money(tourPackage.currency, totalPrice)}</p>
            <button className={styles.bookButton} type="button">Book now</button>
          </div>
        </div>

        <section className={styles.galleryCard}>
          <div className={styles.galleryMain}>
            <Image
              src={tourPackage.heroImage}
              alt={tourPackage.title}
              fill
              sizes="(max-width: 992px) 100vw, 1200px"
              priority
            />
          </div>
          <div className={styles.galleryGrid}>
            {tourPackage.imageGallery.map((image, index) => (
              <div key={`${image}-${index}`} className={styles.galleryThumb}>
                <Image
                  src={image}
                  alt={`${tourPackage.title} view ${index + 1}`}
                  fill
                  sizes="(max-width: 992px) 25vw, 220px"
                />
              </div>
            ))}
          </div>
        </section>

        <div className={styles.layout}>
          <div className={styles.stack}>
            <section className={styles.card}>
              <h3>Overview</h3>
              {tourPackage.overview.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </section>

            <section className={styles.card}>
              <h3>Trip information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}><span>Destination</span><strong>{tourPackage.destination}</strong></div>
                <div className={styles.infoItem}><span>Duration</span><strong>{tourPackage.durationLabel}</strong></div>
                <div className={styles.infoItem}><span>Start date</span><strong>{tourPackage.startDate}</strong></div>
                <div className={styles.infoItem}><span>Travellers</span><strong>{tourPackage.travelers}</strong></div>
              </div>
            </section>

            <section className={styles.card}>
              <h3>Highlights</h3>
              <ul>
                {tourPackage.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className={styles.card}>
              <h3>Itinerary with dynamic offers</h3>
              <div className={styles.stack}>
                {selectedDetails.map((item) => (
                  <article className={styles.timelineItem} key={item.section.id}>
                    <div className={styles.timelineHeader}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <div className={styles.datePill}>{item.section.dateLabel}</div>
                        <div>
                          <strong>{item.section.title}</strong>
                        </div>
                      </div>
                      {item.section.optional ? (
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={(event) => {
                              const checked = event.target.checked;
                              setEnabled((prev) => ({ ...prev, [item.section.id]: checked }));
                            }}
                          />
                          Include
                        </label>
                      ) : null}
                    </div>

                    {item.enabled ? (
                      <>
                        <div className={styles.optionName}>{item.option.name}</div>
                        {item.option.subtitle ? <div className={styles.meta}>{item.option.subtitle}</div> : null}
                        <div className={styles.optionMeta}>
                          {item.option.duration ? <span>{item.option.duration}</span> : null}
                          {item.option.baggage ? <span>{item.option.baggage}</span> : null}
                          {item.option.paxInfo ? <span>{item.option.paxInfo}</span> : null}
                          <span>{money(tourPackage.currency, item.option.priceDelta)} add-on</span>
                        </div>
                        <div className={styles.actions}>
                          <button type="button" className={styles.ghostBtn}>Details</button>
                          <button
                            type="button"
                            className={styles.solidBtn}
                            onClick={() => setDrawerSectionId(item.section.id)}
                          >
                            Change option
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className={styles.meta}>This module is excluded from the package.</div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <div className={styles.columnList}>
              <section className={styles.card}>
                <h3>Inclusions</h3>
                <ul>
                  {tourPackage.inclusions.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.card}>
                <h3>Exclusions</h3>
                <ul>
                  {tourPackage.exclusions.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className={styles.card}>
              <h3>Terms and conditions</h3>
              <ul>
                {tourPackage.terms.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className={styles.card}>
              <h3>Description</h3>
              {tourPackage.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </section>
          </div>

          <aside className={styles.sidebarCard}>
            <h3 style={{ marginTop: 0 }}>Trip summary</h3>
            <div className={styles.sidebarList}>
              {selectedDetails
                .filter((item) => item.enabled)
                .map((item) => (
                  <div className={styles.sidebarRow} key={item.section.id}>
                    <span>{item.section.title}</span>
                    <strong>{money(tourPackage.currency, item.option.priceDelta)}</strong>
                  </div>
                ))}
            </div>
            <div className={styles.sidebarRow}>
              <span>Base package</span>
              <strong>{money(tourPackage.currency, tourPackage.basePrice)}</strong>
            </div>
            <hr />
            <div className={styles.sidebarRow}>
              <strong>Total</strong>
              <strong>{money(tourPackage.currency, totalPrice)}</strong>
            </div>
          </aside>
        </div>
      </div>

      {activeSection ? (
        <div className={styles.drawerOverlay} onClick={() => setDrawerSectionId(null)}>
          <aside className={styles.drawer} onClick={(event) => event.stopPropagation()}>
            <div className={styles.drawerHead}>
              <h3 style={{ margin: 0 }}>Change option: {activeSection.title}</h3>
              <button type="button" className={styles.ghostBtn} onClick={() => setDrawerSectionId(null)}>
                Close
              </button>
            </div>
            {activeSection.options.map((option) => (
              <article key={option.id} className={styles.optionCard}>
                <div className={styles.optionRow}>
                  <div>
                    <strong>{option.name}</strong>
                    {option.subtitle ? <div className={styles.meta}>{option.subtitle}</div> : null}
                  </div>
                  <span className={styles.delta}>{money(tourPackage.currency, option.priceDelta)}</span>
                </div>
                <div className={styles.optionMeta} style={{ marginTop: 8 }}>
                  {option.duration ? <span>{option.duration}</span> : null}
                  {option.baggage ? <span>{option.baggage}</span> : null}
                  {option.meta?.map((line) => <span key={line}>{line}</span>)}
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.solidBtn}
                    onClick={() => handleOptionPick(activeSection.id, option)}
                    disabled={isRepricing}
                  >
                    Select this option
                  </button>
                </div>
              </article>
            ))}
          </aside>
        </div>
      ) : null}

      {pendingSelection ? (
        <div className={styles.confirmDialog}>
          <div className={styles.confirmBody}>
            <h4>Change in itinerary</h4>
            <p>{pendingSelection.option.confirmationMessage}</p>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.ghostBtn}
                onClick={() => setPendingSelection(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.solidBtn}
                onClick={() => {
                  applyOptionSelection(pendingSelection.sectionId, pendingSelection.option);
                  setPendingSelection(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TourDetailExperience;
