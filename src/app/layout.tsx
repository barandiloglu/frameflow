import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "FrameFlow — Your Sincere Growth Partner",
  description:
    "FrameFlow is a Toronto-based creative agency specializing in brand identity, web design, social media, and digital marketing for small and medium-sized businesses.",
  icons: {
    icon: "/logo_icon.png",
    apple: "/logo_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ff-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-body">
        <ThemeProvider>
          <CustomCursor />
          <ScrollProgress />
          <ScrollToTop />
          <GrainOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
