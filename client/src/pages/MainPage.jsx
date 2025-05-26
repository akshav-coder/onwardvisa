import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import HowItWorks from "../components/common/HowItWorks";
import OnwardVisasFeatures from "../components/common/OnwardVisasFeatures";
import ProjectTitle from "../components/common/ProjectTitle";
import TestimonialSlider from "../components/common/TestimonialSlider";
import TrustBadge from "../components/common/TrustBadge";
import VisaHelpCards from "../components/common/VisaHelpCards";
import flight_cloud from "../assets/flight_cloud.jpg";
import "../styles/MainPage.css";
import FormPage from "../components/common/FormPage";
import SampleUI from "../components/common/SampleUI";

const MainPage = () => {
  return (
    <div>
      <div className="top-bg-wrapper">
        <Header />
        <FormPage />
      </div>
      <TrustBadge />
      <HowItWorks />
      <OnwardVisasFeatures />
      <TestimonialSlider />
      <VisaHelpCards />
      <Footer />
      {/* <SampleUI /> */}
    </div>
  );
};

export default MainPage;
