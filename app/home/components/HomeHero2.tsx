import React from "react";
import Image from "next/image";
import { SeeMenu } from "../../components/SeeMenu";

const HomeHero2 = () => {
  return (
    <section className="flex flex-col md:flex-row items-center  text-black md:px-36 md:py-16 px-6 py-10 md:gap-10 mt-8">
      {/* Left Section */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-2xl text-black mb-4">about us</h2>
        <h2 className="text-4xl text-[#DC143C]  font-bold">
          The Henderson Clan
        </h2>
        <p className="mt-4 text-black">
          The Henderson family—Glen, Janee, Ethan, Peyton, and Claira—have a
          passion for great food and hospitality that’s brought people together
          across states and even across the ocean. This is their fourth
          restaurant, following two in California and one in Tennessee. Inspired
          by their time living in England, they’ve built each location on the
          same foundation: quality ingredients, welcoming service, and a sense
          of family. Now proud to call Chapin home, they’ve created a cozy spot
          where neighbors can gather, enjoy good food, and feel at home. We love
          this community and are excited to share our table with you!
        </p>
        <ul className="mt-4 space-y-2 leading-[40px]">
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span> Fresh ingredients
            sourced daily from local suppliers
          </li>
        </ul>
        <SeeMenu />
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Large Image */}
        <div className="relative w-full h-[250px] sm:col-span-2 sm:h-[400px]">
          <Image
            src="/images/home/HomeHero2(1).jpeg"
            alt="Food Item 1"
            fill
            className="rounded-md object-cover"
            priority
          />
        </div>
        {/* Small Images */}
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/home/HomeHero2(2).jpeg"
            alt="Food Item 2"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/home/HomeHero2(3).jpeg"
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
