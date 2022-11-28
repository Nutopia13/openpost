import Link from "next/link";
import { HeartIcon } from "../assets/Icons";
import Layout from "../Components/Layout";

const Tutorial = () => {
  return (
    <Layout>
      <main className="flex flex-col md:mx-11  mt-5 mx-6 max-w-[1100px] lg:mx-auto">
        <section className="text-center md:text-left">
          <h1 className="text-2xl font-bold ">Guide to Mastering Open Blog</h1>
          <span className="text-sm text-slate-400">
            Written by{" "}
            <Link href={`/index`} className="font-bold text-accent_blue">
              @founder
            </Link>{" "}
            on 24/11/2022
            <aside className="flex items-center justify-center space-x-3 md:justify-start">
              <p className="pt-2">🔹6 min</p>
              <p>
                <strong className="flex items-center mt-3 text-black dark:text-white gap-x-1">
                  5 <HeartIcon />
                </strong>
              </p>
            </aside>
          </span>
        </section>
        <div className="p-5 mt-6 text-black bg-white rounded-md dark:text-white dark:bg-primary_pale_dark">
          <h2 className="pb-2 text-xl font-bold">Open Post Blog Platform</h2>a
          new blog platform that encourages you to share your code and discuss
          it. Here at Open Post, our primary goal is to make sure you have a
          great experience with our platform.
          <h2 className="py-4 text-xl font-bold">
            What can you do with Open Post?
          </h2>
          <ul className="pb-4 space-y-2 list-disc">
            <li>Share your code.</li>
            <li>Discuss your code.</li>
            <li>Get feedback on your code.</li>
            <li>Get help with your code.</li>
            <li>Get inspired by other people's code.</li>
            <li>Have fun !</li>
          </ul>
          <p className="text-[12px] opacity-60  ">
            P.s This is the beta version, if you have any feedback or
            suggestions please let me know. You can do it by email or opening an
            issue on GitHub.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default Tutorial;
