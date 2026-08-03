import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  variable: "--ff-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${inter.className} ${jakarta.variable} ${fraunces.variable} ${dmSans.variable} ${jetMono.variable}`} suppressHydrationWarning>
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
