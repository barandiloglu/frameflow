import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact FrameFlow | Toronto Marketing Agency",
  description:
    "Tell us about your project. FrameFlow works with businesses across Toronto and the GTA on branding, websites, content and SEO.",
};

export default function Page() {
  return <ContactClient />;
}
