import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Navbar from "../components/Navbar";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import ScrollToTopButton from "../components/ScrollToTop";

const AboutPage: React.FC = () => {
  const fullText = `
       <h1> About Our Platform</h1> <br /><br />

        Welcome to JAMBlock, a revolutionary platform designed to transform how students prepare for JAMB, UTME,  other external exams and  academic challenges. Our mission is to combine education and innovation, offering a unique experience where students not only practice and excel but also earn real rewards for their achievements.<br /><br />

        On our platform, users can participate in carefully curated practice tasks and tests that simulate real exam scenarios. These tasks are time-limited, fostering a competitive and engaging environment. The top performers, based on speed and accuracy, share tokenized rewards, motivating students to push their boundaries and achieve excellence.<br /><br />

        We believe in empowering students through knowledge and incentives. By integrating blockchain technology, we ensure transparency, fairness, and security in our reward system, giving every participant a chance to be recognized and rewarded for their efforts.<br /><br />

        Join us to prepare smarter, compete with confidence, and earn rewards that make your hard work truly worthwhile. JAMBlock—where learning meets opportunity!
    `;

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 50); // Adjust the speed here (in milliseconds)
    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 text-white p-10 rounded-lg shadow-lg">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <img
            src="https://pbs.twimg.com/profile_images/1878416738628280320/ZvpJSk-__400x400.jpg"
            alt="Owner"
            className="w-24 h-24 rounded-full mx-auto border-4 border-gray-400"
          />
          <h2 className="text-xl font-semibold mt-4">Jamblock</h2>
          <p className="text-gray-400">Bringing Education on-chain </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://x.com/JAMBlocc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 text-2xl"
          >
            <FaTwitter />
          </a>
          {/* <a
            href="https://www.linkedin.com/in/moses-sunday/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-400 text-2xl"
          >
            <FaLinkedin />
          </a> */}
          {/* <a
            href="https://github.com/Moses-main"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-400 text-2xl"
          >
            <FaGithub />
          </a> */}
        </div>

        {/* About Text */}
        <p
          className="text-justify w-[80%] text-bold mx-auto"
          dangerouslySetInnerHTML={{ __html: displayedText }}
        />
      </div>
      <ScrollToTopButton />
      <BottomNav />
    </div>
  );
};

export default AboutPage;
