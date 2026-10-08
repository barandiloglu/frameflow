import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About FrameFlow | Toronto Creative Studio & Team",
  description:
    "Meet the team behind FrameFlow, a Toronto creative and marketing studio working with 19+ businesses across professional services, food and construction.",
};

export default function Page() {
  return <AboutClient />;
}
