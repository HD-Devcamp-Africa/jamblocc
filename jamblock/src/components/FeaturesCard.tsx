import React from "react";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    title: "JAMB ",
    subtitle: "Joint Admissions and Matriculation Board",
    description:
      "An entrance examination body in Nigeria responsible for conducting the Unified Tertiary Matriculation Examination (UTME). JAMB evaluates candidates on core subjects and serves as a gateway for admission into tertiary institutions, such as universities, polytechnics, and colleges of education.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 0 1-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM4 21a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z",
    color: "text-green-500",
  },
  {
    id: 2,
    title: "Post-UTME ",
    subtitle: "Post-Unified Tertiary Matriculation Examination",
    description:
      "A supplementary screening process conducted by individual universities or institutions in Nigeria. It further evaluates JAMB-qualified candidates to determine their suitability for admission based on specific institutional requirements.",
    icon: "M3 10h18M3 14h18",
    color: "text-blue-500",
  },
  {
    id: 3,
    title: "WAEC ",
    subtitle: "West African Examinations Council",
    description:
      "A standardized examination taken by secondary school students in West Africa to certify their academic proficiency and qualify for higher education. WAEC assesses a range of subjects, serving as the foundational credential for university and college applications.",
    icon: "M12 4v16m8-8H4",
    color: "text-blue-600",
  },
];

function FeaturesCard() {
  return (
    <div className="bg-gray-900 text-white font-sans ">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {data.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 2, delay: 1.5 }}
              key={item.id}
              className="card border border-red-100 rounded-md transition duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="p-6 rounded-lg">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${item.color}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  <div className="text-center">
                    <h2 className="ml-4 md:text-xl font-bold">{item.title}</h2>

                    <h4 className="md:text-lg text-purple-200 text-sm font-bold">
                      {item.subtitle}
                    </h4>
                  </div>
                </div>
                <p className="mt-2 text-gray-400 text-sm text-justify">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default FeaturesCard;
