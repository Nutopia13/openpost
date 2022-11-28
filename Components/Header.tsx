// @ts-nocheck
import Link from "next/link";
import { DarkMode, LightMode, UserIcon } from "../assets/Icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { motion as m } from "framer-motion";
import { useTheme } from "next-themes";
import Button from "./ButtonHeader";

const Header = () => {
  const { user, username } = useContext(UserContext);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeSwitcher = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "light") {
      return (
        <DarkMode
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            setTheme("dark");
          }}
        />
      );
    } else {
      return (
        <LightMode
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            setTheme("light");
          }}
        />
      );
    }
  };

  return (
    <m.header
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{
        duration: 4,
        type: "spring",
        stiffness: 120,
        damping: 40,
      }}
      className="bg-white dark:bg-primary_pale_dark border-b-2  dark:border-none rounded-b-[40px] border-grey"
    >
      <nav className="py-4 flex max-w-[1110px] mx-auto items-center justify-between lg:px-0 md:px-10 px-6">
        <Link href="/">
          <m.h3
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 text-xl font-extrabold text-white bg-black rounded-md "
          >
            OP
          </m.h3>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex">{renderThemeSwitcher()}</div>
          {username && (
            <>
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={signOut}
                className="hidden px-6 py-2 font-bold text-white rounded-md bg-accent_blue md:block"
              >
                Sign Out
              </m.button>
              <Link href="/admin">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 font-bold text-white rounded-md bg-accent_blue"
                >
                  Write Post
                </m.button>
              </Link>
              <Link href={`/${username}`} className="hidden md:block ">
                {user ? (
                  <img
                    src={`https://robohash.org/${username}.png`}
                    alt="User Photo"
                    className="w-12 rounded-full bg-slate-500"
                  />
                ) : (
                  <div className="p-2 rounded-full bg-accent_blue">
                    <UserIcon />
                  </div>
                )}
              </Link>
            </>
          )}
          {!username && (
            <Link href="/enter">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-2 font-bold text-white rounded-md bg-accent_blue"
              >
                Log In
              </m.button>
            </Link>
          )}
        </div>
      </nav>
    </m.header>
  );
};

export default Header;
