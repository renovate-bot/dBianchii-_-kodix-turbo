import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import type { AppType } from "next/app";

import { Toaster } from "@kdx/ui";

import Footer from "~/components/Footer/footer";
import Header from "~/components/Header/Header";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ThemeSwitcher } from "~/components/theme-switcher";
import {
  NextAuthProvider,
  NextThemeProvider,
  TRPCReactProvider,
} from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  // const routesLayoutNotNeeded = ["/signIn", "/newUser"];
  // const isLayoutNotNeeded = true;

  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider>
          <NextAuthProvider>
            <NextThemeProvider>
              <Header />
              {props.children}
              <Footer />
              <Toaster />
            </NextThemeProvider>
          </NextAuthProvider>

          {/* UI Design Helpers */}
          {process.env.NODE_ENV !== "production" && (
            <div className="fixed bottom-1 left-20 z-50 flex flex-row items-center space-x-1">
              <div className="flex">
                <ThemeSwitcher />
              </div>
              <TailwindIndicator />
            </div>
          )}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
