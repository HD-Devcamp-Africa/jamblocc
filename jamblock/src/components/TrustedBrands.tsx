import React from "react";

interface Brand {
  imageSrc: string;
  lightImageSrc: string;
  altText: string;
  link: string;
}

const brandsData: Brand[] = [
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids-white.svg",
    altText: "graygrids",
    link: "#",
  },
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/lineicons.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/lineIcons-white.svg",
    altText: "lineicons",
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck-white.svg",
    altText: "uideck",
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui-white.svg",
    altText: "ayroui",
    link: "#",
  },
];

const TrustedBrands: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-[120px] dark:bg-dark">
      <div className="overflow-hidden">
        <div className="relative flex animate-scroll">
          {/* Duplicate the brand data to create a seamless loop */}
          {[...brandsData, ...brandsData].map((brand, index) => (
            <SingleImage key={index} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SingleImageProps {
  brand: Brand;
}

const SingleImage: React.FC<SingleImageProps> = ({ brand }) => {
  const { link, imageSrc, lightImageSrc, altText } = brand;
  return (
    <a
      href={link}
      className="mx-4 flex w-[750px] items-center justify-center py-15 sm:w-[200px] 2xl:w-[230px] text-50"
    >
      <img
        src={imageSrc}
        alt={altText}
        className="h-48 w-full dark:hidden sm:h-14"
      />
      <img
        src={lightImageSrc}
        alt={altText}
        className="hidden h-48 w-full dark:block sm:h-14"
      />
    </a>
  );
};

export default TrustedBrands;
