import React from "react";

const PricingCard = () => {
    return (
        <div className=" bg-gray-100  p-8">

            <h1 className="text-center  lg:text-3xl text-2xl pb-14 font-semibold">One simple and Affordable Plan</h1>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">

                {/* Monthly Plan */}
                <div className="relative bg-white p-6 rounded-xl shadow-md border hover:border-[#2098F3] transition duration-300 w-80">
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                        1 free month
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 text-center">Starter</h3>
                    <p className="text-2xl font-bold text-[#2098F3] mt-2 text-center">
                        €9<span className="text-sm text-gray-500">/month</span>
                    </p>
                    <ul className="mt-4  text-gray-600 space-y-2 text-sm text-center">
                        <li className="border-b pb-2">Without engagement</li>
                        <li className="border-b pb-2"> Client database access</li>
                        <li className="border-b pb-2">Unlimited Meetings</li>
                        <li className="border-b pb-2">Premium support</li>
                    </ul>
                    <button className="mt-6 cursor-pointer w-full bg-[#2098F3] text-white py-2 rounded-lg hover:bg-[#007BFF] transition">
                        Start now
                    </button>
                </div>

                {/* Yearly Plan */}
                <div className="relative bg-white p-6 rounded-xl shadow-md border hover:border-[#2098F3] transition duration-300 w-80">
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                        Yearly -25%
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 text-center">Starter Annuel</h3>
                    <p className="text-2xl font-bold text-[#2098F3] mt-2 text-center">
                        €83<span className="text-sm text-gray-500">/year</span>
                    </p>
                    <ul className="mt-4 text-gray-600 space-y-2 text-sm text-center">
                        <li className="border-b pb-2"> Without engagement</li>
                        <li className="border-b pb-2"> Client database access</li>
                        <li className="border-b pb-2"> Unlimited Meetings</li>
                        <li className="border-b pb-2"> Premium support</li>
                    </ul>
                    <button className="mt-6 cursor-pointer w-full bg-[#2098F3] text-white py-2 rounded-lg hover:bg-[#007BFF] transition">
                        Start now
                    </button>
                </div>

            </div>



        </div>
    );
};

export default PricingCard;
