import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo & Video Gallery | FrameFlow",
  description:
    "Stills from FrameFlow shoots for Ontario businesses: restaurant and food photography, furniture and interiors, hospitality properties and event coverage.",
};

export default function Page() {
  return <GalleryClient />;
}
