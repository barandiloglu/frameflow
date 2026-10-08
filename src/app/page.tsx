import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "FrameFlow | Toronto Creative & Digital Marketing Agency",
  description:
    "Toronto studio for brand identity, websites, social media, video and SEO. We help growing businesses get found on Google and in AI search.",
};

export default function Page() {
  return <HomeClient />;
}
