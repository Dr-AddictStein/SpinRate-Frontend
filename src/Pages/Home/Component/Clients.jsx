import React from "react";
import Marquee from "react-fast-marquee";
import red from '../../../assets/red.png'
const Clients = () => {
    return (
        <div className="overflow-hidden bg-white py-5 px-4">
            <div className="container mx-auto max-w-screen-lg">
                <h2 className="text-center  lg:text-2xl pb-4  text-lg font-semibold">
                    This month, our clients already reached an average of <br />
                    <span className="text-lg text-[#2098F3] sm:text-xl md:text-2xl font-bold">
                        +300 Google Reviews
                    </span>
                </h2>

                {/* Marquee Section */}
                <Marquee speed={50} pauseOnHover={true} className="mt-5">
                    <img src={red} alt="Escape Hunt" className="h-12 sm:h-16 md:h-20 mx-4 sm:mx-6 md:mx-10 w-auto object-contain" />
                    <img src={red} alt="Buffalo Grill" className="h-12 sm:h-16 md:h-20 mx-4 sm:mx-6 md:mx-10 w-auto object-contain" />
                    <img src={red} alt="Frog" className="h-12 sm:h-16 md:h-20 mx-4 sm:mx-6 md:mx-10 w-auto object-contain" />
                    <img src={red} alt="Virtual Center" className="h-12 sm:h-16 md:h-20 mx-4 sm:mx-6 md:mx-10 w-auto object-contain" />
                </Marquee>
            </div>
        </div>
    );
};

export default Clients;
