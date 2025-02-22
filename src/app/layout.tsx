import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/lib/menu/Sidebar";
import TopMenu from "@/lib/menu/TopMenu";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gestão de Condomínio",
  description: "Gestor de condomínio",
  icons: {
    icon: '/favicon/favicon.ico',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  return (
    <html lang="en">
      <body className={`flex flex-col bg-slate-50 min-h-screen ${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex flex-row w-full h-full">
          <Sidebar isValidUser={token ? true : false} />
          <main className="flex-1 h-full">
            <TopMenu isValidUser={token ? true : false} />
            <ToastContainer className="mt-10 screen-mobile:mt-0" />
            <div className="p-4">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
