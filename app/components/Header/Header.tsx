"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative group ${isActive ? "text-[#DC143C]" : ""}`}
    >
      {children}
      <span className="block absolute bottom-0 left-0 h-0.5 bg-[#DC143C] w-0 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center border-b-[1px] border-[#DC143C]">
      <div className="w-full h-[80px] flex items-center">
        <div className="flex items-center justify-between w-full max-w-[1320px] mx-auto px-4">
          {/* Logo Section */}
          <div className="text-2xl font-extrabold text-[#DC143C] flex items-center gap-1">
            <Image
              src="/images/home/THE_SHACK_PDF-1_new_red_page-0001-removebg-preview (1).png"
              alt="Delicious food"
              width={40}
              height={40}
              className="object-contain"
            />
            <span>The</span>
            <span className="text-[#DC143C]">Shack</span>
          </div>
          {/* Navigation Links */}
          <nav
            className={`${
              isMenuOpen
                ? "flex flex-col bg-black absolute top-[80px] left-0 w-full space-y-4 py-4 px-6 z-50"
                : "hidden"
            } md:flex md:flex-row md:static md:space-x-7 text-[16px]`}
          >
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/menu">Menu</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#DC143C]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
