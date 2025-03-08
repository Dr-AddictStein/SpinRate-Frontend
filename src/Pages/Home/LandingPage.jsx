import Banner from "./Component/Banner";
import ClientReviews from "./Component/ClientReviews";
import Clients from "./Component/Clients";
import CloudManagement from "./Component/CloudManagement";
import Features from "./Component/FeatureCard";
import Feedback from "./Component/Feedback";
import IntegrationCard from "./Component/IntegrationCard";
import Overview from "./Component/Overview";
import PricingCard from "./Component/PricingCard";
import QRReviewSection from "./Component/QRReviewSection";
import Setting from "./Component/Setting";
import VideoSection from "./Component/VideoSection";
import StatsSection from "./Component/StatsSection";
import CalendlySection from "./Component/CalendlySection";




const LandingPage = () => {


  return (
    <>
      <div className="">
        <Banner />
      </div>

      <div className="">
        <Features />
      </div>
      <div className="">
        <VideoSection />
      </div>

      <div className="">
        <StatsSection />
      </div>

      <div className="">
        <CloudManagement />
      </div>

      <div className="">
        <IntegrationCard />
      </div>

      <div className="">
        <ClientReviews />
      </div>

      <div className="">
        <CalendlySection />
      </div>

      <div className="">
        <PricingCard />
      </div>


      <div className="">
        <Setting />
      </div>

    </>

  );
};

export default LandingPage;