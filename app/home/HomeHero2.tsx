import React from "react";
import Image from "next/image";
import Link from "next/link";

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
          At TheShack, we&apos;re passionate about revolutionizing fast food. Our
          culinary team combines traditional cooking techniques with modern
          efficiency, ensuring every dish meets our high standards for taste,
          freshness, and presentation. We source premium ingredients locally and
          prepare everything to order.
        </p>
        <ul className="mt-4 space-y-2 leading-[40px]">
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span> Fresh ingredients
            sourced daily from local suppliers
          </li>
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span> Expert chefs with
            over 15 years of culinary experience
          </li>
          <li className="flex items-center">
            <span className="text-[#DC143C] mr-2">✔</span> Lightning-fast
            service without compromising on quality
          </li>
        </ul>
        <Link href="/menu">
          <button className="bg-[#DC143C] text-white px-6 py-3 rounded-full hover:bg-black border-[#DC143C] border-[1px]">
            See Menu
          </button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Large Image */}
        <div className="relative w-full h-[250px] sm:col-span-2 sm:h-[400px]">
          <Image
            src="/images/home/Flux_Schnell_Create_a_highly_realistic_image_of_a_juicy_beef_c_2.jpg"
            alt="Food Item 1"
            fill
            className="rounded-md object-cover"
            priority
          />
        </div>
        {/* Small Images */}
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/home/Flux_Schnell_Create_a_highly_realistic_image_of_a_delicate_cry_2.jpg"
            alt="Food Item 2"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/home/Flux_Schnell_Create_a_highly_realistic_image_of_a_mouthwaterin_2.jpg"
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
