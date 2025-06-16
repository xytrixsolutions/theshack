import React from "react";
import Image from "next/image";
import { PiHamburgerLight, PiCookieLight, PiWineLight } from "react-icons/pi";

const HomeHero3 = () => {
  return (
    <section className="flex flex-col md:flex-row bg-white text-black px-10 py-16 md:px-36">
      {/* Left Section - Image Grid */}
      <div className="md:w-1/2 grid grid-cols-2 gap-4">
        {/* Large Top Image */}
        <Image
          src="/images/home/sweet n stinky.jpeg"
          alt="Tacos"
          width={500}
          height={294}
          className="col-span-2 row-span-2 rounded-md w-full h-[294px] object-cover"
        />
        {/* Smaller Images */}
        <Image
          src="/images/home/fish n chips.jpeg"
          alt="Burger"
          width={300}
          height={140}
          className="rounded-md w-full h-[240px] object-cover"
        />
        <Image
          src="/images/home/animal style.jpeg"
          alt="Chicken Nuggets"
          width={300}
          height={140}
          className="rounded-md w-full h-[240px] object-cover"
        />
        <Image
          src="/images/home/wedge.jpeg"
          alt="Cheeseburger"
          width={300}
          height={140}
          className="rounded-md w-full h-[240px] object-cover"
        />
        <Image
          src="/images/home/celery.jpeg"
          alt="Salad"
          width={300}
          height={140}
          className="rounded-md w-full h-[240px] object-cover"
        />
        {/* Full-width Image in the Bottom Row */}
        <Image
          src="/images/home/inside.jpeg"
          alt="Bottom Image"
          width={500}
          height={140}
          className="col-span-2 rounded-md w-full h-[240px] object-cover"
        />
      </div>

      {/* Right Section - Text and Features */}
      <div className="md:w-1/2 mt-8 md:mt-0 md:pl-10">
        <h2 className="text-lg text-black font-medium">Why Choose us</h2>
        <h2 className="text-4xl font-bold mt-2 leading-snug">
          <span className="text-[#DC143C]">Our Grub</span>
        </h2>

        {/* Features Section */}
        <div className="mt-8 flex space-x-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#DC143C] p-4 rounded-md text-white w-[82px] h-[80px] flex justify-center items-center">
              <PiHamburgerLight size={36} />
            </div>
            <p className="mt-2 text-sm">Fast Food</p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#DC143C] p-4 rounded-md text-white w-[82px] h-[80px] flex justify-center items-center">
              <PiCookieLight size={36} />
            </div>
            <p className="mt-2 text-sm">Lunch</p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#DC143C] p-4 rounded-md text-white w-[82px] h-[80px] flex justify-center items-center">
              <PiWineLight size={36} />
            </div>
            <p className="mt-2 text-sm">Dinner</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero3;
