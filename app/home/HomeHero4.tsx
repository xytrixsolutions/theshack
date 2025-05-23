'use client'

import React, { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Alamin Hasan',
    text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum non dui volutpat fringilla. Ut vitae feugiat pretium donec id elementum.”',
    image: '/images/home/Ellipse 6.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    text: '“Absolutely wonderful experience! Their team exceeded expectations with top-notch service and design.”',
    image: '/images/home/Ellipse 6.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Lee',
    text: '“Fast, friendly, and reliable. Highly recommended for anyone seeking quality work.”',
    image: '/images/home/Ellipse 6.png',
    rating: 5,
  },
];

const HomeHero4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[#DC143C] font-semibold text-sm tracking-widest uppercase mb-2">
            Testimonials
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold">What Our Clients Are Saying</h1>
        </div>

        {/* Testimonial Card */}
        {testimonials.map((testimonial, index) =>
          index === currentIndex ? (
            <div
              key={testimonial.id}
              className="relative max-w-3xl mx-auto bg-white backdrop-blur-md text-white shadow-2xl rounded-3xl px-8 py-16 mt-24 border border-white/20 transition-all duration-700"
            >
              {/* Profile Image */}
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-tr from-[#DC143C] to-yellow-500 p-1 rounded-full">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-28 h-28 rounded-full border-4 border-black object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="mt-10 text-center px-4 md:px-8">
                <p className="mt-4 text-black text-lg md:text-xl leading-relaxed">{testimonial.text}</p>

                {/* Rating */}
                <div className="flex justify-center mt-6 text-yellow-400 text-2xl space-x-1">
                  {Array(testimonial.rating)
                    .fill('★')
                    .map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                </div>

                {/* Client Info */}
                <div className="mt-6">
                  <h3 className="font-bold text-xl text-black">{testimonial.name}</h3>
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-10 space-x-2">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-full shadow-md transition duration-300 ${
                      i === currentIndex ? 'bg-[#DC143C]' : 'bg-gray-500'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default HomeHero4;
