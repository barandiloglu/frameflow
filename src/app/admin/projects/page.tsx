"use client";

import { useState } from "react";

interface Project {
  id: number;
  name: string;
  plan: string;
  status: string;
  progress: number;
  due: string;
  team: string[];
}

const projects: Project[] = [
  { id: 1, name: "Acadia Bakes — Social Media Retainer", plan: "Growth Plan", status: "Active", progress: 75, due: "Ongoing", team: ["Sara M.", "Alex K."] },
  { id: 2, name: "Nomad Studio — Website Redesign", plan: "Enterprise", status: "Active", progress: 60, due: "Aug 2025", team: ["Jordan P.", "Alex K."] },
  { id: 3, name: "Velour Collective — Q3 Campaign", plan: "Growth Plan", status: "Active", progress: 40, due: "Sep 2025", team: ["Sara M."] },
  { id: 4, name: "Sola Health — Meta Ads Setup", plan: "Growth Plan", status: "Active", progress: 85, due: "Jul 2025", team: ["Alex K."] },
  { id: 5, name: "Birchfield Co. — Brand + Web Package", plan: "Starter Plan", status: "Active", progress: 15, due: "Oct 2025", team: ["Jordan P.", "Alex K."] },
  { id: 6, name: "Meridian Foods — Video Production", plan: "Growth Plan", status: "Active", progress: 50, due: "Aug 2025", team: ["Alex K."] },
  { id: 7, name: "Harbor Digital — App Development", plan: "Enterprise", status: "Active", progress: 30, due: "Dec 2025", team: ["Jordan P."] },
  { id: 8, name: "Apex Creative — Logo Refresh", plan: "Starter Plan", status: "Active", progress: 90, due: "Jul 2025", team: ["Alex K."] },
];

const statusOptions = ["All", "Active"];

function planBadgeClass(plan: string) {
  switch (plan) {
    case "Enterprise":
      return "bg-amber-20 text-amber";
    case "Growth Plan":
      return "bg-ivory-10 text-ivory";
    case "Starter Plan":
      return "bg-ivory-05 text-ivory-30";
    default:
      return "bg-ivory-10 text-ivory-60";
  }
}

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered =
    statusFilter === "All"
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-8 py-5 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">Projects</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">
            {projects.filter((p) => p.status === "Active").length} active projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-body rounded-[1px] bg-ivory-05 border border-ivory-10 text-ivory-60 focus:outline-none focus:border-amber appearance-none cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All" ? "All Statuses" : opt}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 text-xs font-body font-semibold rounded-[1px] bg-amber text-graphite hover:brightness-110 transition">
            + New Project
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-semibold text-sm text-ivory leading-snug">
                  {project.name}
                </h3>
                <span
                  className={`shrink-0 px-2.5 py-0.5 text-[10px] font-semibold font-body rounded-full ${planBadgeClass(
                    project.plan
                  )}`}
                >
                  {project.plan}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase">
                    Progress
                  </p>
                  <p className="text-xs font-body text-ivory-60">{project.progress}%</p>
                </div>
                <div className="w-full h-1.5 rounded-full bg-ivory-10">
                  <div
                    className="h-full rounded-full bg-amber transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Details row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-xs text-ivory-30">Due: {project.due}</p>
                  <p className="text-xs text-ivory-60">{project.team.join(", ")}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-body text-ivory-60">{project.status}</span>
                </div>
              </div>

              {/* View Details link */}
              <div>
                <a href="#" className="text-xs font-body text-amber hover:text-amber/80 transition-colors">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
