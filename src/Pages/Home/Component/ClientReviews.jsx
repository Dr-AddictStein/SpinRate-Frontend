import React from "react";
import heroBG from "../../../../public/hero-bg-scaled.jpg";

const ClientReviews = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marie D.",
      role: "Gérant, Le Bistrot Parisien",
      quote: "Nos clients laissent enfin des avis sans qu'on ait besoin de leur demander. Et en plus, ils reviennent pour tenter leur chance à la roue ! Wheelix est un vrai game-changer.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Sophie L.",
      role: "Directrice, Café de la Plage",
      quote: "Notre score Google a explosé en quelques semaines ! Le système de récompenses motive vraiment les clients, et nous avons récupéré des centaines d'emails pour nos campagnes marketing.",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
      id: 3,
      name: "Jerôme M.",
      role: "Gérant, Burger Avenue",
      quote: "Grâce à Wheelix, nous avons triplé nos avis Google en un mois ! Les clients adorent le concept du jeu et reviennent plus souvent. Simple et efficace !",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <section 
      id="reviews" 
      className="relative min-h-screen flex items-center py-16"
      style={{
        backgroundImage: `url(${heroBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Customers about Wheelix
          </h2>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-8 h-8 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full md:w-[30%] max-w-sm">
              <div className="bg-white rounded-lg shadow-lg p-6 pt-12 relative flex flex-col">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <p className="text-gray-800 text-center italic mb-4 flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-3 mt-2">
                  <h4 className="font-semibold text-center text-gray-900">— {testimonial.name}</h4>
                  <p className="text-blue-500 text-center text-sm">
                    {testimonial.role.split(',')[0]}, <span className="text-blue-400">{testimonial.role.split(',')[1]?.trim()}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;