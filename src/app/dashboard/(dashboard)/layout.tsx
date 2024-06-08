import { LoadingPage } from "../components/loading-page";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import ProviderSession from "../components/ProviderSession";
import { Suspense } from "react";
import NextNProgress from "nextjs-progressbar";
import ToastNotification from "@/app/(home)/components/ToastNotification";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={(inter.className, "bg-[#F1F5F9]")}
      >
        <ToastNotification />
        <ProviderSession>
          <div className="h-full">
            <div className="h-[80px] pl-56 max-lg:pl-0 fixed inset-y-0 w-full z-40">
              <Navbar />
            </div>
            <div className="max-lg:hidden  w-56 flex-col fixed inset-y-0 z-40">
              <Sidebar />
            </div>
            {/* <LoadingWidget /> */}
            <main className="pl-56 max-lg:pl-0 pt-[80px] h-screen">
              {children}
            </main>
          </div>
        </ProviderSession>
      </body>
    </html>
  );
}