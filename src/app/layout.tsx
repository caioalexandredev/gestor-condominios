import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/libs/menu/Sidebar";
import TopMenu from "@/libs/menu/TopMenu";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
    return (
        <html lang="en">
            <body className={`flex flex-col bg-slate-50 min-h-screen ${geistSans.variable} ${geistMono.variable}`}>
                <div className="flex flex-row w-full h-full">
                    <Sidebar /> {/* Defina uma largura para o Sidebar */}
                    <main className="flex-1 h-full">
                        <TopMenu />
                        <div className="p-4">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
  );
}
