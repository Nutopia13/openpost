import Link from "next/link";
import React from "react";
import { HeartIcon } from "../assets/Icons";
import ReactMarkdown from "react-markdown";

const Tutorial = () => {
  return (
    <div className="flex flex-col  mt-5 mx-6 max-w-[1100px] md:mx-auto">
      <div className="text-center md:text-left">
        <h1 className=" font-bold text-2xl">Guide to Mastering Open Blog</h1>
        <span className="text-sm text-slate-400">
          Written by{" "}
          <Link href={`/index`} className="text-accent_blue font-bold">
            @founder
          </Link>{" "}
          on 24/11/2022
          <aside className="flex items-center md:justify-start justify-center space-x-3">
            <p className="pt-2">🔹6 min</p>
            <p>
              <strong className="flex text-black items-center dark:text-white gap-x-1 mt-3">
                5 <HeartIcon />
              </strong>
            </p>
          </aside>
        </span>
      </div>
      <div className="bg-white mt-6 text-black dark:text-white dark:bg-primary_pale_dark rounded-md p-5">
      <ReactMarkdown>Hello World</ReactMarkdown>
      </div>
    </div>
  );
};

export default Tutorial;
