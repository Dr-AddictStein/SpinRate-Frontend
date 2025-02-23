// pages/iframe-content.js
import allPhone from "../../../assets/allphone.png";

export default function VideoSection() {
    return (
        <>
            <div className="px-5 md:px-10 flex flex-col md:flex-row gap-10">
                {/* Embedded Video */}
                <div className="w-full md:w-auto">
                    <iframe
                        className="w-full h-[250px] sm:h-[300px] md:w-[380px] md:h-[400px] lg:w-[380px] lg:h-[500px]"
                        src="https://www.youtube.com/embed/W-ND-zTvFB8?si=waDEbDFOuY0LGij4"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Text and Bullet Points */}
                <div className="text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
                        Simple and Easy-to-Use
                    </h1>

                    <ul className="list-none space-y-2 mb-6">
                        <li className="relative pl-6 pb-3 before:content-['✓'] text-lg sm:text-xl font-semibold text-gray-600 before:absolute before:left-0 before:text-blue-500">
                            Get more Google reviews
                        </li>
                        <p className="font-normal pb-5 text-gray-600 text-base sm:text-lg">
                            Encourage customers to share their experience to gain more reviews
                            on Google
                        </p>
                        <li className="relative pl-6 pb-3 before:content-['✓'] font-semibold text-gray-600 text-lg sm:text-xl before:absolute before:left-0 before:text-blue-500">
                            Boost Customer Loyalty
                        </li>
                        <p className="font-normal pb-5 text-gray-600 text-base sm:text-lg">
                            After leaving a review, invite them to spin a wheel of fortune,
                            making their interaction with your brand more enjoyable
                        </p>
                        <li className="relative pl-6 pb-3 before:content-['✓'] font-semibold text-gray-600 text-lg sm:text-xl before:absolute before:left-0 before:text-blue-500">
                            Encourage Customer Return
                        </li>
                        <p className="font-normal text-gray-600 text-base sm:text-lg">
                            Motivate customers to come back to claim their prizes while
                            enriching your database for email marketing campaigns
                        </p>
                    </ul>

                    <button className="bg-[#649DFC] cursor-pointer text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-blue-300 transition w-full sm:w-auto">
                        Start free trial
                    </button>
                </div>
            </div>

            {/* Section-2 */}
            <div className="flex flex-col md:flex-row px-5 md:px-10 py-10 items-center gap-6 text-center md:text-left">
                <div className="font-semibold text-2xl sm:text-3xl">
                    Invite your customers to leave a <br />
                    review by entertaining them
                </div>
            </div>

            {/* Image Section */}
            <div className="px-5 md:px-10">
                <img src={allPhone} alt="" className=" " />
            </div>
        </>
    );
}
