import { Flame, CheckCircle } from "lucide-react";

const PricingCard = () => {
    return (
        <>



            <div className=" bg-gray-100 h-screen">

                <div className="text-center font-semibold lg:text-3xl text-2xl py-10"> One simple and Affordable Plan</div>
                <div className="flex items-center justify-center  bg-gray-100">




                    <div className="flex flex-col items-center  bg-white p-6 rounded-2xl shadow-lg w-80 h-[400px] border border-gray-200">
                        <div className="relative w-full flex justify-center">
                            <div className="absolute -top-6 bg-blue-600 p-4 rounded-b-2xl">
                                <Flame size={32} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between w-full px-6">
                            <span className="text-gray-700">Monthly</span>
                            <div className="relative flex items-center">
                                <span className="bg-gray-200 w-10 h-4 rounded-full flex items-center px-1">
                                    <span className="bg-blue-600 w-3 h-3 rounded-full"></span>
                                </span>
                            </div>
                            <span className="text-gray-700">Yearly</span>
                        </div>
                        <div className="mt-2 bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded">
                            25% discount
                        </div>
                        <h2 className="text-xl font-bold mt-2">9€/MONTH</h2>
                        <ul className="mt-4 space-y-2 text-gray-700 text-sm w-full px-4">
                            <li className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-blue-600" /> NO COMMITMENT
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-blue-600" /> SET UP IN 10 MIN
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-blue-600" /> GET MORE GOOGLE REVIEWS
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-blue-600" /> DRIVE REPEAT BUSINESS
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-blue-600" /> 24/7 SUPPORT
                            </li>
                        </ul>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                            Start free trial
                        </button>
                    </div>


                </div>

            </div>





        </>
    );
};

export default PricingCard;
