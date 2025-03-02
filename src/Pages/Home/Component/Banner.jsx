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
                <h1 className="font-bold md:text-2xl text-xl text-white"> Increase
                    your Google Reviews without doing anything</h1>
                <h1 className="text-3xl text-white md:text-5xl font-bold leading-tight">
                    Boost your <br />
                    <span className="text-white">Google Reviews with Gamification</span >
                </h1>
                <p className="text-lg text-gray-200">
                    We've transformed how
                    businesses collect Google Reviews and strengthen their online visibility. Our
                    groundbreaking approach enables you to captivate customers with an engaging and
                    rewarding experience while amplifying their digital presence on Google.
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    <button className="bg-[#FF8684] cursor-pointer text-white font-bold px-6 py-3 rounded-md shadow-md hover:bg-[#e2b0b0] transition">
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
