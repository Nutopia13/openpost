import Link from "next/link";
import { HeartIcon } from "../assets/Icons";

const Tutorial = () => {
  return (
    <div className="flex flex-col md:mx-11  mt-5 mx-6 max-w-[1100px] lg:mx-auto">
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
       
          <h2 className="text-xl font-bold pb-2">Open Post Blog Platform</h2>
          a new blog
          platform that encourages you to share your code and discuss it. 
          Here at Open Post, our primary goal is to make sure you have a great
          experience with our platform. 
    
   
       
          <h2 className="text-xl font-bold py-4">What can you do with Open Post?</h2>
   
           <ul className="pb-4 list-disc space-y-2">
              <li>Share your code.</li>
              <li>Discuss your code.</li>
              <li>Get feedback on your code.</li>
              <li>Get help with your code.</li>
              <li>Get inspired by other people's code.</li>
              <li>Have fun !</li>

           </ul>
      
           <p className="text-[12px] opacity-60  ">P.s This is the beta version, if you have
          any feedback or suggestions please let me know. You can do it by email
          or opening an issue on GitHub.</p>
      </div>
    </div>
  );
};

export default Tutorial;
