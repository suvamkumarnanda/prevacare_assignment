import React, { useState, useEffect, useRef } from "react";

const features = [
  {
    id: 1,
    title: "Feature No.1 - Text Heading Display",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit."
    ],
    image: "/assets/phoneimage.png"
  },
  {
    id: 2,
    title: "Feature No.2 - Modern UI Showcase",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "Ut enim minim veniam quis nostrud exercitation ullamco laboris nisi.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium."
    ],
    image: "/assets/phoneimage.png"
  },
  {
    id: 3,
    title: "Feature No.3 - Smooth Navigation",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "Ut enim minim veniam quis nostrud exercitation ullamco laboris nisi.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium."
    ],
    image: "/assets/phoneimage.png"
  },
  {
    id: 4,
    title: "Feature No.4 - Scroll Automation",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "Ut enim minim veniam quis nostrud exercitation ullamco laboris nisi."
    ],
    image: "/assets/phoneimage.png"
  },
  {
    id: 5,
    title: "Feature No.5 - Mobile Friendly",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "Ut enim minim veniam quis nostrud exercitation ullamco laboris nisi."
    ],
    image: "/assets/phoneimage.png"
  }
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoScrollDone, setAutoScrollDone] = useState(false);
  const sectionRef = useRef(null);

  // Auto-scroll step functionality
  useEffect(() => {
    let isThrottled = false;

    const handleScroll = (e) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom > window.innerHeight;

      // 🔑 Reset autoScrollDone when section re-enters view
      if (inView && autoScrollDone) {
        setAutoScrollDone(false);
      }

      if (inView && !isThrottled && !autoScrollDone) {
        e.preventDefault();
        e.stopPropagation();

        if (e.deltaY > 0 && activeIndex < features.length - 1) {
          // scroll down → next feature
          setActiveIndex((prev) => prev + 1);
        } else if (e.deltaY < 0 && activeIndex > 0) {
          // scroll up → previous feature
          setActiveIndex((prev) => prev - 1);
        } else if (e.deltaY > 0 && activeIndex === features.length - 1) {
          // reached last → release scroll
          setAutoScrollDone(true);
          window.scrollTo({
            top: window.scrollY + rect.height,
            behavior: "smooth",
          });
        } else if (e.deltaY < 0 && activeIndex === 0) {
          // reached first → release scroll upwards
          setAutoScrollDone(true);
          window.scrollTo({
            top: window.scrollY - rect.height,
            behavior: "smooth",
          });
        }

        // throttle for smooth step effect
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 700);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [activeIndex, autoScrollDone]);

  // Manual arrows
  const nextFeature = () =>
    setActiveIndex((i) => (i < features.length - 1 ? i + 1 : i));
  const prevFeature = () =>
    setActiveIndex((i) => (i > 0 ? i - 1 : i));

  return (
    <div className="relative w-full">
      <section
        ref={sectionRef}
        className="flex flex-col md:flex-row max-w-6xl mx-auto min-h-screen"
      >
        {/* Left Side */}
        <div className="flex flex-col justify-between w-full md:w-1/3 px-6 py-8 sm:py-12">
          <div>
            <h2 className="text-blue-600 font-semibold text-lg sm:text-xl">
              Feature No.{features[activeIndex].id}
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold mt-2">
              {features[activeIndex].title}
            </h3>
            <ul className="mt-4 text-gray-600 space-y-3 sm:space-y-2">
              {features[activeIndex].description.map((point, idx) => (
                <li key={idx} className="list-disc ml-5 text-base sm:text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-6 mt-8 sm:mt-6">
            <button
              onClick={prevFeature}
              disabled={activeIndex === 0}
              className={`px-6 py-3 rounded-xl bg-blue-100 text-blue-600 text-2xl font-bold touch-manipulation ${
                activeIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              ←
            </button>
            <button
              onClick={nextFeature}
              disabled={activeIndex === features.length - 1}
              className={`px-6 py-3 rounded-xl bg-blue-100 text-blue-600 text-2xl font-bold touch-manipulation ${
                activeIndex === features.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              →
            </button>
          </div>
        </div>

        {/* Middle: Sticky Phone */}
        <div className="w-full md:w-1/3 flex justify-center my-8 md:my-0 md:sticky md:top-20">
          <img
            src={features[activeIndex].image}
            alt="Phone"
            className="w-64 sm:w-72 md:w-full max-h-[500px] object-contain transition-all duration-500"
          />
        </div>

        {/* Right Side: Clickable List */}
        <div className="w-full md:w-1/3 px-6 py-8 sm:py-12">
          <h3 className="font-bold mb-4 text-lg sm:text-xl">Feature Showcase</h3>
          <ul className="space-y-6 sm:space-y-8">
            {features.map((f, idx) => (
              <li
                key={f.id}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer pl-3 sm:pl-2 border-l-4 py-3 sm:py-2 rounded-md transition-all ${
                  activeIndex === idx
                    ? "border-blue-600 font-bold text-gray-800 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Feature {f.id} : {f.title.split(" - ")[1]}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
