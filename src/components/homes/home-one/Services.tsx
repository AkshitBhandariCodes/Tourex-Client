"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const service_data = [
   { id: 1, title: "Cruise", image: "/assets/img/chose/chose-5/chose-1.jpg", href: "/tour-grid-1" },
   { id: 2, title: "Hotel Booking", image: "/assets/img/location/location-5/location.jpg", href: "/hotel-grid" },
   { id: 3, title: "Bus / Train Tickets", image: "/assets/img/chose/chose-4/chose.jpg", href: "/contact" },
   { id: 4, title: "Passport Services", image: "/assets/img/blog/details/video.jpg", href: "/contact" },
   { id: 5, title: "Document Attestation", image: "/assets/img/about/details/thumb-2.jpg", href: "/contact" },
   { id: 6, title: "Travel Insurance", image: "/assets/img/cta/banner.jpg", href: "/contact" },
];

const slider_setting = {
   slidesPerView: 5,
   slidesPerGroup: 1,
   loop: true,
   speed: 850,
   spaceBetween: 2,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   breakpoints: {
      0: { slidesPerView: 1.3 },
      576: { slidesPerView: 2.1 },
      768: { slidesPerView: 3.1 },
      1200: { slidesPerView: 5 },
      1600: { slidesPerView: 6 },
   },
};

const Services = () => {
   return (
      <section className="tg-smart-services-area pb-95">
         <div className="container-fluid px-0">
            <div className="row justify-content-center g-0">
               <div className="col-xl-12">
                  <div className="tg-listing-section-title-wrap text-center mb-35">
                     <h5 className="tg-section-su-subtitle su-subtitle-2 mb-15">Services</h5>
                     <h2 className="tg-section-su-title text-capitalize mb-0">Everything for a smooth journey</h2>
                  </div>
               </div>
            </div>
            <Swiper {...slider_setting} modules={[Autoplay]} className="tg-smart-services-slider">
               {service_data.map((item) => (
                  <SwiperSlide key={item.id}>
                     <article className="tg-smart-service-card">
                        <Image src={item.image} alt={item.title} width={420} height={500} className="w-100 h-100" />
                        <div className="tg-smart-service-content">
                           <Link href={item.href}>{item.title}</Link>
                        </div>
                     </article>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </section>
   );
};

export default Services;
