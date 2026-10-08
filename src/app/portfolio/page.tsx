import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | FrameFlow",
  description:
    "Brand, website, video and campaign work for Toronto businesses, including immigration consultancies, accounting firms and restaurants.",
};

export default function Page() {
  return <PortfolioClient />;
}
