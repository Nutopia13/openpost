import { motion as m } from "framer-motion";
import Link from "next/link";
import { Crown, HeartIcon } from "../assets/Icons";

const StaticPostCont = () => {
  return (
    <m.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      className="relative z-50 bg-white rounded-md shadow-sm dark:bg-primary_pale_dark md:mx-0"
    >
      <div className="absolute flex items-center right-4 top-3">
        <HeartIcon />
        <p className="text-sm text-black dark:text-white">5</p>
        <p className="text-sm font-bold text-black dark:text-white"></p>
      </div>
      <Link href={`/tutorial`}>
        <div className="relative flex flex-col p-8 space-y-2 text-cont">
          <p className="font-bold text-primary_pale">Article</p>
          <h4 className="text-xl font-bold text-black dark:text-white h-11">
            Guide to Mastering Open Blog
          </h4>
          <p className="relative h-24 pt-4 overflow-hidden text-black dark:text-white">
            A new blog platform that encourages you to share your code and
            discuss it.
          </p>
          <Link href={`/tutorial`}>
            <div className="bottom-0 flex items-center pt-6 space-x-5">
              <img
                src={`https://robohash.org/Founder.png`}
                alt=""
                className="rounded-full w-14 bg-slate-500"
              ></img>
              <div>
                <p className="font-bold text-accent_blue">@founder</p>
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
