"use client";

import { useState } from "react";

type FileCategory = "Image" | "Video" | "Document" | "Brand Asset";
type CategoryFilter = "All" | "Images" | "Videos" | "Documents" | "Brand Assets";

interface MediaAsset {
  id: number;
  filename: string;
  client: string;
  category: FileCategory;
  size: string;
  date: string;
  extension: string;
}

const assets: MediaAsset[] = [
  { id: 1, filename: "Acadia Logo Primary.svg", client: "Acadia Bakes", category: "Brand Asset", size: "245 KB", date: "Jun 15, 2025", extension: "SVG" },
  { id: 2, filename: "Summer Menu Photo 1.jpg", client: "Acadia Bakes", category: "Image", size: "3.2 MB", date: "Jul 1, 2025", extension: "JPG" },
  { id: 3, filename: "BTS Reel Raw.mp4", client: "Acadia Bakes", category: "Video", size: "128 MB", date: "Jun 28, 2025", extension: "MP4" },
  { id: 4, filename: "Brand Guidelines v2.pdf", client: "Velour Collective", category: "Document", size: "4.8 MB", date: "May 20, 2025", extension: "PDF" },
  { id: 5, filename: "Product Hero Shot.jpg", client: "Meridian Foods", category: "Image", size: "5.1 MB", date: "Jun 22, 2025", extension: "JPG" },
  { id: 6, filename: "Logo White.png", client: "Nomad Studio", category: "Brand Asset", size: "89 KB", date: "Mar 15, 2025", extension: "PNG" },
  { id: 7, filename: "Social Template.psd", client: "Sola Health", category: "Brand Asset", size: "12.4 MB", date: "Jun 1, 2025", extension: "PSD" },
  { id: 8, filename: "Testimonial Graphic.jpg", client: "Acadia Bakes", category: "Image", size: "1.8 MB", date: "Jul 2, 2025", extension: "JPG" },
  { id: 9, filename: "Recipe Video Final.mp4", client: "Acadia Bakes", category: "Video", size: "95 MB", date: "Jun 25, 2025", extension: "MP4" },
  { id: 10, filename: "Caf\u00e9 Interior.jpg", client: "Lune Caf\u00e9", category: "Image", size: "4.2 MB", date: "Jun 18, 2025", extension: "JPG" },
  { id: 11, filename: "Logo Refresh Draft.ai", client: "Apex Creative", category: "Brand Asset", size: "2.1 MB", date: "Jul 5, 2025", extension: "AI" },
  { id: 12, filename: "Monthly Report Template.pdf", client: "Sola Health", category: "Document", size: "890 KB", date: "Jun 30, 2025", extension: "PDF" },
];

const categoryFilters: { label: CategoryFilter; count: number }[] = [
  { label: "All", count: 12 },
  { label: "Images", count: 4 },
  { label: "Videos", count: 2 },
  { label: "Documents", count: 2 },
  { label: "Brand Assets", count: 4 },
];

const clientOptions = ["All Clients", "Acadia Bakes", "Velour Collective", "Meridian Foods", "Nomad Studio", "Sola Health", "Lune Caf\u00e9", "Apex Creative"];

function categoryMatchesFilter(category: FileCategory, filter: CategoryFilter): boolean {
  if (filter === "All") return true;
  if (filter === "Images") return category === "Image";
  if (filter === "Videos") return category === "Video";
  if (filter === "Documents") return category === "Document";
  if (filter === "Brand Assets") return category === "Brand Asset";
  return false;
}

function getCategoryBadgeStyle(category: FileCategory): string {
  switch (category) {
    case "Image":
      return "bg-amber-10 text-amber";
    case "Video":
      return "bg-ember-15 text-ember";
    case "Document":
      return "bg-ivory-05 text-ivory-30";
    case "Brand Asset":
      return "bg-crimson-30 text-crimson";
  }
}

function CategoryIcon({ category }: { category: FileCategory }) {
  const cls = "text-ivory-10";
  switch (category) {
    case "Image":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={cls}>
          <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 22L10 16.5L14.5 21L19 17L28 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Video":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={cls}>
          <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 11.5V20.5L21.5 16L13 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "Document":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={cls}>
          <path d="M8 4H19L24 9V28H8V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M19 4V9H24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 15H20M12 19H20M12 23H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Brand Asset":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={cls}>
          <path d="M16 3L19.7 10.5L28 11.7L22 17.5L23.4 25.8L16 21.8L8.6 25.8L10 17.5L4 11.7L12.3 10.5L16 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function MediaLibraryPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [clientFilter, setClientFilter] = useState("All Clients");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAssets = assets.filter((asset) => {
    if (!categoryMatchesFilter(asset.category, activeCategory)) return false;
    if (clientFilter !== "All Clients" && asset.client !== clientFilter) return false;
    if (search && !asset.filename.toLowerCase().includes(search.toLowerCase()) && !asset.client.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-[68px] flex items-center justify-between px-8 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">Media Library</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">Assets across all clients</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ivory-30"
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[240px] pl-8 pr-3 py-2 rounded-[2px] border border-ivory-05 bg-ivory-05/50 text-sm font-body text-ivory placeholder:text-ivory-30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>

          {/* Upload button */}
          <button className="px-4 py-2 rounded-[2px] bg-amber text-graphite text-sm font-body font-semibold hover:bg-amber/90 transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 11V3M4 5.5L7 2.5L10 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 10V11.5H12V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Upload
          </button>

          {/* View toggle */}
          <div className="flex items-center rounded-[2px] border border-ivory-05 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-ivory-05 text-ivory" : "text-ivory-30 hover:text-ivory"}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
                <rect x="9" y="1" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
                <rect x="1" y="9" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
                <rect x="9" y="9" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-ivory-05 text-ivory" : "text-ivory-30 hover:text-ivory"}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 3H15M1 8H15M1 13H15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <div className="shrink-0 flex items-center justify-between px-8 py-3 border-b border-ivory-05">
        <div className="flex items-center gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-body transition-colors ${
                activeCategory === cat.label
                  ? "bg-amber-10 text-amber"
                  : "bg-ivory-05/50 text-ivory-30 hover:text-ivory hover:bg-ivory-05"
              }`}
            >
              {cat.label}
              <span className="ml-1 opacity-60">{cat.count}</span>
            </button>
          ))}
        </div>
        <select
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          className="px-3 py-1.5 rounded-[2px] border border-ivory-05 bg-ivory-05/50 text-xs font-body text-ivory focus:outline-none focus:border-amber transition-colors appearance-none cursor-pointer"
        >
          {clientOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Media grid */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden hover:border-amber transition group cursor-pointer"
            >
              {/* Preview area */}
              <div className="aspect-[4/3] bg-graphite flex flex-col items-center justify-center gap-2">
                <CategoryIcon category={asset.category} />
                <span className="text-[10px] font-body text-ivory-10 uppercase tracking-wider">
                  {asset.extension}
                </span>
              </div>

              {/* Info area */}
              <div className="p-4">
                <p className="text-sm font-body text-ivory truncate">{asset.filename}</p>
                <p className="text-xs font-body text-ivory-30 mt-0.5">{asset.client}</p>
                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`text-[10px] font-body rounded-[1px] px-1.5 py-0.5 ${getCategoryBadgeStyle(asset.category)}`}
                  >
                    {asset.category}
                  </span>
                  <span className="text-xs font-body text-ivory-30">{asset.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
