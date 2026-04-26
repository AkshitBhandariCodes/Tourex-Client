"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import BannerFormOne from "@/components/common/banner-form/BannerFormOne";

const bannerThumbs = [
  "/assets/img/hero/hero-1.jpg",
  "/assets/img/hero/hero-2.jpg",
  "/assets/img/hero/hero-3.jpg",
  "/assets/img/hero/hero-4.jpg",
  "/assets/img/hero/hero-5.jpg"
];

const bookingTabs = [
  { label: "Flight", icon: "fa-light fa-plane-departure", hasArrow: false },
  { label: "Tour Packages", icon: "fa-light fa-map-location-dot", hasArrow: true },
  { label: "Hotels", icon: "fa-light fa-bed-front", hasArrow: false },
  { label: "Cruise", icon: "fa-light fa-shield-check", hasArrow: false },
  { label: "Visas", icon: "fa-light fa-globe", hasArrow: true }
];

const sliderSetting = {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 0,
  speed: 1900,
  effect: "fade" as const,
  navigation: {
    prevEl: ".tg-hero-prev",
    nextEl: ".tg-hero-next"
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  }
};

const Banner = () => {
  return (
    <div className="tg-hero-area fix p-relative tg-home-main-hero-three">
      <div className="tg-hero-top-shadow"></div>
      <div className="shop-slider-wrapper">
        <Swiper {...sliderSetting} modules={[Navigation, EffectFade, Autoplay]} className="swiper-container tg-hero-slider-active">
          {bannerThumbs.map((thumb) => (
            <SwiperSlide key={thumb} className="swiper-slide">
              <div className="tg-hero-bg">
                <div className="tg-hero-thumb" style={{ backgroundImage: `url(${thumb})` }}></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="tg-hero-content-area">
        <div className="container">
          <div className="p-relative">
            <div className="row justify-content-center">
              <div className="col-xl-11">
                <div className="tg-hero-content text-center">
                  <div className="tg-hero-title-box tg-home-main-hero-title mb-10">
                    <h2 className="tg-hero-title tg-home-main-heading wow fadeInUp" data-wow-delay=".35s" data-wow-duration=".6s">Make This Summer</h2>
                    <h3 className="tg-hero-tu-title tg-home-main-heading wow fadeInUp" data-wow-delay=".45s" data-wow-duration=".8s">Your Best Holiday</h3>
                  </div>
                  <div className="tg-home-booking-shell wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                    <ul className="tg-home-booking-tabs">
                      {bookingTabs.map((item, index) => (
                        <li key={item.label}>
                          <label>
                            <input type="radio" name="hero-main-tab" defaultChecked={index === 0} />
                            <i className={item.icon} aria-hidden="true"></i>
                            <span>{item.label}</span>
                            {item.hasArrow ? <i className="fa-light fa-angle-down" aria-hidden="true"></i> : null}
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="tg-home-booking-form">
                      <BannerFormOne />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tg-hero-bottom-shape d-none d-md-block">
        <span>
          <svg width="432" height="298" viewBox="0 0 432 298" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="line-1" opacity="0.4" d="M39.6062 428.345C4.4143 355.065 -24.2999 203.867 142.379 185.309C350.726 162.111 488.895 393.541 289.171 313.515C129.391 249.494 458.204 85.4772 642.582 11.4713" stroke="white" strokeWidth="24" />
          </svg>
        </span>
      </div>
      <div className="tg-hero-bottom-shape-2 d-none d-md-block">
        <span>
          <svg width="154" height="321" viewBox="0 0 154 321" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="line-1" opacity="0.4" d="M144.616 328.905C116.117 300.508 62.5986 230.961 76.5162 179.949C93.9132 116.184 275.231 7.44493 -65.0181 12.8762" stroke="white" strokeWidth="24" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Banner;
