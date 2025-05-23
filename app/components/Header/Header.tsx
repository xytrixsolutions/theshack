"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#DC143C] bg-black">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between h-[80px] px-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white flex items-center gap-1">
          <span>The</span>
          <span className="text-[#DC143C]">Shack</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-white text-base font-medium">
          <Link href="/home" className="hover:text-[#DC143C] transition">
            Home
          </Link>
          <Link href="/menu" className="hover:text-[#DC143C] transition">
            Menu
          </Link>
          <Link href="/contact" className="hover:text-[#DC143C] transition">
            Contact
          </Link>
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#DC143C] focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black w-full absolute top-[80px] left-0 px-6 py-4 flex flex-col gap-4 text-white text-base z-50 shadow-lg transition-all duration-300 ease-in-out">
          <Link href="/home" className="hover:text-[#DC143C]" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/menu" className="hover:text-[#DC143C]" onClick={() => setIsMenuOpen(false)}>
            Menu
          </Link>
          <Link href="/contact" className="hover:text-[#DC143C]" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
