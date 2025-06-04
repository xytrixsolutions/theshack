import type React from "react";
// This component is now a Server Component, no "use client"
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Using Lucide icons for consistency

// NavLink no longer needs client-side props or hooks
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  // Removed usePathname and isActive logic as it's client-side
  return (
    <Link
      href={href}
      className="relative group" // Removed isActive styling
    >
      {children}
      <span className="block absolute bottom-0 left-0 h-0.5 bg-[#DC143C] w-0 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="w-full flex justify-center border-b-[1px] border-[#DC143C]">
      <div className="w-full h-[80px] flex items-center">
        <div className="flex items-center justify-between w-full max-w-[1320px] mx-auto px-4">
          {/* Logo Section */}
          <Link
            href={"/home"}
            className="text-2xl font-extrabold text-[#DC143C] flex items-center gap-1"
          >
            <Image
              src="/images/home/logo.png"
              alt="Delicious food"
              width={40}
              height={40}
              className="object-contain"
            />
            <span>The</span>
            <span className="text-[#DC143C]">Shack</span>
          </Link>

          {/* Hidden Checkbox for Mobile Menu Toggle */}
          <input type="checkbox" id="menu-toggle" className="hidden peer" />

          {/* Mobile Menu Button (Label for the checkbox) */}
          <label
            htmlFor="menu-toggle"
            className="md:hidden flex items-center text-[#DC143C] cursor-pointer"
            aria-label="Toggle menu"
          >
            {/* Use peer-checked to change icon based on checkbox state */}
            <Menu className="h-8 w-8 peer-checked:hidden" />
            <X className="h-8 w-8 hidden peer-checked:block" />
          </label>

          {/* Navigation Links */}
          <nav
            className={`
              absolute top-[80px] left-0 w-full bg-white py-4 px-6 z-50
              flex flex-col space-y-4
              transition-all duration-300 ease-in-out overflow-hidden
              max-h-0 opacity-0 pointer-events-none
              
              peer-checked:max-h-screen peer-checked:opacity-100 peer-checked:pointer-events-auto
              
              md:flex md:flex-row md:static md:space-x-7 md:max-h-full md:opacity-100 md:pointer-events-auto md:py-0 md:px-0 md:space-y-0
              md:w-auto text-[16px]
            `}
          >
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/menu">Menu</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
