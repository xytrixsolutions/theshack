/* eslint-disable @next/next/no-img-element */
import { PiHamburgerLight, PiCookieLight, PiWineLight } from "react-icons/pi";

const Hero4 = () => {
  return (
    <section className="flex flex-col md:flex-row bg-black text-white px-10 py-16 md:px-36">
      {/* Left Section - Image Grid */}
      <div className="md:w-1/2 grid grid-cols-2 gap-4">
        {/* Large Top Image */}
        <img
          src="/images/home//unsplash_lP5MCM6nZ5A.png"
          alt="Tacos"
          className="col-span-2 row-span-2 rounded-md w-full h-[294px] object-cover"
        />
        {/* Smaller Images */}
        <img
          src="/images/home/unsplash_dphM2U1xq0U (1).png"
          alt="Burger"
          className="rounded-md w-full h-[140px] object-cover"
        />
        <img
          src="/images/home/unsplash_CLMpC9UhyTo (2).png"
          alt="Chicken Nuggets"
          className="rounded-md w-full h-[140px] object-cover"
        />
        <img
          src="/images/home/unsplash_-GFCYhoRe48.png"
          alt="Cheeseburger"
          className="rounded-md w-full h-[140px] object-cover"
        />
        <img
          src="/images/home/unsplash_mmnKI8kMxpc.png"
          alt="Salad"
          className="rounded-md w-full h-[140px] object-cover"
        />
        {/* Full-width Image in the Bottom Row */}
        <img
          src="/images/home/unsplash_tzl1UCXg5Es (1).png"
          alt="Bottom Image"
          className="col-span-2 rounded-md w-full h-[140px] object-cover"
        />
      </div>

      {/* Right Section - Text and Features */}
      <div className="md:w-1/2 mt-8 md:mt-0 md:pl-10">
        <h2 className="text-lg text-[#DC143C] font-medium">Why Choose us</h2>
        <h2 className="text-4xl font-bold mt-2 leading-snug">
          <span className="text-[#DC143C]">Ex</span>tra ordinary taste
          <br />
          And Experienced
        </h2>
        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
          pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit
          augue urna, vitae feugiat pretium donec id elementum.
        </p>

        {/* Features Section */}
        <div className="mt-8 flex space-x-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#DC143C] p-4 rounded-md text-white w-[82px] h-[80px] flex justify-center items-center">
              <PiHamburgerLight size={36} />
            </div>
            <p className="mt-2 text-sm">Fast Food</p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#DC143C] p-4 rounded-md text-white w-[82px] h-[80px] flex justify-center items-center">
              <PiCookieLight size={36} />
            </div>
            <p className="mt-2 text-sm">Lunch</p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#DC143C] p-4 rounded-md text-white w-[82px] h-[80px] flex justify-center items-center">
              <PiWineLight size={36} />
            </div>
            <p className="mt-2 text-sm">Dinner</p>
          </div>
        </div>

        {/* Years of Experience */}
        <div className="mt-8 bg-white text-black py-4 px-6 rounded-lg flex items-center space-x-4">
          <span className="text-4xl font-bold text-[#DC143C]">30+</span>
          <div>
            <p className="text-sm font-medium">Years of</p>
            <p className="text-lg font-bold">Experienced</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero4;
