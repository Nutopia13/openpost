// @ts-nocheck
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../Components/Header";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/authhook";
import { Toaster } from "react-hot-toast";
import Layout from "../Components/Layout";
import { ThemeProvider } from "next-themes";
import Footer from "../Components/Footer";
import { AnimatePresence } from "framer-motion";
function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider attribute="class">
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
