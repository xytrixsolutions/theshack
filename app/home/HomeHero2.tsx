import React from 'react';
import Image from 'next/image';

const HomeHero2 = () => {
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          diam pellentesque bibendum non dui volutpat fringilla bibendum.
          Urna, elit augue urna, vitae feugiat pretium donec id elementum.
          Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu
          velit in consequat.
        </p>
        <ul className="mt-4 space-y-2 leading-[40px]">
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span> Lacus nisi, et ac dapibus sit eu velit in consequat.
          </li>
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span> Quisque diam pellentesque bibendum non dui volutpat fringilla
          </li>
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </li>
        </ul>
        <button className="mt-6 bg-[#DC143C] text-white py-2 px-6 h-[50px] rounded-3xl hover:bg-orange-600">
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

export default HomeHero2;
