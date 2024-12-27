import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Navbar from "../components/Navbar";

const AboutPage: React.FC = () => {
  const fullText = `
         <h1 className="font-bold text-2xl">About Our Platform</h1> <br /><br />

            <p className="font-bold text-lg">
            Welcome to JAMBlock, a revolutionary platform designed to transform how students prepare for JAMB and other academic challenges. Our mission is to combine education and innovation, offering a unique experience where students not only practice and excel but also earn real rewards for their achievements.<br /><br />

            On our platform, users can participate in carefully curated practice tasks and tests that simulate real exam scenarios. These tasks are time-limited, fostering a competitive and engaging environment. The top performers, based on speed and accuracy, share tokenized rewards, motivating students to push their boundaries and achieve excellence.<br /><br />

            We believe in empowering students through knowledge and incentives. By integrating blockchain technology, we ensure transparency, fairness, and security in our reward system, giving every participant a chance to be recognized and rewarded for their efforts.<br /><br />

            Join us to prepare smarter, compete with confidence, and earn rewards that make your hard work truly worthwhile. JAMBlock—where learning meets opportunity!
            </p>
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
      <div className="bg-purple-900 text-white p-10 rounded-lg shadow-lg">
        <p
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: displayedText }}
        />
        <BottomNav />
      </div>
    </div>
  );
};

export default AboutPage;
