import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/contexts/form-context";
import type React from "react";
import NavBar from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description: "Generate your conference ticket",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <FormProvider>
          <div className="main-container h-full w-full pt-6">
            <NavBar />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </FormProvider>
      </body>
    </html>
  );
}
