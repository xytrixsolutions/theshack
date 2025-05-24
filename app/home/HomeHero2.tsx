import React from "react";
import Image from "next/image";

const Hero2 = () => {
  return (
    <section className="flex flex-col md:flex-row items-center bg-black text-white md:px-36 md:py-16 px-6 py-10 md:gap-10 mt-8">
      {/* Left Section */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-2xl text-[#DC143C] mb-4">about us</h2>
        <h2 className="text-4xl font-bold">
          <span className="text-[#DC143C]">We</span> Create the best <br />
          foody product
        </h2>
        <p className="mt-4 text-gray-300">
          At TheShack, we&apos;re passionate about revolutionizing fast food.
          Our culinary team combines traditional cooking techniques with modern
          efficiency, ensuring every dish meets our high standards for taste,
          freshness, and presentation. We source premium ingredients locally and
          prepare everything to order.
        </p>
        <ul className="mt-4 space-y-2 leading-[40px]">
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span>Fresh ingredients
            sourced daily from local suppliers
          </li>
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span>Expert chefs with
            over 15 years of culinary experience
          </li>
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span>Lightning-fast
            service without compromising on quality
          </li>
        </ul>
        <button className="mt-6 bg-[#DC143C] text-white px-6 py-3 rounded-full hover:bg-black border-[#DC143C] border-[1px]">
          Read More
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Large Image */}
        <div className="relative w-full h-[250px] sm:col-span-2 sm:h-[400px]">
          <Image
            src="/images/home/unsplash_fdlZBWIP0aM.png"
            alt="Food Item 1"
            fill
            className="rounded-md object-cover"
            priority
          />
        </div>
        {/* Small Images */}
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/home/unsplash_jpkfc5_d-DI.png"
            alt="Food Item 2"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/home/unsplash_mAQZ3X_8_l0.png"
            alt="Food Item 3"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero2;
