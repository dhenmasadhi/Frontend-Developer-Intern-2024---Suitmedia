import { useEffect, useRef } from "react";
import bannerImage from "../assets/banner.jpg";

const Banner = () => {
  const parallaxRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${
          scrollPosition * 0.5
        }px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${
          scrollPosition * 0.2
        }px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-48 bg-white"
        style={{
          clipPath: "polygon(0 100%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      />

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-white"
      >
        <p className="text-5xl font-semibold">Ideas</p>
        <p className="text-xl font-normal">Where all our great things begin</p>
      </div>
    </div>
  );
};

export default Banner;
