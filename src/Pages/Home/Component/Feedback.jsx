import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import man from '../../../assets/banner (1).png'
const testimonials = [
    {
        name: "David Peretti",
        role: "CEO, Kebab Terre Neuve",
        review:
            "Riwil's digital wheel game has not only increased our Google Reviews but also created genuine excitement among customers. They return often, boosting loyalty and allowing us to gather valuable customer insights.",
        rating: 5,
    },
    {
        name: "Sophie Martin",
        role: "Marketing Director, Foodie Hub",
        review:
            "The QR code system made it easy for our customers to leave reviews, and the interactive wheel kept them engaged. We've seen a significant increase in feedback and online presence!",
        rating: 5,
    },
];

const Feedback = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (

        <>
            <div className="text-center pb-4 lg:text-3xl text-2xl font-semibold">+650 Clients in Europe</div>
            <div className="flex flex-col md:flex-row items-center justify-between px-8 ">
                {/* Left: Testimonial Slider */}
                <div className="w-full md:w-1/2 relative p-6">
                    <h1 className="lg:text-2xl text-lg font-semibold text-gray-500 pb-5">What People Say About Us</h1>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white  hover:border-[#2098F3] hover:border p-6 rounded-4xl border border-gray-100 shadow-md"
                    >
                        <h3 className="text-lg text-[#2098F3] font-semibold">{testimonials[currentIndex].name}</h3>
                        <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                        <p className="mt-4 text-gray-700">{testimonials[currentIndex].review}</p>
                        <div className="mt-2 flex">
                            {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                                <span key={i} className="text-yellow-400 text-lg">★</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#2098F3] p-2 rounded-full"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#2098F3] p-2 rounded-full"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={man}
                        alt="Happy Customer"
                        className=" h-auto rounded-lg"
                    />
                </div>
            </div>
        </>

    );
};

export default Feedback;