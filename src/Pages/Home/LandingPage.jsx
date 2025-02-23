import Banner from "./Component/Banner";
import Clients from "./Component/Clients";




const LandingPage = () => {


  return (
    <>
      <div className="pt-10">
        <Banner />
      </div>


      <div className="pt-10">
        <Clients />
      </div>

    </>

  );
};

export default LandingPage;