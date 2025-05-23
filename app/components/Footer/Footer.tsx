import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import Image from 'next/image';
import clockwiseimg from '../../../public/images/Footer/ClockClockwise.png'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white  items-center w-full">


      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-4 gap-10 mt-10 py-20 md:border-t-[1px] border-[#DC143C]">


        {/* About Us */}
        <div>
          <h3 className="text-lg font-bold">About Us</h3>
          <p className="text-white mt-4">
            Corporate clients and leisure travelers have been relying on
            Groundlink for dependable, safe, and professional chauffeured car
            service in major cities across the world.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className='w-[78px] h-[72px] rounder-[3px] bg-[#DC143C] flex justify-center items-center'>
             <div >
             <Image 
             src={clockwiseimg}
             alt='clockwise'
             width={40}
             height={40}
             />
             </div>
            </div>
            <div>
            <h4 className="font-bold">Opening Hours</h4>
            <p className="text-white mt-2">Mon - Sat (8.00 - 6.00)</p>
            <p className="text-white">Sunday - Closed</p>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold">Useful Links</h3>
          <ul className="mt-4 text-white space-y-2">
          <li><Link href='/home'>Home</Link></li>
          <li><Link href='/menu'>Menu</Link></li>
          <li><Link href='/contact'>Contact</Link></li>
          </ul>
          </div>
          <div>
          <h3 className="text-lg font-bold">Help?</h3>
          <ul className="mt-4 text-white space-y-2">
          <li><Link href='../faqs'>FAQs</Link></li>
            <li>Support</li>
          </ul>
        </div>

        {/* Recent Posts */}
        <div>
          <h3 className="text-lg font-bold">Best Dishes</h3>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center gap-4">
              <img
                src="/images/Footer/unsplash_50KffXbjIOg.png"
                alt="Post Thumbnail"
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="text-gray-400 text-[16px] font-normal">Fast Food</p>
                <p className="text-[18px] text-white font-normal">
                  Zinger Roll
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <img
                src="/images/Footer/unsplash_CLMpC9UhyTo.png"
                alt="Post Thumbnail"
                className="w-16 h-16 object-cover"
              />
              <div>
              <p className="text-gray-400 text-[16px] font-normal">Fried Food</p>
                <p className="text-[18px] text-white font-normal">
                  Fried Chicken
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <img
                src="/images/Footer/unsplash_CRoAeTh5S_I.png"
                alt="Post Thumbnail"
                className="w-16 h-16 object-cover"
              />
              <div>
              <p className="text-gray-400 text-[16px] font-normal">Salads</p>
                <p className="text-[18px] text-white font-normal">
                  Russian Salad
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10  bg-[#4F4F4F] opacity-50 pt-6 h-[99px] md:flex items-center">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            Copyright © 2022 by The Shack. All Rights Reserved.
          </p>
          <div className="flex w-[240px] h-[34px] gap-3">
                 <a
                   href="#"
                   className="bg-white w-[34px] h-[34px] text-black hover:text-[#DC143C] flex justify-center items-center"
                 >
                   <FaFacebookF size={16} />
                 </a>
                 <a
                   href="#"
                   className="bg-white w-[34px] h-[34px] text-black hover:text-[#DC143C] flex justify-center items-center"
                 >
                   <FaTwitter size={16} />
                 </a>
                 <a
                   href="#"
                   className="bg-white w-[34px] h-[34px] text-black hover:text-[#DC143C] flex justify-center items-center"
                 >
                   <FaInstagram size={16} />
                 </a>
                 <a
                   href="#"
                   className="bg-white w-[34px] h-[34px] text-black hover:text-[#DC143C] flex justify-center items-center"
                 >
                   <FaYoutube size={16} />
                 </a>
                 <a
                   href="#"
                   className="bg-white w-[34px] h-[34px] text-black hover:text-[#DC143C] flex justify-center items-center"
                 >
                   <FaPinterest size={16} />
                 </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer