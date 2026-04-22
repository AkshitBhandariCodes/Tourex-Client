import HeaderOne from "@/layouts/headers/HeaderOne"
import Banner from "./Banner"
import FooterOne from "@/layouts/footers/FooterOne"
import Location from "./Location"
import About from "./About"
import Process from "./Process"
import Testimonial from "./Testimonial"
import Blog from "./Blog"
import Cta from "./Cta"
import SpecialOffers from "./SpecialOffers"
import VacationPackages from "./VacationPackages"
import Services from "./Services"
import HappyTravelers from "./HappyTravelers"

const HomeOne = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <Banner />
            <SpecialOffers />
            <VacationPackages />
            <Services />
            <HappyTravelers />
            <Location />
            <About />
            <Process />
            <Testimonial />
            <Blog style={false} />
            <Cta />
         </main>
         <FooterOne />
      </>
   )
}

export default HomeOne
