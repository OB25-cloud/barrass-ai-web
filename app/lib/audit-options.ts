/* Answer options for the free AI audit. Safe to import from client
   components: no secrets, no prompt text. */

export const BUSINESS_TYPES = [
  "Trades & Construction",
  "Pet Services",
  "Automotive & Dealerships",
  "Property Management",
  "Hospitality & Food",
  "Professional Services",
  "Other",
] as const;

export const TEAM_SIZES = ["Just me", "2–5", "6–20", "21–50", "50+"] as const;

export const TIME_WASTERS = [
  "Scheduling & bookings",
  "Invoicing & quotes",
  "Compliance & paperwork",
  "Reporting & dashboards",
  "Client communication",
  "Staff management",
  "Data entry",
  "Stock & inventory",
] as const;
