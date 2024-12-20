import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      const featureItems = document.querySelectorAll(".feature-item");
      featureItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 200); // Staggered effect
      });
    }
  }, [inView]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 feature-grid"
        >
          <div className="p-6 bg-white shadow-lg rounded-lg feature-item">
            <h3 className="text-xl font-bold text-purple-600 mb-2">
              Past Questions
            </h3>
            <p className="text-gray-600">
              Access a large collection of past JAMB questions.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg feature-item">
            <h3 className="text-xl font-bold text-purple-600 mb-2">
              Study Tips
            </h3>
            <p className="text-gray-600">
              Learn effective strategies to boost your exam performance.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg feature-item">
            <h3 className="text-xl font-bold text-purple-600 mb-2">
              Progress Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your progress and stay on top of your game.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
