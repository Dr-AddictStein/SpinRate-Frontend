import React from "react";
import { motion } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Custom styles for Swiper
import './ReviewSlider.css';

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
      className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur opacity-75"></div>
          <img
            src={review.avatar}
            alt={review.name}
            className="relative w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div className="relative">
          <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.68967 8.45999C7.16615 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9163 8.45999C14.3927 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
          </svg>
          <p className="text-gray-700 text-center relative">{review.content}</p>
        </div>
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
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Business Owner",
      content: "This platform has completely transformed how we collect reviews. Our online presence has improved dramatically in just a few months.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
      id: 5,
      name: "David Chen",
      role: "Restaurant Manager",
      content: "The spin wheel feature has been a hit with our customers. They love the interactive experience and we love the increased reviews!",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-5 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Swiper for all screen sizes */}
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper py-10"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;