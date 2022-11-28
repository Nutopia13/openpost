import React from "react";
import { Github } from "../assets/Icons";

const Footer = () => {
  return (
    <footer className="flex items-center justify-end w-full mt-24 mb-4">
      <div className="mx-6">
        <a href="https://github.com/Nutopia13" target="_blank">
          <Github />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
