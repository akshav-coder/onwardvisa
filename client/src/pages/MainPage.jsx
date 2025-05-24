import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import HowItWorks from "../components/common/HowItWorks";
import OnwardVisasFeatures from "../components/common/OnwardVisasFeatures";
import ProjectTitle from "../components/common/ProjectTitle";
import TestimonialSlider from "../components/common/TestimonialSlider";
import TicketForm from "../components/common/TicketForm";
import TrustBadge from "../components/common/TrustBadge";
import VisaHelpCards from "../components/common/VisaHelpCards";
import flight_cloud from "../assets/flight_cloud.jpg";
import "../styles/MainPage.css";

const MainPage = () => {
  return (
    <div>
      <div className="top-bg-wrapper">
        <Header />
        <ProjectTitle />
        <TicketForm />
      </div>
      <div className="trust-badge-trigger">
        <TrustBadge />
      </div>
      <HowItWorks />
      <OnwardVisasFeatures />
      <TestimonialSlider />
      <VisaHelpCards />
      <Footer />
    </div>
  );
};

export default MainPage;
