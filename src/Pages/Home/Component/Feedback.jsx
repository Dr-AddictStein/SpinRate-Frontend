import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <>
            <div className="text-center pb-4 lg:text-3xl text-2xl font-semibold">+650 Clients in Europe</div>
            <div className="flex flex-col md:flex-row items-center justify-between px-8">
                {/* Left: Testimonial Slider */}
                <div className="w-full md:w-1/2 relative p-6">
                    <h1 className="lg:text-2xl text-lg font-semibold text-gray-500 pb-5">What People Say About Us</h1>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100, skewX: 10 }}
                        animate={{ opacity: 1, x: 0, skewX: 0 }}
                        exit={{ opacity: 0, x: -100, skewX: -10 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-6  border border-gray-200 shadow-lg w-ful"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 text-lg">👤</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#2098F3]">{testimonials[currentIndex].name}</h3>
                                <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700">{testimonials[currentIndex].review}</p>
                        <div className="mt-2 flex">
                            {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                                <span key={i} className="text-yellow-400 text-lg">★</span>
                            ))}
                            {Array.from({ length: 5 - testimonials[currentIndex].rating }).map((_, i) => (
                                <span key={i} className="text-gray-300 text-lg">★</span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <motion.img
                        src={man}
                        alt="Happy Customer"
                        className="h-auto rounded-lg transform hover:scale-105 transition-transform"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                </div>
            </div>
        </>
    );
};

export default Feedback;