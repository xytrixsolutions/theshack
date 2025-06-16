"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { SeeMenu } from "../../components/SeeMenu";

const images = [
  "/images/home/slidemenu1.jpg",
  "/images/home/slidemenu2.jpg",
  "/images/home/slidemenu3.jpg",
  "/images/home/slidemenu4.jpg",
  "/images/home/slidemenu5.jpg",
  "/images/home/slidemenu6.jpg",
  "/images/home/slidemenu7.jpg",
  "/images/home/slidemenu8.jpg",
];

const HomeHero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden mt-15">
      <section className="relative text-white bg-[url('/images/home/unsplash_bpPTlXWTOvg.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-opacity-60 z-0"></div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row relative z-10">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left relative">
            {/* Social Icons */}
            <div className="absolute hidden lg:flex left-0 ml-[40px] top-1/2 -translate-y-1/2 flex-col items-center gap-10 z-10">
              <div className="h-[135px] w-px bg-[#DC143C]"></div>
              <div className="flex flex-col items-center gap-4">
                <Link
                  href="https://www.facebook.com/profile.php?id=61571901758803"
                  target="_blank"
                >
                  <FaFacebookF className="text-black hover:text-[#DC143C]" />
                </Link>
                <Link
                  href="https://www.instagram.com/theshackchapin/"
                  target="_blank"
                >
                  <FaInstagram className="text-black hover:text-[#DC143C]" />
                </Link>
                <Link href="mailto:theshackchapin@gmail.com" target="_blank">
                  <IoMailOutline className="text-black hover:text-[#DC143C]" />
                </Link>
              </div>
              <div className="h-[135px] w-px bg-[#DC143C]"></div>
            </div>

            <div className="mx-auto px-4 md:ml-[90px] w-full max-w-[472px] mt-8 md:mt-[90px]">
              <h1 className="text-[#DC143C] text-3xl md:text-[50px] font-bold leading-snug mb-4 text-center md:text-left">
                {/* <Image
                    src="/images/home/THE_SHACK_PDF-1_new_red_page-0001-removebg-preview (1).png"
                    alt="Delicious food"
                    width={80}
                    height={60}
                    className="object-contain"
                  /> */}
                <span className="text-[#DC143C]">Awesome Food ;</span>
                <br />
                <span>Lake Attitude</span>
              </h1>
              <p className="text-black text-sm md:text-[14px] mb-6 text-center md:text-left">
                At The Shack we recreate all your family favorite meals ranging
                from pizza, handhelds, mac and cheese and our house specialty
                fish and chips! Experience our laid back vibe and 5 star food
                and service.
              </p>
              <div className="text-center md:text-left">
                <SeeMenu />
              </div>
            </div>
          </div>

          {/* Right Image Carousel */}
          <div className="flex-1 relative mt-8 md:mt-0 max-w-full overflow-hidden">
            <div className="w-full h-full transition-all duration-700">
              <Image
                src={images[current]}
                alt={`Slide ${current + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
