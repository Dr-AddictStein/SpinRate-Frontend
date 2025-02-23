import Banner from "./Component/Banner";
import Clients from "./Component/Clients";
import Feedback from "./Component/Feedback";
import Overview from "./Component/Overview";
import PricingCard from "./Component/PricingCard";
import QRReviewSection from "./Component/QRReviewSection";
import Setting from "./Component/Setting";
import VideoSection from "./Component/VideoSection";




const LandingPage = () => {


  return (
    <>
      <div className="pt-10">
        <Banner />
      </div>


      <div className="">
        <Clients />
      </div>

      <div className="pt-14">
        <VideoSection />
      </div>


      <div className="py-10">
        <Overview />
      </div>

      <div className="py-10">
        <QRReviewSection />
      </div>

      <div className="py-10">
        <Feedback />
      </div>


      <div className="py-10">

        <PricingCard />
      </div>


      <div className="py-10">

        <Setting />
      </div>

    </>

  );
};

export default LandingPage;