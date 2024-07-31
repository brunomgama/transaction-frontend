import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { Background } from "@/app/background";
import Sidebar from "@/app/component/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance",
  description: "Finance app",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers>
        <Background>
          <div className="h-full flex">
            <div className="w-1/5">
              <Sidebar />
            </div>
            <div className="flex-1">
              <main className="p-4">
                {children}
              </main>
            </div>
          </div>
        </Background>
      </Providers>
      </body>
      </html>
  );
}
