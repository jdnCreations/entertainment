import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { Outfit } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";

const outfit = Outfit({
  weight: ["300", "500"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    // <SessionProvider session={session}>
    <main
      className={
        outfit.className &&
        "h-full min-h-screen bg-darkest-blue p-4 pt-[80px] text-white md:pt-[96px] lg:pt-[64px]"
      }
    >
      <Navbar />
      <Component {...pageProps} />
    </main>
    // </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
