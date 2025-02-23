import React from "react";
import mobile from '../../../assets/mobile.png';
import bgImage from '../../../assets/banner.png';
const Banner = () => {
    return (
        <section
            className=" py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }} // Inline style for background image
        >
            {/* Left Side: Text Content */}
            <div className="md:w-1/2 text-center md:text-left space-y-3">
                <h1 className="font-bold md:text-2xl text-xl text-[#FF8684]">REINVENT THE WHEEL</h1>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    Boost your <br />
                    <span className="text-[#FF8684]">Google Reviews</span> by gamification
                </h1>
                <p className="text-lg text-gray-200">
                    We’ve revolutionized the way businesses gather Google Reviews and boost their
                    online presence. Our innovative concept allows stores to engage their customers
                    through a fun and rewarding experience while enhancing their digital footprint on Google.
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    <button className="bg-[#FF8684] cursor-pointer text-white font-bold px-6 py-3 rounded-md shadow-md hover:bg-pink-500 transition">
                        Start free trial
                    </button>
                    <p className="text-sm text-gray-300 mt-2 md:mt-0">1 free month | without commitment</p>
                </div>
            </div>

            {/* Right Side: Mobile Mockups */}
            <div className=" w-full  flex -ml-[230px] items-center  justify-center lg:mt-8 md:mt-0">
                <img
                    src={mobile}
                    alt="Mobile App Preview"
                />
            </div>
        </section>
    );
};

export default Banner;
