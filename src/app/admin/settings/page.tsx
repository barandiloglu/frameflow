"use client";

import { useState } from "react";

const defaultCompany = {
  name: "FrameFlow Digital",
  email: "hello@frameflow.ca",
  phone: "+1 (416) 555-0100",
  address: "99 Yorkville Ave Unit 200, Toronto, ON",
  website: "frameflow.ca",
};

const defaultNotifications = [
  { id: "approvals", label: "Email notifications for new approvals", description: "Get notified when a client submits content for approval", enabled: true },
  { id: "messages", label: "Email notifications for client messages", description: "Receive emails when clients send new messages", enabled: true },
  { id: "weekly", label: "Weekly summary reports", description: "Get a weekly digest of performance across all clients", enabled: true },
  { id: "slack", label: "Slack integration alerts", description: "Push notifications to your connected Slack workspace", enabled: false },
];

const integrations = [
  { name: "Google Drive", description: "Sync client assets", connected: true },
  { name: "Slack", description: "Get notifications in Slack", connected: false },
  { name: "Google Analytics", description: "Import analytics data", connected: false },
];

export default function SettingsPage() {
  const [company, setCompany] = useState(defaultCompany);
  const [notifications, setNotifications] = useState(defaultNotifications);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-[68px] flex items-center justify-between px-8 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">Settings</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">Manage your workspace</p>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Section 1: Company Profile */}
        <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-ivory-05">
            <h2 className="font-display font-semibold text-sm text-ivory">Company Profile</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-ivory-30 mb-1.5 block font-body">
                Company Name
              </label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full bg-ivory-05 border border-ivory-10 rounded-[2px] px-3 py-2.5 text-sm text-ivory font-body placeholder:text-ivory-30 focus:border-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-ivory-30 mb-1.5 block font-body">
                Email
              </label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full bg-ivory-05 border border-ivory-10 rounded-[2px] px-3 py-2.5 text-sm text-ivory font-body placeholder:text-ivory-30 focus:border-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-ivory-30 mb-1.5 block font-body">
                Phone
              </label>
              <input
                type="tel"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                className="w-full bg-ivory-05 border border-ivory-10 rounded-[2px] px-3 py-2.5 text-sm text-ivory font-body placeholder:text-ivory-30 focus:border-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-ivory-30 mb-1.5 block font-body">
                Address
              </label>
              <input
                type="text"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="w-full bg-ivory-05 border border-ivory-10 rounded-[2px] px-3 py-2.5 text-sm text-ivory font-body placeholder:text-ivory-30 focus:border-amber focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-ivory-30 mb-1.5 block font-body">
                Website
              </label>
              <input
                type="text"
                value={company.website}
                onChange={(e) => setCompany({ ...company, website: e.target.value })}
                className="w-full bg-ivory-05 border border-ivory-10 rounded-[2px] px-3 py-2.5 text-sm text-ivory font-body placeholder:text-ivory-30 focus:border-amber focus:outline-none transition-colors"
              />
            </div>
            <div className="pt-2">
              <button className="h-9 px-5 rounded-[2px] bg-amber text-graphite text-sm font-body font-semibold hover:bg-amber/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-ivory-05">
            <h2 className="font-display font-semibold text-sm text-ivory">Notifications</h2>
          </div>
          <div className="px-5">
            {notifications.map((n, i) => (
              <div
                key={n.id}
                className={`flex items-center justify-between py-4 ${
                  i < notifications.length - 1 ? "border-b border-ivory-05" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-body text-ivory">{n.label}</p>
                  <p className="text-xs font-body text-ivory-30 mt-0.5">{n.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(n.id)}
                  className={`w-10 h-5 rounded-full relative transition-colors shrink-0 ml-4 ${
                    n.enabled ? "bg-amber" : "bg-ivory-10"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      n.enabled ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Integrations */}
        <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-ivory-05">
            <h2 className="font-display font-semibold text-sm text-ivory">Integrations</h2>
          </div>
          <div className="px-5">
            {integrations.map((integration, i) => (
              <div
                key={integration.name}
                className={`flex items-center gap-4 py-4 ${
                  i < integrations.length - 1 ? "border-b border-ivory-05" : ""
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    integration.connected ? "bg-[#4ade80]" : "bg-ivory-30"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-semibold text-ivory">{integration.name}</p>
                  <p className="text-xs font-body text-ivory-30 mt-0.5">{integration.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {integration.connected ? (
                    <span className="text-xs font-body text-[#4ade80] mr-2">Connected</span>
                  ) : (
                    <span className="text-xs font-body text-ivory-30 mr-2">Not connected</span>
                  )}
                  <button
                    className={`h-8 px-3 rounded-[2px] text-xs font-body font-semibold transition-colors ${
                      integration.connected
                        ? "bg-ivory-05 border border-ivory-10 text-ivory-60 hover:bg-ivory-10"
                        : "bg-amber text-graphite hover:bg-amber/90"
                    }`}
                  >
                    {integration.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Danger Zone */}
        <div className="rounded-[2px] border border-ember/20 bg-ivory-05/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-ember/20">
            <h2 className="font-display font-semibold text-sm text-ivory">Danger Zone</h2>
          </div>
          <div className="px-5 py-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-body font-semibold text-ivory">Delete Workspace</p>
              <p className="text-xs font-body text-ivory-30 mt-0.5">Permanently delete all data</p>
            </div>
            <button className="h-8 px-4 rounded-[2px] bg-ember text-ivory text-xs font-body font-semibold hover:bg-ember/90 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
