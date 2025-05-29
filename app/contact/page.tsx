"use client";
import { CSSProperties, JSX, Suspense, lazy, useState, useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

// Lazy load the Map component
const LazyMap = lazy(() => import("./MapComponent"));

const MapPlaceholder = () => (
  <div className="w-full h-[50vh] border-0 rounded-lg bg-gray-800 animate-pulse">
    <div className="flex items-center justify-center h-full">
      <div className="text-gray-500">Loading map...</div>
    </div>
  </div>
);

const ContactPage = (): JSX.Element => {
  const MainStyle: CSSProperties = {
    backgroundColor: "#030303",
    backgroundImage: "url(/contact/Group1.png)",
    backgroundSize: "contain !important",
    height: "100vh",
  };

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const contactDetails = [
    {
      icon: <FaEnvelope className="text-2xl text-[#DC143C]" />,
      title: "Email",
      value: "contact@example.com",
      href: "mailto:contact@example.com",
    },
    {
      icon: <FaPhoneAlt className="text-2xl text-[#DC143C]" />,
      title: "Phone",
      value: "+1 (803) 941-7044",
      href: "tel:+18039417044",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-[#DC143C]" />,
      title: "Address",
      value: "1250 Chapin Rd, Chapin, SC 29036, United States",
    },
  ];

  // Simulate loading delay for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={MainStyle}>
      <section>
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center pt-5 lg:pt-20">
            {/* Contact Details Column */}
            <div className="w-full lg:w-6/12 pt-3 sm:pt-5 px-4">
              <div className="max-w-lg mx-auto">
                <h3 className="text-center font-bold pb-5 text-2xl">
                  CONTACT US
                </h3>

                <div className="space-y-6">
                  {contactDetails.map((detail, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1">{detail.icon}</div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {detail.title}
                        </h4>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="text-gray-300 hover:text-white transition-colors whitespace-pre-line"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-gray-300 whitespace-pre-line">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Column - Fixed alignment */}
            <div className="w-full lg:w-6/12 pt-3 sm:pt-5 px-4">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h3 className="font-bold pb-5 text-2xl text-center">
                  VISIT US
                </h3>
                <div className="flex justify-center">
                  <Suspense fallback={<MapPlaceholder />}>
                    {isMapLoaded ? <LazyMap /> : <MapPlaceholder />}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
