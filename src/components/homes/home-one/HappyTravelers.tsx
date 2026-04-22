import Image from "next/image";

type GalleryItem = {
   image: string;
};

const gallery_data: GalleryItem[] = [
   { image: "/assets/img/location/location-2/thumb.jpg" },
   { image: "/assets/img/location/location-2/thumb-2.jpg" },
   { image: "/assets/img/location/location-2/thumb-3.jpg" },
   { image: "/assets/img/location/location-2/thumb-4.jpg" },
   { image: "/assets/img/chose/chose-3/thumb-1.jpg" },
   { image: "/assets/img/chose/chose-3/thumb-2.jpg" },
   { image: "/assets/img/about/details/thumb-3.jpg" },
   { image: "/assets/img/chose/chose-2/thumb-2.jpg" },
   { image: "/assets/img/chose/chose-2/thumb-3.jpg" },
   { image: "/assets/img/chose/chose-5/chose-2.jpg" },
   { image: "/assets/img/chose/chose-5/chose-3.jpg" },
   { image: "/assets/img/chose/chose-4/chose.jpg" },
   { image: "/assets/img/tour-details/details-2/slider-big-1.jpg" },
   { image: "/assets/img/tour-details/details-2/slider-big-6.jpg" },
   { image: "/assets/img/chose/chose-5/chose-1.jpg" },
   { image: "/assets/img/location/location-5/location.jpg" },
   { image: "/assets/img/chose/chose-4/chose-2.jpg" },
   { image: "/assets/img/ads/destination-1.jpg" },
   { image: "/assets/img/ads/destination-2.jpg" },
   { image: "/assets/img/ads/destination-3.jpg" },
];

const HappyTravelers = () => {
   return (
      <section className="tg-happy-travelers-area pb-110">
         <div className="container-fluid px-xl-4 px-2">
            <div className="row justify-content-center">
               <div className="col-xl-7 col-lg-9">
                  <div className="tg-listing-section-title-wrap text-center mb-20">
                     <h5 className="tg-section-su-subtitle su-subtitle-2 mb-15">Our Happy Travelers</h5>
                     <h2 className="tg-section-su-title text-capitalize mb-10">Joyful Moments Shared By Our Customers</h2>
                     <p className="tg-smart-subtext mb-0">
                        A collection of real memories from trips planned and booked with us.
                     </p>
                  </div>
               </div>
            </div>
            <div className="tg-happy-travelers-shell">
               <div className="tg-happy-travelers-grid">
                  {gallery_data.map((item, index) => (
                     <div className="tg-happy-travelers-item" key={`${item.image}-${index}`}>
                        <Image src={item.image} alt="Happy traveler" width={560} height={640} className="w-100" />
                        {index === 1 && (
                           <button className="tg-happy-travelers-play" aria-label="Play traveler video">
                              <i className="fa-solid fa-play"></i>
                           </button>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default HappyTravelers;
