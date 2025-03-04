import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center mb-6">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
        <p className="text-gray-700 text-center">{review.content}</p>
      </div>
      <div className="border-t pt-4 flex flex-col items-center">
        <h4 className="font-semibold text-lg text-gray-900">{review.name}</h4>
        <p className="text-gray-500 mb-2">{review.role}</p>
        <StarRating rating={review.rating} />
      </div>
    </motion.div>
  );
};

const ClientReviews = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Alessandro",
      role: "User",
      content: "Duis cursus, mi quis viverra ornare, eros dolor inte nulla utimp erdiet libero vitae erat Aenean faucibus nibh et jus cursus",
      rating: 3,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Gabriele Riccardo",
      role: "User",
      content: "Duis cursus, mi quis viverra ornare, eros dolor inte nulla utimp erdiet libero vitae erat Aenean faucibus nibh et jus cursus",
      rating: 3,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Michael W. Kirwan",
      role: "User",
      content: "Duis cursus, mi quis viverra ornare, eros dolor inte nulla utimp erdiet libero vitae erat Aenean faucibus nibh et jus cursus",
      rating: 3,
      avatar: "https://randomuser.me/api/portraits/men/86.jpg"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Calculate which reviews to show based on screen size
  // For desktop, show up to 3 at once
  const visibleReviews = reviews;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-blue-500 font-medium"
          >
            Client Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
          >
            What Our Customer Say<br />About Us
          </motion.h2>
        </div>

        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile view - single card slider */}
        <div className="md:hidden">
          <ReviewCard review={visibleReviews[activeSlide]} />
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === idx 
                    ? "w-6 bg-blue-500" 
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;