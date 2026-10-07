import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { Navbar } from "@/components/nav/Navbar";
import { BottomNav } from "@/components/nav/BottomNav";
import { HelpFab } from "@/components/HelpFab";
import { PwaRegister } from "@/components/PwaRegister";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bistró Mecha — Toluca",
  description:
    "Gastronomía, experiencias y momentos que merecen quedarse. Reserva tu mesa, explora el menú digital y vive Bistró Mecha desde tu celular.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bistró Mecha",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBFAF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-ivory font-sans text-graphite antialiased bg-grain">
        <AppProvider>
          <PwaRegister />
          <Navbar />
          <HelpFab />
          <main className="min-h-dvh pb-24 pt-0 md:pb-0 md:pt-20">
            <PageTransition>{children}</PageTransition>
            <Footer />
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
