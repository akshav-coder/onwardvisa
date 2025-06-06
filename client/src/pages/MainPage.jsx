import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import HowItWorks from "../components/common/HowItWorks";
import OnwardVisasFeatures from "../components/common/OnwardVisasFeatures";
import TestimonialSlider from "../components/common/TestimonialSlider";
import TrustBadge from "../components/common/TrustBadge";
import VisaHelpCards from "../components/common/VisaHelpCards";
import "../styles/MainPage.css";
import FormPage from "../components/common/FormPage";
import PricingSection from "../components/common/PricingSection";

const MainPage = () => {
  return (
    <div>
      <div className="top-bg-wrapper">
        <Header />
        <FormPage />
      </div>
      <TrustBadge />
      <PricingSection />

      <HowItWorks />
      <OnwardVisasFeatures />
      <TestimonialSlider />
      <VisaHelpCards />
      <Footer />
      {/* <SampleUI /> */}
      {/* <HotelSearch /> */}
    </div>
  );
};

export default MainPage;
