import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Outfit } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const outfit = Outfit({
  weight: ["300", "500"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // <SessionProvider session={session}>
    <main className={outfit.className}>
      <Component {...pageProps} />
    </main>
    // </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
