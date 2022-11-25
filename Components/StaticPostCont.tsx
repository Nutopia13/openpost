import { motion as m } from "framer-motion";
import Link from "next/link";
import { Crown, HeartIcon } from "../assets/Icons";

const StaticPostCont = () => {
  return (
    <m.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      className="bg-white z-50 dark:bg-primary_pale_dark md:mx-0 shadow-sm relative rounded-md"
    >
      <div className="absolute right-4 top-3 flex  items-center">
        <HeartIcon />
        <p className="text-sm text-black dark:text-white">5</p>
        <p className="text-sm text-black dark:text-white font-bold"></p>
      </div>
      <Link href={`/tutorial`}>
        <div className="text-cont relative p-8 flex flex-col space-y-2">
          <p className="text-primary_pale font-bold">Article</p>
          <h4 className="font-bold text-black dark:text-white text-xl h-11">
            Guide to Mastering Open Blog
          </h4>
          <p className="pt-4 h-24 relative text-black dark:text-white overflow-hidden">
            This is a tutorial of this platform
          </p>
          <Link href={`/tutorial`}>
            <div className="pt-6 flex items-center space-x-5 bottom-0">
           <div>
            <Crown />
           </div>
              <div>
                <p className="text-accent_blue font-bold">@founder</p>
                <p className="text-sm dark:text-white/70 text-black/50">
                  24/11/2022 🔹 6 min read
                </p>
              </div>
            </div>
          </Link>
        </div>
      </Link>
    </m.div>
  );
};

export default StaticPostCont;
