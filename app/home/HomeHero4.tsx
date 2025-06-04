import { JSX } from "react";
import Testimonials from "./Testimonials";

// Define your static testimonial data here
const testimonials = [
  {
    id: 1,
    name: "Alamin Hasan",
    text: "“Absolutely wonderful experience! Their team exceeded expectations with top-notch service and design.”",
    image: "/images/home/Ellipse 4.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Johnson Abraham",
    text: "“Absolutely wonderful experience! Their team exceeded expectations with top-notch service and design.”",
    image: "/images/home/Ellipse 5.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Lee",
    text: "“Fast, friendly, and reliable. Highly recommended for anyone seeking quality work.”",
    image: "/images/home/Ellipse 6.png",
    rating: 5,
  },
];

const HomeHero4 = (): JSX.Element => {
  return (
    <section className="text-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading - Rendered on the server */}
        <div className="text-center mb-12">
          <h2 className="text-[#DC143C] font-semibold text-sm tracking-widest uppercase mb-2">
            Testimonials
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold">
            What Our Clients Are Saying
          </h1>
        </div>

        {/* Testimonial Carousel - This is the Client Component */}
        <Testimonials testimonials={testimonials} />
      </div>
    </section>
  );
};
export default HomeHero4;
