"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const HomeHero = () => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;
    let frameId: number;

    const rotate = () => {
      if (imageWrapperRef.current) {
        angle += 0.2;
        imageWrapperRef.current.style.transform = `rotate(${angle}deg)`;
      }
      frameId = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(frameId);
  }, []);
  return (
    <div className="overflow-x-hidden mt-15">
      <section className="relative text-white bg-[url('/images/home/unsplash_bpPTlXWTOvg.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row relative z-10">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left relative">
            {/* Social Icons - visible only on large screens */}
            <div className="absolute hidden lg:flex left-0 ml-[40px] top-1/2 -translate-y-1/2 flex-col items-center gap-10 z-10">
              <div className="h-[135px] w-px bg-white"></div>
              <div className="flex flex-col items-center gap-4">
                <Link
                  href="https://www.facebook.com/profile.php?id=61571901758803"
                  target="_blank"
                >
                  <FaFacebookF className="text-white hover:text-[#DC143C]" />
                </Link>
                <FaTwitter className="text-white hover:text-[#DC143C]" />
                <FaInstagram className="text-white hover:text-[#DC143C]" />
              </div>
              <div className="h-[135px] w-px bg-white"></div>
            </div>

            <div className="mx-auto px-4 md:ml-[90px] w-full max-w-[472px] mt-8 md:mt-[90px]">
              {/* <p className="text-[#DC143C] font-normal text-center md:text-left text-lg">
                Its Quick & Amusing!
              </p> */}
              <h1 className="text-3xl md:text-[50px] font-bold leading-snug mb-4 text-center md:text-left">
                <span className="text-[#DC143C] ">
                  {" "}
                  <Image
                    src="/images/home/THE_SHACK_PDF-1_new_red_page-0001-removebg-preview (1).png"
                    alt="Delicious food"
                    width={80}
                    height={60}
                    className="object-contain"
                  />{" "}
                  Th
                </span>
                e Art of Speed <br />
                <span>Food Quality</span>
              </h1>
              <p className="text-white text-sm md:text-[14px] mb-6 text-center md:text-left">
                Experience the perfect fusion of lightning-fast service and
                exceptional taste. Our chefs craft every dish with premium
                ingredients, delivering restaurant-quality meals in minutes, not
                hours.
              </p>
              <div className="text-center md:text-left">
                <Link href="../menu">
                  <button className="bg-[#DC143C] text-white px-6 py-3 rounded-full hover:bg-black border-[#DC143C] border-[1px]">
                    See Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative mt-8 md:mt-0 max-w-full overflow-hidden">
            <div
              ref={imageWrapperRef}
              className="w-full"
              style={{ transition: "transform 0.1s linear" }}
            >
              <Image
                src="/images/home/ChatGPT Image May 28, 2025, 07_27_31 PM.png"
                alt="Delicious food"
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
