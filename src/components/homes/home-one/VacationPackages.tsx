"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import listing_data from "@/data/ListingData";
import { buildTourDetailHref } from "@/utils/tourDetailRoute";

const slider_setting = {
   slidesPerView: 2,
   slidesPerGroup: 1,
   loop: true,
   speed: 900,
   spaceBetween: 22,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   navigation: {
      prevEl: ".tg-smart-package-prev",
      nextEl: ".tg-smart-package-next",
   },
   breakpoints: {
      0: {
         slidesPerView: 1,
      },
      1200: {
         slidesPerView: 2,
      },
   },
};

const VacationPackages = () => {
   const packages = listing_data.filter((item) => item.page === "home_1").slice(0, 6);

   return (
      <section className="tg-smart-packages-area pb-90">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  <div className="tg-listing-section-title-wrap text-center mb-45">
                     <h5 className="tg-section-su-subtitle su-subtitle-2 mb-15">Best Summer Vacation Packages</h5>
                     <h2 className="tg-section-su-title text-capitalize mb-0">Handpicked packages for quick booking</h2>
                  </div>
               </div>
            </div>
            <div className="tg-smart-package-slider-wrap p-relative">
               <Swiper {...slider_setting} modules={[Autoplay, Navigation]} className="tg-smart-package-slider">
                  {packages.map((item) => (
                     <SwiperSlide key={`${item.id}-${item.title}`}>
                        <article className="tg-smart-package-card mb-25">
                           <div className="tg-smart-package-thumb">
                              <Image src={item.thumb} alt={item.title} className="w-100" />
                           </div>
                           <div className="tg-smart-package-content">
                              <h4>
                                 <Link href={buildTourDetailHref(item.title)}>{item.title}</Link>
                              </h4>
                              <p className="tg-smart-package-location">
                                 <i className="fa-regular fa-location-dot"></i> {item.location}
                              </p>
                              <div className="tg-smart-package-info">
                                 <span>
                                    <i className="fa-regular fa-clock"></i> {item.time}
                                 </span>
                                 <span>
                                    <i className="fa-regular fa-user"></i> {item.guest}
                                 </span>
                              </div>
                              <div className="tg-smart-package-price">
                                 <div>
                                    <span>Starting From</span>
                                    <strong>${item.price} / Person</strong>
                                 </div>
                                 <Link href={buildTourDetailHref(item.title)} className="tg-btn tg-btn-sm">
                                    Book Now
                                 </Link>
                              </div>
                           </div>
                        </article>
                     </SwiperSlide>
                  ))}
               </Swiper>
               <button className="tg-smart-offer-nav tg-smart-package-prev" aria-label="Previous packages">
                  <i className="fa-regular fa-arrow-left"></i>
               </button>
               <button className="tg-smart-offer-nav tg-smart-package-next" aria-label="Next packages">
                  <i className="fa-regular fa-arrow-right"></i>
               </button>
            </div>
         </div>
      </section>
   );
};

export default VacationPackages;
