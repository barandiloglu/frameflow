import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Branding, Web Design, SEO & Social Media Services | FrameFlow",
  description:
    "Eight services, one team: brand identity, logo, websites, apps, social media, video and photo, ad management and SEO for Toronto businesses.",
};

export default function Page() {
  return <ServicesClient />;
}
