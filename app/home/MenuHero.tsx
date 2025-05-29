import React from "react";
import Image from "next/image";

const MenuCard = () => {
  return (
    <section className="bg-black text-white px-4 py-10 lg:px-36 lg:py-16 mt-8 overflow-x-hidden">
      {/* Container with safe max width */}
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Menu Images */}
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="/images/home/TheShack_menu_Stacy new_page-0001.jpg"
              alt="Menu Page 1"
              className="w-full h-auto rounded-lg shadow-lg object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src="/images/home/TheShack_menu_Stacy new_page-0002.jpg"
              alt="Menu Page 2"
              className="w-full h-auto rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 w-full flex justify-center">
          <a
            href="/images/home/TheShack_menu_Stacy new.pdf"
            download="Menu-Card"
            className="bg-[#DC143C] text-white px-6 py-3 rounded-full hover:bg-black border-[#DC143C] border-[1px]"
          >
            Download Menu Card
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuCard;
