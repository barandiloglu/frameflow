import type { Metadata } from "next";
import { Quicksand, Inter, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";

// Quicksand is a variable font (300-700), so no weight list is needed. It carries
// every title on the site: --font-display and --font-editorial both resolve to it.
const quicksand = Quicksand({
  variable: "--ff-display",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSans = DM_Sans({
  variable: "--ff-warm",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetMono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="en" className={`${inter.className} ${quicksand.variable} ${dmSans.variable} ${jetMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ff-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <ScrollToTop />
          <GrainOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
