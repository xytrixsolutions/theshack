import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import Image from "next/image";
import clockwiseimg from "../../../public/images/Footer/ClockClockwise.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-black w-full">
      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-x-14 gap-y-10 mt-10 py-20 border-t border-[#DC143C] text-white">
        {/* Opening Hours */}
        <div className="flex flex-col gap-4 max-w-[220px]">
          <div className="flex items-start gap-4">
            <div className="min-w-[60px] h-[60px] rounded bg-[#DC143C] flex justify-center items-center">
              <Image
                src={clockwiseimg}
                alt="clockwise"
                width={36}
                height={36}
              />
            </div>
            <div className="flex-1 text-black">
              <h4 className="font-bold text-lg text-[#DC143C]">
                Opening Hours
              </h4>
              <p className="mt-1 text-sm text-pretty">
                Tuesday - Sunday: 11:00am - 9:00pm
              </p>
              <p className="mt-1 text-sm">
                Friday - Saturday: 11:00am - 10:00pm
              </p>
              <p className="mt-1 text-sm">Monday: Closed</p>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div className="text-black">
          <h3 className="text-lg font-bold mb-2 text-[#DC143C] ">
            Useful Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Need Help */}
        <div className="text-black">
          <h3 className="text-lg font-bold mb-2 text-[#DC143C]">Need Help?</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/contact">Support</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#DC143C] bg-opacity-50 py-6">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white text-sm mb-4 md:mb-0">
            © 2022 The Shack. All Rights Reserved.
          </p>
          <div className="flex gap-3">
            {[
              {
                href: "https://www.facebook.com/profile.php?id=61571901758803",
                icon: <FaFacebookF size={16} />,
              },
              {
                href: "https://www.instagram.com/theshackchapin/",
                icon: <FaInstagram size={16} />,
              },
              {
                href: "mailto:theshackchapin@gmail.com",
                icon: <IoMailOutline size={16} />,
              },
            ].map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                className="bg-white w-[34px] h-[34px] text-black hover:text-[#DC143C] flex justify-center items-center rounded"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
