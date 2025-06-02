import Link from "next/link";

export const SeeMenu = () => (
  <Link href="/menu">
    <button
      className="bg-[#DC143C] text-white px-6 py-3 rounded-full border-[#DC143C] border-[1px] 
    hover:bg-white hover:text-[#DC143C] 
    transition-colors duration-300"
    >
      See Menu
    </button>
  </Link>
);
