import { CSSProperties, JSX, Suspense, lazy } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import contactDetails from "./data.json";

// Lazy load the Map component
const LazyMap = lazy(() => import("./MapComponent"));

const MapPlaceholder = () => (
  <div className="w-[600px] h-[450px] border-0 rounded-lg bg-gray-800 animate-pulse">
    <div className="flex items-center justify-center h-full">
      <div className="text-gray-500">Loading map...</div>
    </div>
  </div>
);

const ContactPage = (): JSX.Element => {
  const MainStyle: CSSProperties = {
    backgroundImage: "url(/contact/Group1.png)",
    backgroundSize: "contain !important",
    height: "100vh",
  };

  type IconMap = Record<
    "FaEnvelope" | "FaPhoneAlt" | "FaMapMarkerAlt",
    JSX.Element
  >;
  const iconMap: IconMap = {
    FaEnvelope: <FaEnvelope className="text-2xl text-[#DC143C]" />,
    FaPhoneAlt: <FaPhoneAlt className="text-2xl text-[#DC143C]" />,
    FaMapMarkerAlt: <FaMapMarkerAlt className="text-2xl text-[#DC143C]" />,
  };

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
                  {contactDetails.map((detail, index) => {
                    const Icon = iconMap[detail.icon as keyof typeof iconMap]; // Type assertion here
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="mt-1">{Icon}</div>
                        <div>
                          <h4 className="font-semibold text-lg">
                            {detail.title}
                          </h4>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="text-gray-600 hover:text-black transition-colors whitespace-pre-line"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-gray-600 whitespace-pre-line">
                              {detail.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                    <LazyMap />
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
