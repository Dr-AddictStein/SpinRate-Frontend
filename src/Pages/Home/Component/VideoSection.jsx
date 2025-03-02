import allPhone from "../../../assets/allphone.png";

export default function VideoSection() {
    return (
        <section className="px-6 md:px-20 py-12">
            {/* Main Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text and Bullet Points Section */}
                <div className="text-center md:text-left max-w-lg space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Simple & Engaging Experience
                    </h1>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 text-lg text-gray-800">
                            <span className="bg-[#2098F3] text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hidden sm:flex">✓</span>
                            <div>
                                <span className="font-semibold">Get More Google Reviews</span>
                                <p className="text-gray-600 text-base">
                                    Encourage customers to share their experience and gain more credibility on Google.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 text-lg text-gray-800">
                            <span className="bg-[#2098F3] text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hidden sm:flex">✓</span>
                            <div>
                                <span className="font-semibold">Boost Customer Loyalty</span>
                                <p className="text-gray-600 text-base">
                                    After leaving a review, invite them to spin a wheel of fortune for a fun engagement.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 text-lg text-gray-800">
                            <span className="bg-[#2098F3] text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hidden sm:flex">✓</span>
                            <div>
                                <span className="font-semibold">Encourage Customer Return</span>
                                <p className="text-gray-600 text-base">
                                    Motivate customers to come back and claim prizes while growing your email marketing database.
                                </p>
                            </div>
                        </li>
                    </ul>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#2098F3] transition-all">
                        Start Free Trial
                    </button>
                </div>

                {/* Video Section */}
                <div className="relative w-full flex justify-center">
                    <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
                        <iframe
                            className="w-[320px] sm:w-[400px] md:w-[480px] lg:w-[550px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]"
                            src="https://www.youtube.com/embed/W-ND-zTvFB8?si=waDEbDFOuY0LGij4"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Section-2 */}
            <div className="text-center px-6 py-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                    Engage Customers & Make Reviews Fun!
                </h2>
            </div>

            {/* Image Section */}
            <div className="px-6 flex justify-center">
                <img src={allPhone} alt="Phone display" className="max-w-full shadow-lg rounded-lg" />
            </div>
        </section>
    );
}
