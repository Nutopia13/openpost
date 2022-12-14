import React from "react";
import Image from "next/image";
import HeroImg from "../app/assets/HeroSec.png";
const Hero = () => {
  return (
    <div>
      <div className="bg-accent_blue overflow-hidden relative max-w-[1110px] lg:mx-auto text-white rounded-md my-6 ">
        <div className="z-10 area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="relative z-20 flex p-6">
          <div className="flex flex-col text-left">
            <h1 className="text-2xl font-bold lg:text-4xl">Open Post</h1>
            <p className="pt-5 lg:text-xl max-w-[400px]">
              Blog Platform where you can share your code, read great code and
              discuss it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
