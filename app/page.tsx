import Nav from "./components/Nav";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import AnimateOnScroll from "./components/AnimateOnScroll";

/* ─── Design system
   Navy: #0D1B2A   Gold: #D4AF37   Dark text: #0F172A   Muted: #64748B
   Light bg: #F8FAFC   Section padding: py-24 md:py-36   Width: max-w-5xl
   Light card: bg-white rounded-2xl border border-gray-100 shadow-sm
   Dark card:  background rgba(255,255,255,0.04) border rgba(255,255,255,0.07) rounded-2xl
──────────────────────────────────────────────────────────────────── */

/* ─── Shared primitives ──────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
      style={{ color: "#D4AF37" }}
    >
      {children}
    </p>
  );
}

function Chip({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-lg"
      style={{
        padding: "6px 9px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.38)", lineHeight: 0, flexShrink: 0 }}>
        {icon}
      </span>
      <span
        style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.58)",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function NavySection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0D1B2A" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {children}
    </section>
  );
}

/* ─── Dashboard mock-up ──────────────────────────────────────── */

function DashboardMockup() {
  const ff = "var(--font-geist-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)";

  const navItems = [
    { label: "Dashboard", active: false, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg> },
    { label: "Jobs", active: true, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg> },
    { label: "Clients", active: false, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
    { label: "Schedule", active: false, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
    { label: "CRM", active: false, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
    { label: "Fleet", active: false, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 01-2-2V7a2 2 0 012-2h11l4 4v7a2 2 0 01-2 2h-1"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg> },
    { label: "Finance", active: false, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
    { label: "Reports", active: false, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> },
  ];

  const kpis = [
    { label: "Revenue This Month", value: "$28,430", sub: "+12% vs last month", up: true },
    { label: "Jobs Today", value: "12", sub: "3 active now", up: true },
    { label: "Active Clients", value: "46", sub: "+2 this week", up: true },
    { label: "Outstanding", value: "$18,250", sub: "7 invoices pending", up: false },
  ];

  const kpiColors = [
    { topBorder: "rgba(212,175,55,0.7)",  labelColor: "rgba(212,175,55,0.75)"  },
    { topBorder: "rgba(96,165,250,0.7)",  labelColor: "rgba(96,165,250,0.75)"  },
    { topBorder: "rgba(74,222,128,0.7)",  labelColor: "rgba(74,222,128,0.75)"  },
    { topBorder: "rgba(251,146,60,0.7)",  labelColor: "rgba(251,146,60,0.75)"  },
  ];

  const jobs = [
    { ref: "#3041", client: "Remarkables Plumbing", type: "Site Inspection", assignee: "AK", status: "active" as const, time: "8:15 AM" },
    { ref: "#3042", client: "Lakes Electrical", type: "Installation", assignee: "MR", status: "scheduled" as const, time: "10:30 AM" },
    { ref: "#3043", client: "Southern Build", type: "Maintenance", assignee: "JL", status: "complete" as const, time: "7:00 AM" },
    { ref: "#3044", client: "Queenstown Civil", type: "Consultation", assignee: "AK", status: "complete" as const, time: "9:00 AM" },
    { ref: "#3045", client: "Alpine Excavation", type: "Full Service", assignee: "TF", status: "scheduled" as const, time: "1:00 PM" },
  ];

  const statusStyles = {
    active:    { label: "Active",    bg: "rgba(212,175,55,0.15)",     color: "#D4AF37" },
    scheduled: { label: "Scheduled", bg: "rgba(96,165,250,0.08)",     color: "rgba(96,165,250,0.55)" },
    complete:  { label: "Complete",  bg: "rgba(74,222,128,0.1)",      color: "rgba(74,222,128,0.7)" },
  };

  const assigneeColors: Record<string, { bg: string; color: string }> = {
    AK: { bg: "rgba(212,175,55,0.15)",  color: "#D4AF37"  },
    MR: { bg: "rgba(96,165,250,0.15)",  color: "#60A5FA"  },
    JL: { bg: "rgba(74,222,128,0.15)",  color: "#4ADE80"  },
    TF: { bg: "rgba(251,146,60,0.15)",  color: "#FB923C"  },
  };

  const pipeline = [
    { stage: "Lead",        count: 8,  max: 8  },
    { stage: "Quoted",      count: 5,  max: 8  },
    { stage: "Confirmed",   count: 4,  max: 8  },
    { stage: "In Progress", count: 3,  max: 8  },
    { stage: "Complete",    count: 12, max: 12 },
  ];

  const staffList = [
    { initials: "AK", name: "A. Kumar",   status: "On site",   active: true  },
    { initials: "MR", name: "M. Reid",    status: "Available", active: true  },
    { initials: "JL", name: "J. Liu",     status: "Break",     active: false },
    { initials: "TF", name: "T. Foster",  status: "On site",   active: true  },
  ];

  const revenueData = [18, 24, 21, 32, 28, 36, 31, 42, 38, 46, 39, 44];
  const maxRev = Math.max(...revenueData);

  const aiChips = ["Outstanding invoices", "Today's jobs", "Customer history", "Upcoming maintenance", "Late quotes", "Tool locations"];

  return (
    <div style={{ fontFamily: ff, borderRadius: "16px", overflow: "hidden", background: "#0c1427", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>

      {/* Browser chrome */}
      <div style={{ background: "#080f1e", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "9px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
            <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "#0f1e34", borderRadius: "5px", padding: "3px 14px", display: "flex", alignItems: "center", gap: "5px", width: "240px" }}>
            <svg width="8" height="8" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3 }}>
              <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.28)" }}>app.barrassai.co.nz/dashboard</span>
          </div>
        </div>
      </div>

      {/* App shell */}
      <div style={{ display: "flex", height: "580px" }}>

        {/* Sidebar */}
        <div style={{ width: "118px", background: "#090f1d", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "12px 10px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#D4AF37", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "9px", fontWeight: 900, color: "#0D1B2A" }}>B</span>
            </div>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.88)", lineHeight: 1 }}>Barrass OS</div>
              <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>Business Suite</div>
            </div>
          </div>
          <div style={{ flex: 1, padding: "8px 6px", display: "flex", flexDirection: "column", gap: "1px" }}>
            {navItems.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 8px", borderRadius: "6px", background: item.active ? "rgba(212,175,55,0.14)" : "transparent", color: item.active ? "#D4AF37" : "rgba(255,255,255,0.32)" }}>
                {item.icon}
                <span style={{ fontSize: "8.5px", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 6px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 8px", borderRadius: "6px", color: "rgba(255,255,255,0.22)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/>
              </svg>
              <span style={{ fontSize: "8.5px" }}>Settings</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#0c1427" }}>

          {/* Top bar */}
          <div style={{ height: "38px", background: "#0f1928", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", padding: "0 14px", gap: "10px", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "3px 8px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div style={{ width: "13px", height: "13px", borderRadius: "3px", background: "rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "6.5px", fontWeight: 800, color: "#D4AF37" }}>A</span>
              </div>
              <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>Altitude Landscaping</span>
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(255,255,255,0.28)" }}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1, maxWidth: "180px", display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <svg width="9" height="9" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(255,255,255,0.22)", flexShrink: 0 }}>
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.2)" }}>Search...</span>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ position: "relative", width: "26px", height: "26px", borderRadius: "7px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <div style={{ position: "absolute", top: "5px", right: "5px", width: "5px", height: "5px", borderRadius: "50%", background: "#D4AF37" }} />
            </div>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(212,175,55,0.18)", border: "1px solid rgba(212,175,55,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "8px", fontWeight: 700, color: "#D4AF37" }}>OB</span>
            </div>
          </div>

          {/* Content area */}
          <div style={{ flex: 1, overflow: "hidden", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", flexShrink: 0 }}>
              {kpis.map((kpi, i) => {
                const kc = kpiColors[i];
                return (
                  <div key={kpi.label} style={{ background: "#121b2c", border: "1px solid rgba(255,255,255,0.1)", borderTop: `2px solid ${kc.topBorder}`, borderRadius: "10px", padding: "13px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.35)" }}>
                    <div style={{ fontSize: "7px", color: kc.labelColor, marginBottom: "8px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{kpi.label}</div>
                    <div style={{ fontSize: i < 2 ? "23px" : "19px", fontWeight: 700, color: i < 2 ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.78)", lineHeight: 1, marginBottom: "6px", letterSpacing: "-0.02em" }}>{kpi.value}</div>
                    <div style={{ fontSize: "7px", color: kpi.up ? "rgba(74,222,128,0.7)" : "rgba(251,146,60,0.75)" }}>{kpi.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Middle row: jobs + right panel */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 38%", gap: "12px", minHeight: 0 }}>

              {/* Jobs panel */}
              <div style={{ background: "#121b2c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.35)" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                  <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Upcoming Jobs</span>
                  <span style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.3)" }}>Today · 12 total</span>
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  {jobs.map((job, i) => {
                    const s = statusStyles[job.status];
                    const ac = assigneeColors[job.assignee] ?? { bg: "rgba(212,175,55,0.15)", color: "#D4AF37" };
                    return (
                      <div key={job.ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 22px 80px 52px", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: i === 0 ? "rgba(212,175,55,0.04)" : "transparent" }}>
                        <span style={{ fontSize: "8.5px", fontWeight: 500, color: "rgba(255,255,255,0.82)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, paddingRight: "10px" }}>{job.client}</span>
                        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.32)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, paddingRight: "8px" }}>{job.type}</span>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: ac.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "6.5px", fontWeight: 700, color: ac.color }}>{job.assignee}</div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "2px 7px", borderRadius: "999px", background: s.bg }}>
                          <div style={{ width: "3.5px", height: "3.5px", borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                          <span style={{ fontSize: "7px", color: s.color, fontWeight: 600 }}>{s.label}</span>
                        </div>
                        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.28)", textAlign: "right" as const }}>{job.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", minHeight: 0, overflow: "hidden" }}>

                {/* Business Pipeline */}
                <div style={{ background: "#121b2c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 14px", flexShrink: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.35)" }}>
                  <div style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "8px" }}>Business Pipeline</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {pipeline.map((p) => (
                      <div key={p.stage} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                        <span style={{ fontSize: "7px", color: "rgba(255,255,255,0.32)", width: "54px", flexShrink: 0 }}>{p.stage}</span>
                        <div style={{ flex: 1, height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(p.count / p.max) * 100}%`, borderRadius: "2px", background: "rgba(212,175,55,0.5)" }} />
                        </div>
                        <span style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.42)", width: "14px", textAlign: "right" as const, flexShrink: 0 }}>{p.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue chart */}
                <div style={{ flex: 1, background: "#121b2c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 14px", display: "flex", flexDirection: "column", minHeight: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.35)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", flexShrink: 0 }}>
                    <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Revenue Trend</span>
                    <span style={{ fontSize: "7.5px", color: "#D4AF37", fontWeight: 600 }}>Jun 2026</span>
                  </div>
                  <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "flex-end", gap: "3px" }}>
                    {revenueData.map((v, i) => (
                      <div key={i} style={{ flex: 1, height: `${(v / maxRev) * 100}%`, borderRadius: "2px 2px 0 0", background: i === revenueData.length - 1 ? "#D4AF37" : "rgba(212,175,55,0.22)", minHeight: "2px" }} />
                    ))}
                  </div>
                </div>

                {/* Staff availability */}
                <div style={{ background: "#121b2c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 14px", flexShrink: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.35)" }}>
                  <div style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "7px" }}>Staff Availability</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {staffList.map((s) => (
                      <div key={s.initials} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(212,175,55,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "6.5px", fontWeight: 700, color: "#D4AF37" }}>{s.initials}</div>
                          <div style={{ position: "absolute", bottom: "0", right: "0", width: "5px", height: "5px", borderRadius: "50%", background: s.active ? "rgba(74,222,128,0.85)" : "rgba(255,255,255,0.22)", border: "1px solid #0f1826" }} />
                        </div>
                        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.58)", flex: 1 }}>{s.name}</span>
                        <span style={{ fontSize: "7px", color: s.active ? "rgba(74,222,128,0.6)" : "rgba(255,255,255,0.22)" }}>{s.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* AI Search */}
            <div style={{ flexShrink: 0, background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 100%)", border: "1px solid rgba(139,92,246,0.22)", borderRadius: "12px", padding: "14px 16px", boxShadow: "0 2px 20px rgba(139,92,246,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "rgba(139,92,246,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.88 5.79a1 1 0 00.95.69H21l-4.94 3.6a1 1 0 00-.36 1.12L17.56 20 12 16.4 6.44 20l1.86-5.8a1 1 0 00-.36-1.12L3 9.48h6.17a1 1 0 00.95-.69L12 3z"/>
                  </svg>
                </div>
                <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(167,139,250,0.95)", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Business Search (AI)</span>
                <span style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)", marginLeft: "auto" }}>Business intelligence · Not a chatbot</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.38)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: "8px", padding: "10px 12px", marginBottom: "10px", boxShadow: "0 0 0 3px rgba(139,92,246,0.06), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <span style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.25)", flex: 1 }}>Ask anything about your business...</span>
                <span className="cursor-blink" />
                <div style={{ display: "flex", alignItems: "center", padding: "2px 7px", borderRadius: "4px", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.24)" }}>
                  <span style={{ fontSize: "7px", color: "#A78BFA", fontWeight: 600 }}>⌘K</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" as const }}>
                {aiChips.map((chip) => (
                  <div key={chip} style={{ padding: "3px 10px", borderRadius: "999px", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.16)", fontSize: "7.5px", color: "rgba(167,139,250,0.6)", whiteSpace: "nowrap" as const }}>{chip}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 1. Hero (navy) ─────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative bg-[#0D1B2A]" style={{ minHeight: "100svh" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "-15%",
            width: "55%",
            height: "70%",
            background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "5%",
            right: "-10%",
            width: "60%",
            height: "90%",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        {/* Dashboard centre glow */}
        <div
          className="absolute"
          style={{
            top: "15%",
            right: "0%",
            width: "55%",
            height: "75%",
            background: "radial-gradient(ellipse at 50% 45%, rgba(99,102,241,0.08) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)",
            filter: "blur(64px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "120px", background: "linear-gradient(to bottom, transparent, rgba(13,27,42,0.5))" }}
        />
      </div>

      <div
        className="relative w-full max-w-7xl mx-auto px-6 pt-28 pb-2 md:pt-36 md:pb-4 flex items-center"
        style={{ minHeight: "100svh" }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full mb-8"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.22)",
                padding: "5px 14px",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" style={{ boxShadow: "0 0 6px rgba(212,175,55,0.8)" }} />
              <span className="text-[#D4AF37] text-xs font-medium tracking-wide">
                Queenstown, NZ &middot; Serving businesses nationwide
              </span>
            </div>

            <h1
              className="font-bold text-white leading-[0.94] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}
            >
              Custom software{" "}
              <span className="text-[#D4AF37]">built around</span>{" "}
              your business.
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed mb-14 max-w-lg"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              We design software around the way your business actually operates — replacing disconnected apps with one intelligent system that connects your team, customers and existing tools like Xero.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-bold text-base px-7 py-3.5 rounded-lg transition-all tracking-wide hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "#D4AF37",
                  color: "#0D1B2A",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.35), 0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                Book a Discovery Call
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 font-semibold text-base px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                View Our Work
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {["Fixed-price projects", "NZ-based", "You own the code", "AI-powered systems"].map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.42)",
                    background: "rgba(255,255,255,0.03)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.01em" }}>
              Trusted by businesses across landscaping, vehicle rental, hospitality and trades.
            </p>
          </div>

          <div className="hidden lg:block relative">
            {/* Ambient glow — gold primary, purple secondary */}
            <div className="absolute pointer-events-none" style={{ inset: "-120px", background: "radial-gradient(ellipse at 50% 48%, rgba(139,92,246,0.12) 0%, rgba(212,175,55,0.07) 40%, transparent 68%)", filter: "blur(72px)", zIndex: 0 }} />
            <div className="absolute pointer-events-none" style={{ inset: "-40px", background: "radial-gradient(ellipse at 48% 38%, rgba(212,175,55,0.1) 0%, transparent 55%)", filter: "blur(36px)", zIndex: 0 }} />
            {/* Scale wrapper — 5% size increase */}
            <div style={{ transform: "scale(1.05)", transformOrigin: "center top" }}>
              {/* Layered shadow frame with floating animation */}
              <div className="dash-float relative" style={{ zIndex: 1, borderRadius: "20px", boxShadow: "0 0 0 1px rgba(255,255,255,0.09), 0 4px 8px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.55), 0 48px 96px rgba(0,0,0,0.45), 0 80px 140px rgba(0,0,0,0.3), 0 0 100px rgba(139,92,246,0.08), 0 0 160px rgba(212,175,55,0.06)" }}>
                {/* Crop + clip */}
                <div className="relative overflow-hidden" style={{ borderRadius: "20px" }}>
                  {/* Very subtle tilt — 2° max */}
                  <div style={{ transform: "perspective(1800px) rotateY(-2deg) rotateX(1deg)", transformOrigin: "center center", willChange: "transform" }}>
                    <DashboardMockup />
                  </div>
                  {/* Glass reflection — diagonal top-left highlight */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.018) 22%, transparent 50%)", borderRadius: "20px", zIndex: 10 }} />
                  {/* Right edge fade */}
                  <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: "22%", background: "linear-gradient(to right, transparent, #0D1B2A)" }} />
                  {/* Bottom edge fade */}
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: "18%", background: "linear-gradient(to bottom, transparent, rgba(13,27,42,0.85))" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="block lg:hidden">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Trust strip (dark band) ────────────────────────────── */

function TrustStrip() {
  const stats = [
    { value: "$40k+", label: "Annual value identified in one project" },
    { value: "10–15 hrs", label: "Admin time saved every week" },
    { value: "6 tools", label: "Replaced with one custom system" },
    { value: "Fixed price", label: "Always agreed before work begins" },
  ];

  /* Border classes per grid position — 2-col mobile, 4-col desktop */
  const borderClasses = [
    "border-r border-b lg:border-b-0 border-white/10",
    "border-b lg:border-r lg:border-b-0 border-white/10",
    "border-r border-white/10",
    "",
  ];

  return (
    <section style={{ background: "#0f1117", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">

        {/* Eyebrow */}
        <p
          className="text-xs font-bold tracking-[0.2em] uppercase text-center mb-14"
          style={{ color: "#D4AF37" }}
        >
          The Numbers
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <AnimateOnScroll key={s.value} delay={i * 60} className={borderClasses[i]}>
              <div className="flex flex-col items-center text-center px-6 py-6 lg:py-0">
                <p
                  className="font-bold text-white tracking-tight mb-3"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.4)", maxWidth: "148px" }}
                >
                  {s.label}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── 3. What we build (light grey) ──────────────────────────── */

function WhatWeBuild() {
  return (
    <section id="services" className="bg-[#F8FAFC] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <Label>What we build</Label>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-[1.05] tracking-tight mb-4">
            Software designed for your industry
          </h2>
          <p className="text-[#64748B] text-base md:text-lg mb-16 md:mb-20 max-w-xl">
            Real systems built for trades, landscaping, and service businesses —
            not generic platforms you adapt to fit.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* Card 1: Landscaping */}
          <AnimateOnScroll delay={0} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #D4AF37 0%, rgba(212,175,55,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#D4AF37" }}>Landscaping &amp; Grounds</p>
                <h3 className="text-white font-bold text-xl leading-snug mb-3">Job Management Platform</h3>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  A complete job management platform built around how a landscaping business actually runs — from first quote through to invoice.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Scheduling" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>} />
                  <Chip label="CRM" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>} />
                  <Chip label="Quoting" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12h6M9 16h4" /></svg>} />
                  <Chip label="Job Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>} />
                  <Chip label="AI Assistant" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.79a1 1 0 00.95.69H21l-4.94 3.6a1 1 0 00-.36 1.12L17.56 20 12 16.4 6.44 20l1.86-5.8a1 1 0 00-.36-1.12L3 9.48h6.17a1 1 0 00.95-.69L12 3z" /></svg>} />
                  <Chip label="Xero Integration" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#D4AF37" }}>$40k+ in annual value identified</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 2: Vehicle Rental Fleet */}
          <AnimateOnScroll delay={90} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #60A5FA 0%, rgba(96,165,250,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#60A5FA" }}>Vehicle Rental</p>
                <h3 className="text-white font-bold text-xl leading-snug mb-3">Fleet Management System</h3>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  A custom fleet management system focused on the physical fleet — tracking compliance, inspections, kilometre logs, and damage across every vehicle.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Fleet Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 01-2-2V7a2 2 0 012-2h11l4 4v7a2 2 0 01-2 2h-1" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>} />
                  <Chip label="COF & Rego Alerts" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" /></svg>} />
                  <Chip label="AI Inspections" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>} />
                  <Chip label="KM Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>} />
                  <Chip label="Fine Management" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>} />
                  <Chip label="Damage Reports" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#60A5FA" }}>Full fleet visibility across 115+ vehicles</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 3: Trades & Construction */}
          <AnimateOnScroll delay={180} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #A78BFA 0%, rgba(167,139,250,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#A78BFA" }}>Trades &amp; Construction</p>
                <h3 className="text-white font-bold text-xl leading-snug mb-3">Job Management System</h3>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  End-to-end job management for trades businesses — from scheduling crew to sending invoices, without the manual admin.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Scheduling" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>} />
                  <Chip label="Quoting" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12h6M9 16h4" /></svg>} />
                  <Chip label="Progress Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>} />
                  <Chip label="Team Allocation" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>} />
                  <Chip label="Invoice Auto" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>} />
                  <Chip label="Xero Integration" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#A78BFA" }}>10–15 hrs of admin saved per week</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 4: Hospitality Kitchen */}
          <AnimateOnScroll delay={270} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #34D399 0%, rgba(52,211,153,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#34D399" }}>Hospitality &middot; Queenstown</p>
                <h3 className="text-white font-bold text-xl leading-snug mb-3">Kitchen Management System</h3>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  AI-powered kitchen management tracking stock levels, expiry dates, and wastage in real time — giving staff instant visibility over what they have, what&apos;s running low, and what needs action.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Stock Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>} />
                  <Chip label="Expiry Alerts" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" /></svg>} />
                  <Chip label="Wastage Reports" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>} />
                  <Chip label="AI Integration" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.79a1 1 0 00.95.69H21l-4.94 3.6a1 1 0 00-.36 1.12L17.56 20 12 16.4 6.44 20l1.86-5.8a1 1 0 00-.36-1.12L3 9.48h6.17a1 1 0 00.95-.69L12 3z" /></svg>} />
                  <Chip label="Staff Dashboard" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></svg>} />
                  <Chip label="Supplier Mgmt" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#34D399" }}>Replacing manual stock checks entirely</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 5: Vehicle Rental Operations */}
          <AnimateOnScroll delay={360} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #FB923C 0%, rgba(251,146,60,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#FB923C" }}>Vehicle Rental</p>
                <h3 className="text-white font-bold text-xl leading-snug mb-3">Operations Dashboard</h3>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  A real-time management dashboard giving full visibility over staff scheduling, timesheets, and operational compliance — accessible from any device, for any role.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Staff Timesheets" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>} />
                  <Chip label="Roster Mgmt" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>} />
                  <Chip label="Role-Based Access" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>} />
                  <Chip label="Mobile PWA" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>} />
                  <Chip label="Real-Time Alerts" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>} />
                  <Chip label="Approval Flows" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#FB923C" }}>Operations managed from any device, anywhere</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 6: Web & Digital */}
          <AnimateOnScroll delay={450} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #22D3EE 0%, rgba(34,211,238,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#22D3EE" }}>Web &amp; Digital</p>
                <h3 className="text-white font-bold text-xl leading-snug mb-3">Custom Website with AI Integration</h3>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  Fully custom websites built around how the business actually works — not templates. AI-powered lead capture, after-hours chatbot, and owner-editable content mean the site keeps working even when you&apos;re not.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="AI Chatbot" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>} />
                  <Chip label="Lead Capture" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" /></svg>} />
                  <Chip label="Contact Forms" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                  <Chip label="SEO Optimised" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>} />
                  <Chip label="Mobile Responsive" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>} />
                  <Chip label="CMS Integration" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h16M4 14h8" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#22D3EE" }}>Leads captured 24/7 without manual follow-up</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}

/* ─── 4. Problem (navy) ──────────────────────────────────────── */

const problemItems = [
  {
    title: "Fragmented tools",
    body: "Multiple apps that don't talk to each other. Data re-entered across systems, nothing giving a complete picture, and hours lost moving information between places.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Manual admin",
    body: "Hours every week lost to data entry, updating statuses, chasing paperwork, and doing tasks by hand that should happen automatically.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Multiple subscriptions",
    body: "Paying monthly for tools you've adapted your processes around — rather than tools built for you. The costs keep climbing and the fit keeps getting worse.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <path d="M1 10h22" />
      </svg>
    ),
  },
  {
    title: "Lost information",
    body: "Client history, job notes, and critical data scattered across inboxes, spreadsheets, and apps — no single source of truth, and no visibility when you need it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
];

function ProblemSection() {
  return (
    <NavySection>
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-20%",
          right: "-5%",
          width: "45%",
          height: "65%",
          background: "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-10%",
          left: "-5%",
          width: "40%",
          height: "55%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-36">
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <Label>The problem</Label>
          <h2
            className="font-bold text-white leading-[1.05] tracking-tight mx-auto"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", maxWidth: "560px" }}
          >
            Does this sound familiar?
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problemItems.map((p, i) => (
            <AnimateOnScroll key={p.title} delay={i * 80}>
              <div
                className="rounded-2xl p-8 h-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-6"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.15)",
                  }}
                >
                  {p.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{p.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.44)" }}>
                  {p.body}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </NavySection>
  );
}

/* ─── 5. Solution (white) ────────────────────────────────────── */

const solutionItems = [
  {
    title: "One platform for everything",
    body: "Replace all your disconnected tools with a single system built specifically for your business.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Built around your workflow",
    body: "Not configured to approximate what you need — written from scratch around how your business actually operates.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0l-3 3z" />
        <path d="M9.3 17.7a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0l-3 3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3z" />
        <path d="M7.5 12L12 7.5M16.5 12l-4.5 4.5" />
      </svg>
    ),
  },
  {
    title: "Xero and software integrations",
    body: "Connects directly to your accounting software and other existing tools — so data flows automatically without manual input.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "AI automation, where it helps",
    body: "Smart automation handles routine admin in the background — scheduling, follow-ups, reporting — without it being the whole point.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "You own it outright",
    body: "No monthly licence fees to us. No lock-in. You own the code and the data from day one.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function SolutionSection() {
  return (
    <section className="bg-white py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          <AnimateOnScroll>
            <Label>The solution</Label>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-[1.05] tracking-tight mb-6">
              One platform, built around your business
            </h2>
            <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-10">
              Instead of bending your business to fit generic software, we build
              a system that works exactly the way you do. Custom, owned outright,
              and built to grow with you.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-bold text-base px-7 py-3.5 rounded-lg transition-all"
              style={{
                background: "#D4AF37",
                color: "#0D1B2A",
                boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
              }}
            >
              Book a Discovery Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <div className="space-y-6">
              {solutionItems.map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 60}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex items-center justify-center rounded-xl shrink-0 mt-0.5"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "rgba(212,175,55,0.08)",
                        border: "1px solid rgba(212,175,55,0.15)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[#0F172A] font-bold text-base mb-1">{item.title}</h3>
                      <p className="text-[#64748B] text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}

/* ─── 6. Case studies (navy dark cards) ─────────────────────── */

function CaseStudies() {
  const completeBadge = { background: "rgba(74,222,128,0.1)", color: "#4ADE80" };
  const inProgressBadge = { background: "rgba(212,175,55,0.1)", color: "#D4AF37" };

  return (
    <section id="work" className="py-24 md:py-36" style={{ background: "#0D1B2A" }}>
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <Label>Case studies</Label>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-4 max-w-sm">
            Real businesses. Real outcomes.
          </h2>
          <p className="text-base md:text-lg mb-16 md:mb-20" style={{ color: "rgba(255,255,255,0.44)" }}>
            Names withheld by agreement.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* Card 1: Landscaping CRM */}
          <AnimateOnScroll delay={0} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0f1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #D4AF37 0%, rgba(212,175,55,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#D4AF37" }}>Landscaping &amp; Grounds</p>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-xl leading-snug">Job Management Platform</h3>
                  <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full" style={completeBadge}>Complete</span>
                </div>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  Running 30+ jobs a day on $600/month software that didn&apos;t talk to anything. Built a complete job management platform with Xero integration, automated scheduling, and real-time job visibility.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Scheduling" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>} />
                  <Chip label="CRM" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>} />
                  <Chip label="Quoting" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12h6M9 16h4" /></svg>} />
                  <Chip label="Job Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>} />
                  <Chip label="AI Assistant" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.79a1 1 0 00.95.69H21l-4.94 3.6a1 1 0 00-.36 1.12L17.56 20 12 16.4 6.44 20l1.86-5.8a1 1 0 00-.36-1.12L3 9.48h6.17a1 1 0 00.95-.69L12 3z" /></svg>} />
                  <Chip label="Xero Integration" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#D4AF37" }}>$40k+ in annual value identified</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 2: Vehicle Rental Fleet */}
          <AnimateOnScroll delay={80} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0f1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #60A5FA 0%, rgba(96,165,250,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#60A5FA" }}>Vehicle Rental</p>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-xl leading-snug">Fleet &amp; Compliance System</h3>
                  <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full" style={completeBadge}>Complete</span>
                </div>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  A full operations platform covering fleet compliance, staff timesheets, fine management, and vehicle audits — replacing multiple disconnected tools with one custom system.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Fleet Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 01-2-2V7a2 2 0 012-2h11l4 4v7a2 2 0 01-2 2h-1" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>} />
                  <Chip label="Fine Management" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>} />
                  <Chip label="Staff Timesheets" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>} />
                  <Chip label="Vehicle Audits" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>} />
                  <Chip label="AI Inspections" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>} />
                  <Chip label="Roster Mgmt" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#60A5FA" }}>6 disconnected tools replaced</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 3: Kitchen Management */}
          <AnimateOnScroll delay={160} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0f1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #34D399 0%, rgba(52,211,153,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#34D399" }}>Hospitality &middot; Queenstown</p>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-xl leading-snug">Kitchen Management System</h3>
                  <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full" style={inProgressBadge}>In progress</span>
                </div>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  AI-powered kitchen management tracking stock levels, expiry dates, and wastage in real time — giving staff instant visibility over what they have, what&apos;s running low, and what needs action.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Stock Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>} />
                  <Chip label="Expiry Alerts" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" /></svg>} />
                  <Chip label="Wastage Reports" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>} />
                  <Chip label="AI Integration" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.79a1 1 0 00.95.69H21l-4.94 3.6a1 1 0 00-.36 1.12L17.56 20 12 16.4 6.44 20l1.86-5.8a1 1 0 00-.36-1.12L3 9.48h6.17a1 1 0 00.95-.69L12 3z" /></svg>} />
                  <Chip label="Staff Dashboard" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></svg>} />
                  <Chip label="Supplier Mgmt" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#34D399" }}>Replacing manual stock checks entirely</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 4: Operations Dashboard */}
          <AnimateOnScroll delay={240} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0f1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #FB923C 0%, rgba(251,146,60,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#FB923C" }}>Vehicle Rental</p>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-xl leading-snug">Operations Dashboard</h3>
                  <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full" style={completeBadge}>Complete</span>
                </div>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  A real-time management dashboard giving full visibility across fleet compliance, staff scheduling, infringement fines, and vehicle audits — all accessible from any device.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Live Fleet View" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 01-2-2V7a2 2 0 012-2h11l4 4v7a2 2 0 01-2 2h-1" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>} />
                  <Chip label="Staff Roster" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>} />
                  <Chip label="Compliance Alerts" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" /></svg>} />
                  <Chip label="Fine Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>} />
                  <Chip label="Mobile Access" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>} />
                  <Chip label="Role-Based Access" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#FB923C" }}>Full operational visibility in one place</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 5: Social Media Engine */}
          <AnimateOnScroll delay={320} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0f1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #A78BFA 0%, rgba(167,139,250,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#A78BFA" }}>E-commerce &middot; Online</p>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-xl leading-snug">AI Social Media Engine</h3>
                  <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full" style={completeBadge}>Complete</span>
                </div>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  Custom automation system built from scratch — content scanning, post scheduling, lead tracking, and performance analytics all running without manual input across multiple platforms.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="Content Auto" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>} />
                  <Chip label="Post Scheduling" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>} />
                  <Chip label="Lead Tracking" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" /></svg>} />
                  <Chip label="Analytics" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>} />
                  <Chip label="Multi-Platform" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>} />
                  <Chip label="Zero Manual Input" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#A78BFA" }}>10–15 hrs saved per week</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 6: Custom Website */}
          <AnimateOnScroll delay={400} className="flex">
            <div className="rounded-2xl overflow-hidden flex flex-col w-full" style={{ background: "#0f1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg, #22D3EE 0%, rgba(34,211,238,0) 100%)" }} />
              <div className="flex flex-col flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#22D3EE" }}>Web &amp; Digital</p>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-xl leading-snug">Custom Website with AI Integration</h3>
                  <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full" style={completeBadge}>Complete</span>
                </div>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.44)" }}>
                  A fully custom website built around the business — not a template. AI chatbot for after-hours enquiries, lead capture automation, and CMS so the owner can update content without touching code.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  <Chip label="AI Chatbot" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>} />
                  <Chip label="Lead Capture" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" /></svg>} />
                  <Chip label="Contact Forms" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                  <Chip label="SEO Optimised" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>} />
                  <Chip label="Mobile Responsive" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>} />
                  <Chip label="CMS Integration" icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h16M4 14h8" /></svg>} />
                </div>
                <div className="mt-auto pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#22D3EE" }}>Leads captured 24/7 without manual follow-up</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}

/* ─── 7. How it works (white) ────────────────────────────────── */

const steps = [
  {
    n: "1",
    title: "Discovery Call",
    body: "Free 20-minute call. We talk about your business, what's costing you time and money, and whether custom software is the right fit. No pitch, no obligation — just an honest conversation.",
  },
  {
    n: "2",
    title: "Scoping & Proposal",
    body: "We map your current workflows, identify the highest-value opportunities, and put together a fixed-price proposal with a clear scope and timeline. You know the total cost before anything begins.",
  },
  {
    n: "3",
    title: "Build, Launch & Partner",
    body: "We build, test and deploy. You own the result outright — no licence fees, no lock-in. Then we stay embedded: monitoring, iterating and building as your business grows.",
  },
];

function HowItWorks() {
  const cardStyle = {
    background: "#0f1117",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "28px",
  };

  const stepLabelStyle = {
    fontSize: "10px",
    color: "#D4AF37",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.18em",
    marginBottom: "16px",
  };

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll className="mb-12">
          <Label>The process</Label>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-[1.05] tracking-tight">
            How it works
          </h2>
        </AnimateOnScroll>

        {/* Desktop: 3-column card grid with arrows */}
        <div className="hidden md:flex items-stretch gap-2">
          {steps.map((step, i) => (
            <div key={step.n} className="flex items-stretch flex-1 gap-2">
              <AnimateOnScroll delay={i * 90} className="flex flex-1">
                <div className="flex-1" style={cardStyle}>
                  <p style={stepLabelStyle}>Step 0{step.n}</p>
                  <h3 className="text-white font-bold text-xl leading-snug mb-3">
                    {step.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.44)", fontSize: "15px", lineHeight: "1.65" }}>
                    {step.body}
                  </p>
                </div>
              </AnimateOnScroll>
              <div className="flex items-center justify-center shrink-0" style={{ width: "24px" }}>
                {i < steps.length - 1 && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="rgba(212,175,55,0.32)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-5">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.n} delay={i * 100}>
              <div style={cardStyle}>
                <p style={stepLabelStyle}>Step 0{step.n}</p>
                <h3 className="text-white font-bold text-xl leading-snug mb-3">{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.44)", fontSize: "15px", lineHeight: "1.65" }}>
                  {step.body}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 8. About (dark) ───────────────────────────────────────── */

function About() {
  const trustItems = [
    "NZ Based",
    "Fixed-Price Projects",
    "You Own The Code",
    "Built Around Your Business",
    "Long-Term Support",
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36" style={{ background: "#0f1117" }}>
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 lg:items-center">

            {/* Text content */}
            <div>
              {/* Label */}
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: "#D4AF37" }}>
                The Founder
              </p>

              {/* Heading */}
              <h2
                className="font-bold text-white tracking-tight mb-10"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Understanding first.{" "}
                <span style={{ color: "#D4AF37" }}>Software second.</span>
              </h2>

              {/* Body */}
              <div className="space-y-7">
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Before software, I spent years in recruitment and business development — hired to build a branch from scratch, and finished my first year at 147% of budget with two company awards along the way. But the part that actually shaped what I do now was being inside dozens of businesses week after week: trades companies, tourism operators, vehicle rental businesses, service businesses right across New Zealand.
                </p>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                  That&apos;s where I kept seeing the same thing. Good businesses being slowed down by software that didn&apos;t fit. Spreadsheets doing jobs they shouldn&apos;t be doing. Apps that didn&apos;t talk to each other. Manual admin quietly eating through hours every week. People had tried the off-the-shelf fixes — they just didn&apos;t stick, because the software was built for the average business, not theirs.
                </p>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                  That&apos;s why I started Barrass AI. Every project starts before any code gets written — spending real time understanding how the business actually works, talking to the people doing the work, and mapping processes as they really run, not how they&apos;re supposed to on paper. What comes out of that is software that fits the business as it already operates, not the other way around.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-lg transition-all text-base hover:-translate-y-0.5 active:translate-y-0"
                  style={{
                    background: "#D4AF37",
                    color: "#0D1B2A",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.28)",
                  }}
                >
                  Start a conversation
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Trust indicators */}
              <div
                className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-16 pt-14"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div
                      className="flex-shrink-0 rounded-full"
                      style={{ width: "5px", height: "5px", background: "#D4AF37", opacity: 0.55 }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.01em" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative overflow-hidden rounded-2xl w-full"
                style={{ aspectRatio: "3/4", maxWidth: "380px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/oliver.jpg"
                  alt="Oliver Barrass, founder of Barrass AI"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                />
                {/* Location pill */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none">
                  <div
                    style={{
                      background: "rgba(10,16,32,0.82)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "999px",
                      padding: "7px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.85)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.72)", fontWeight: 500, whiteSpace: "nowrap" as const }}>
                      Queenstown, New Zealand
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ─── 10. FAQ (light grey) ───────────────────────────────────── */

function FAQSection() {
  return (
    <section className="bg-[#F8FAFC] py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6">
        <AnimateOnScroll>
          <Label>Common questions</Label>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-16 md:mb-20 max-w-xs">
            FAQ
          </h2>
        </AnimateOnScroll>
        <FAQ />
      </div>
    </section>
  );
}

/* ─── 11. Contact (navy) ─────────────────────────────────────── */

function Contact() {
  return (
    <NavySection>
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-15%",
          left: "-5%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 65%)",
          filter: "blur(72px)",
        }}
      />
      <div
        id="contact"
        className="relative max-w-5xl mx-auto px-6 py-24 md:py-36"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 lg:items-start">

          <AnimateOnScroll>
            <Label>Get in touch</Label>
            <h2
              className="font-bold text-white leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Let&apos;s talk about your business.
            </h2>
            <p className="text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.48)" }}>
              Whether you&apos;re replacing existing software or starting from scratch,
              we&apos;d love to hear about your business.
            </p>
            <div
              className="mb-10"
              style={{
                height: "1px",
                background: "linear-gradient(90deg, rgba(212,175,55,0.35) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            />
            <div className="space-y-6">
              <a href="tel:+64225482473" className="flex items-center gap-4 group">
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{ width: "44px", height: "44px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.18)" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>Phone</p>
                  <p className="group-hover:text-[#D4AF37] transition-colors" style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", fontWeight: 500 }}>
                    022 548 2473
                  </p>
                </div>
              </a>
              <a href="mailto:oliver@barrassai.com" className="flex items-center gap-4 group">
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{ width: "44px", height: "44px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.18)" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>Email</p>
                  <p className="group-hover:text-[#D4AF37] transition-colors" style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", fontWeight: 500 }}>
                    oliver@barrassai.com
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{ width: "44px", height: "44px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.18)" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>Location</p>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", fontWeight: 500 }}>
                    Queenstown, New Zealand
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={120}>
            <ContactForm />
          </AnimateOnScroll>

        </div>
      </div>
    </NavySection>
  );
}

/* ─── Footer (navy) ──────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#0D1B2A] py-10 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">BARRASS AI</p>
        <p className="text-white/25 text-xs">
          &copy; {new Date().getFullYear()} Barrass AI &middot; Queenstown, New Zealand
        </p>
        <div className="flex gap-6 text-white/30 text-xs">
          {[
            ["Services", "#services"],
            ["Work", "#work"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="hover:text-white/60 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <WhatWeBuild />
        <ProblemSection />
        <SolutionSection />
        <CaseStudies />
        <HowItWorks />
        <About />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
