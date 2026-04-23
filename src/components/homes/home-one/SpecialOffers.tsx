"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import listing_data from "@/data/ListingData";

const slider_setting = {
   slidesPerView: 4,
   slidesPerGroup: 1,
   loop: true,
   speed: 900,
   spaceBetween: 18,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   navigation: {
      prevEl: ".tg-smart-offer-prev",
      nextEl: ".tg-smart-offer-next",
   },
   breakpoints: {
      0: {
         slidesPerView: 1,
      },
      640: {
         slidesPerView: 2,
      },
      992: {
         slidesPerView: 3,
      },
      1200: {
         slidesPerView: 4,
      },
   },
};

const SpecialOffers = () => {
   const offers = listing_data.filter((item) => item.page === "home_1").slice(0, 5);

   return (
      <section className="tg-smart-offers-area pt-110 pb-80">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  <div className="tg-listing-section-title-wrap text-center mb-45">
                     <h5 className="tg-section-su-subtitle su-subtitle-2 mb-15">Special Offers</h5>
                     <h2 className="tg-section-su-title text-capitalize mb-0">Deals curated for your next trip</h2>
                  </div>
               </div>
            </div>
            <div className="tg-smart-slider-wrap p-relative">
               <Swiper {...slider_setting} modules={[Autoplay, Navigation]} className="tg-smart-offer-slider">
                  {offers.map((item) => (
                     <SwiperSlide key={`${item.id}-${item.title}`}>
                        <article className="tg-smart-offer-card mb-30">
                           <div className="tg-smart-offer-thumb">
                              <Image src={item.thumb} alt={item.title} className="w-100" />
                           </div>
                           <div className="tg-smart-offer-content">
                              <h4>{item.title}</h4>
                              <div className="tg-smart-offer-meta">
                                 <span>Starts from</span>
                                 <strong>${item.price}</strong>
                              </div>
                              <Link href="/tour-details" className="tg-btn tg-btn-sm">
                                 Book Now
                              </Link>
                           </div>
                        </article>
                     </SwiperSlide>
                  ))}
               </Swiper>
               <button className="tg-smart-offer-nav tg-smart-offer-prev" aria-label="Previous offers">
                  <i className="fa-regular fa-arrow-left"></i>
               </button>
               <button className="tg-smart-offer-nav tg-smart-offer-next" aria-label="Next offers">
                  <i className="fa-regular fa-arrow-right"></i>
               </button>
            </div>
         </div>
      </section>
   );
};

export default SpecialOffers;
