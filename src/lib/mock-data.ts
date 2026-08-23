export const COMPANY = {
  name: "Meridian Apparel Exports",
  short: "Meridian",
  initial: "M",
  owner: "Ravi Khanna",
  ownerInitials: "RK",
  plan: "Growth",
  planPrice: 4999,
  nextInvoice: "2026-09-01T00:00:00Z",
};

export const HEALTH = {
  score: 72,
  delta: -3,
  spark: [78, 77, 79, 78, 76, 75, 76, 74, 73, 74, 72],
  status: "Stable, 2 items need attention",
};

export const TRAPPED = {
  total: 3240000,
  breakdown: [
    { label: "Slow-moving", value: 1120000 },
    { label: "Excess stock", value: 890000 },
    { label: "Returned", value: 670000 },
    { label: "Obsolete", value: 560000 },
  ],
};

export const PIPELINE = {
  items: 10,
  trackedValue: 13438000,
  recoverable: 3240000,
  recoveredThisMonth: 460000,
};

export const CASH = {
  current: 4200000,
  actual: [38.2, 38.9, 38.1, 39.4, 40.2, 39.6, 38.8, 39.9, 40.8, 41.5, 40.9, 40.1, 41.2, 41.8, 41.4, 40.6, 41.9, 42.4, 41.7, 40.9, 42.1, 42.6, 41.9, 41.2, 42.4, 42.9, 42.1, 41.5, 41.7, 42.0],
  projected: [41.6, 41.1, 40.4, 39.6, 38.7, 37.7, 36.6, 35.4, 34.1, 32.7, 31.4, 30.3, 29.4, 28.7, 28.0],
  bandPct: 0.06,
};

export const INVENTORY_TREND = {
  current: 23400000,
  actual: [2.18, 2.19, 2.21, 2.2, 2.22, 2.24, 2.23, 2.25, 2.26, 2.25, 2.27, 2.28, 2.27, 2.29, 2.3, 2.29, 2.31, 2.3, 2.32, 2.31, 2.33, 2.32, 2.34, 2.33, 2.32, 2.34, 2.33, 2.35, 2.34, 2.34],
  projected: [2.35, 2.36, 2.38, 2.39, 2.41, 2.42, 2.44, 2.45, 2.47, 2.48, 2.5, 2.51, 2.53, 2.55, 2.56, 2.58, 2.61],
  bandPct: 0.04,
};

export const TOP_PRODUCTS = [
  { id: "p1", name: "Puffer Jackets", segment: "Winter Wear", revenue: 1850000, units: 420, trend: -15 },
  { id: "p2", name: "Cotton Shirts", segment: "Casual", revenue: 1120000, units: 1560, trend: 4 },
  { id: "p3", name: "Denim Jeans", segment: "Bottoms", revenue: 980000, units: 310, trend: 2 },
  { id: "p4", name: "Silk Sarees", segment: "Traditional", revenue: 750000, units: 89, trend: -8 },
  { id: "p5", name: "Knitted Tops", segment: "Knitwear", revenue: 620000, units: 280, trend: 9 },
];

export const INVENTORY = {
  units: 8420,
  value: 23400000,
  avgAge: 57,
  overstockUnits: 2140,
};

export const PAYABLES = {
  total: 4500000,
  aging: [
    { label: "0\u201330d", value: 1870000 },
    { label: "31\u201360d", value: 1030000 },
    { label: "61\u201390d", value: 800000 },
    { label: "90d+", value: 800000 },
  ],
  topVendor: "Vardhman Textiles",
  topVendorAmount: 680000,
};

export const RECEIVABLES = {
  outstanding: 3820000,
  atRisk: 620000,
};

export const EXPENSES = [
  { label: "Procurement", value: 2100000, pct: 44 },
  { label: "Salaries", value: 1240000, pct: 26 },
  { label: "Rent & overheads", value: 480000, pct: 10 },
  { label: "Logistics", value: 380000, pct: 8 },
  { label: "Marketing", value: 240000, pct: 5 },
  { label: "Other", value: 340000, pct: 7 },
];

export type Severity = "high" | "medium" | "low";
export type AlertStatus = "new" | "acknowledged" | "resolved";

export interface Alert {
  id: string;
  code: string;
  severity: Severity;
  title: string;
  area: "Inventory" | "Cash Flow" | "Procurement" | "Receivables";
  detail: string;
  trigger: { label: string; a: string; b: string; aPct: number; bPct: number };
  detected: string;
  status: AlertStatus;
}

export const ALERTS: Alert[] = [
  {
    id: "a101",
    code: "A-101",
    severity: "high",
    title: "Inventory rising while sales declining \u2014 Winter Jackets cluster",
    area: "Inventory",
    detail:
      "Stock inflow for the Winter Jackets cluster continued at full replenishment rate while 30-day sales fell 15%. At current velocity the cluster adds ~11 days of aging per week and will cross the 180-day threshold in 9 weeks.",
    trigger: { label: "60-day index", a: "Inventory", b: "Sales", aPct: 18, bPct: -15 },
    detected: "2026-08-18T09:12:00Z",
    status: "new",
  },
  {
    id: "a102",
    code: "A-102",
    severity: "high",
    title: "Overstock forming on Silk Sarees \u2014 542 days aging, zero movement in 60d",
    area: "Inventory",
    detail:
      "340 units of Kanjivaram Silk Sarees have recorded zero sell-through in 60 days. Carrying cost is accruing at ~\u20B918k/month. Condition degradation risk rises sharply beyond 600 days.",
    trigger: { label: "Movement", a: "Units sold (60d)", b: "Carrying cost", aPct: 0, bPct: 24 },
    detected: "2026-08-17T16:40:00Z",
    status: "new",
  },
  {
    id: "a103",
    code: "A-103",
    severity: "medium",
    title: "Payables aging above threshold \u2014 \u20B98.0L beyond 60 days",
    area: "Cash Flow",
    detail:
      "\u20B98.0L of payables are now past 60 days, up from \u20B95.1L last cycle. Two vendors are within 10 days of penalty clauses. Cash position projection turns negative-slope within 18 days at current burn.",
    trigger: { label: "Aging shift", a: "61\u201390d bucket", b: "90d+ bucket", aPct: 12, bPct: 33 },
    detected: "2026-08-15T11:05:00Z",
    status: "acknowledged",
  },
  {
    id: "a104",
    code: "A-104",
    severity: "medium",
    title: "Procurement unchanged despite 15% sales dip \u2014 12 SKUs still replenishing",
    area: "Procurement",
    detail:
      "Open purchase orders against the 12-SKU Winter Jackets cluster remain active at pre-dip volumes. Continuing at this rate adds an estimated \u20B96.1L of new overstock over the next 60 days.",
    trigger: { label: "Rate comparison", a: "PO inflow", b: "Sell-through", aPct: 2, bPct: -15 },
    detected: "2026-08-14T08:22:00Z",
    status: "new",
  },
  {
    id: "a105",
    code: "A-105",
    severity: "low",
    title: "Return rate elevated on Knitted Tops \u2014 8% vs 2% baseline",
    area: "Inventory",
    detail:
      "Return rate on Knitted Tops is 4x baseline for the category. Root cause appears size-labelling on the last production batch. Returned units are re-entering sellable stock without re-QC.",
    trigger: { label: "Return rate", a: "Current", b: "Baseline", aPct: 8, bPct: 2 },
    detected: "2026-08-13T14:55:00Z",
    status: "resolved",
  },
  {
    id: "a106",
    code: "A-106",
    severity: "medium",
    title: "Two retail chains overdue beyond 45 days \u2014 \u20B96.2L at risk",
    area: "Receivables",
    detail:
      "Northzone Retail and CityStyle Mart are both past 45 days on invoices totalling \u20B96.2L. Historical pattern suggests collection probability drops below 60% once invoices cross 60 days.",
    trigger: { label: "Receivables", a: "Overdue 45d+", b: "Collection prob.", aPct: 16, bPct: -40 },
    detected: "2026-08-12T10:30:00Z",
    status: "acknowledged",
  },
  {
    id: "a107",
    code: "A-107",
    severity: "low",
    title: "Logistics spend up 22% MoM without volume increase",
    area: "Cash Flow",
    detail:
      "Freight and last-mile spend rose 22% month-over-month while shipped volume stayed flat. Two new route surcharges appear uncontracted.",
    trigger: { label: "MoM", a: "Logistics spend", b: "Shipped volume", aPct: 22, bPct: 1 },
    detected: "2026-08-11T09:00:00Z",
    status: "new",
  },
];

export type RecStatus = "Unreviewed" | "Listed" | "Matched" | "Recovered";

export interface Buyer {
  name: string;
  match: number;
  offer: number;
}

export interface RecItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  qty: number;
  ageDays: number;
  condition: "Good" | "Fair" | "Poor";
  location: string;
  value: number;
  subs: { demand: number; age: number; condition: number; location: number; urgency: number; market: number; quantity: number };
  score: number;
  status: RecStatus;
  buyers: Buyer[];
}

export const SCORE_WEIGHTS = { demand: 25, age: 20, condition: 15, location: 10, urgency: 10, market: 12, quantity: 8 };

function score(s: RecItem["subs"]): number {
  return Math.round(
    (s.demand / 100) * SCORE_WEIGHTS.demand +
      (s.age / 100) * SCORE_WEIGHTS.age +
      (s.condition / 100) * SCORE_WEIGHTS.condition +
      (s.location / 100) * SCORE_WEIGHTS.location +
      (s.urgency / 100) * SCORE_WEIGHTS.urgency +
      (s.market / 100) * SCORE_WEIGHTS.market +
      (s.quantity / 100) * SCORE_WEIGHTS.quantity
  );
}

const raw: Omit<RecItem, "score">[] = [
  { id: "r1", sku: "WJ-2291", name: "Puffer Jacket \u2014 Alpine", category: "Winter Wear", qty: 340, ageDays: 94, condition: "Good", location: "Warehouse A", value: 1190000, subs: { demand: 96, age: 62, condition: 92, location: 88, urgency: 94, market: 90, quantity: 72 }, status: "Unreviewed", buyers: [{ name: "SportsMart Wholesale", match: 92, offer: 980000 }, { name: "SecondStride Retail", match: 81, offer: 840000 }, { name: "Export Traders India", match: 66, offer: 710000 }] },
  { id: "r2", sku: "SK-3842", name: "Cotton Shirt \u2014 Slim Fit", category: "Casual", qty: 2860, ageDays: 332, condition: "Fair", location: "Warehouse B", value: 2860000, subs: { demand: 74, age: 28, condition: 70, location: 80, urgency: 60, market: 76, quantity: 40 }, status: "Listed", buyers: [{ name: "Urban Chic Retail", match: 84, offer: 2100000 }] },
  { id: "r3", sku: "DJ-1519", name: "Denim \u2014 Straight Leg", category: "Bottoms", qty: 1950, ageDays: 298, condition: "Good", location: "Warehouse A", value: 1950000, subs: { demand: 80, age: 34, condition: 85, location: 88, urgency: 66, market: 82, quantity: 55 }, status: "Unreviewed", buyers: [] },
  { id: "r4", sku: "SS-0033", name: "Silk Saree \u2014 Kanjivaram", category: "Traditional", qty: 340, ageDays: 542, condition: "Poor", location: "Warehouse C", value: 1190000, subs: { demand: 58, age: 8, condition: 45, location: 60, urgency: 40, market: 70, quantity: 45 }, status: "Unreviewed", buyers: [{ name: "Heritage Boutique", match: 71, offer: 450000 }] },
  { id: "r5", sku: "KT-7721", name: "Knitted Top \u2014 Ribbed", category: "Knitwear", qty: 1620, ageDays: 185, condition: "Good", location: "Warehouse B", value: 1620000, subs: { demand: 82, age: 48, condition: 88, location: 78, urgency: 72, market: 80, quantity: 58 }, status: "Listed", buyers: [{ name: "QuickFashion Wholesale", match: 80, offer: 1300000 }] },
  { id: "r6", sku: "AW-8844", name: "All-Weather Coat", category: "Outerwear", qty: 730, ageDays: 215, condition: "Fair", location: "Warehouse A", value: 890000, subs: { demand: 66, age: 42, condition: 68, location: 86, urgency: 58, market: 72, quantity: 50 }, status: "Unreviewed", buyers: [] },
  { id: "r7", sku: "KL-1108", name: "Kids Leggings \u2014 5-pack", category: "Kidswear", qty: 980, ageDays: 76, condition: "Good", location: "Warehouse B", value: 441000, subs: { demand: 88, age: 72, condition: 90, location: 80, urgency: 84, market: 78, quantity: 60 }, status: "Matched", buyers: [{ name: "ValueMart B2B", match: 77, offer: 360000 }] },
  { id: "r8", sku: "SD-6620", name: "Summer Dress \u2014 Floral", category: "Womenswear", qty: 1240, ageDays: 402, condition: "Fair", location: "Warehouse C", value: 992000, subs: { demand: 52, age: 16, condition: 64, location: 58, urgency: 46, market: 68, quantity: 52 }, status: "Unreviewed", buyers: [] },
  { id: "r9", sku: "BL-3391", name: "Formal Blazer \u2014 Navy", category: "Menswear", qty: 410, ageDays: 148, condition: "Good", location: "Warehouse A", value: 1025000, subs: { demand: 78, age: 56, condition: 86, location: 90, urgency: 70, market: 84, quantity: 48 }, status: "Matched", buyers: [{ name: "SecondStride Retail", match: 74, offer: 820000 }] },
  { id: "r10", sku: "TS-4455", name: "T-Shirt \u2014 Printed", category: "Casual", qty: 3200, ageDays: 122, condition: "Good", location: "Warehouse B", value: 1280000, subs: { demand: 70, age: 64, condition: 84, location: 76, urgency: 62, market: 74, quantity: 35 }, status: "Listed", buyers: [{ name: "QuickFashion Wholesale", match: 69, offer: 980000 }] },
];

export const RECOVER_ITEMS: RecItem[] = raw.map((r) => ({ ...r, score: score(r.subs) }));

export interface Prediction {
  id: string;
  code: string;
  metric: string;
  headline: string;
  horizon: string;
  confidence: number;
  relatedAlert: string;
  relatedRec: string;
}

export const PREDICTIONS: Prediction[] = [
  { id: "pr201", code: "P-201", metric: "Cash position", headline: "Cash pressure likely in 18 days if procurement continues at current rate", horizon: "18 days", confidence: 72, relatedAlert: "A-103", relatedRec: "R-301" },
  { id: "pr202", code: "P-202", metric: "Inventory velocity", headline: "60 more days to clear Winter Jackets cluster at current velocity", horizon: "60 days", confidence: 81, relatedAlert: "A-101", relatedRec: "R-302" },
  { id: "pr203", code: "P-203", metric: "Receivables", headline: "\u20B96.2L likely to slip past the 60-day collection window", horizon: "24 days", confidence: 68, relatedAlert: "A-106", relatedRec: "R-304" },
  { id: "pr204", code: "P-204", metric: "Inventory value", headline: "Inventory value rises to \u20B92.61Cr in 90d if procurement is unchanged", horizon: "90 days", confidence: 76, relatedAlert: "A-104", relatedRec: "R-303" },
];

export type ActionStatus = "pending" | "accepted" | "dismissed";

export interface Recommendation {
  id: string;
  code: string;
  action: string;
  impact: number;
  reasoning: string;
  source: string;
  status: ActionStatus;
}

export const RECOMMENDATIONS: Recommendation[] = [
  { id: "rec301", code: "R-301", action: "Renegotiate payment terms with top 3 vendors", impact: 450000, reasoning: "61\u201390d payables bucket grew 12% while cash projection slopes down in 18 days", source: "A-103 \u00B7 P-201", status: "pending" },
  { id: "rec302", code: "R-302", action: "Pause replenishment \u2014 12 SKUs in Winter Jackets cluster", impact: 980000, reasoning: "PO inflow unchanged while sell-through fell 15%; pausing stops \u20B99.8L of new overstock", source: "A-101 \u00B7 P-202", status: "accepted" },
  { id: "rec303", code: "R-303", action: "Reduce open purchase orders by 35% for 60 days", impact: 610000, reasoning: "Inventory value projected to hit \u20B92.61Cr without intervention", source: "A-104 \u00B7 P-204", status: "pending" },
  { id: "rec304", code: "R-304", action: "Escalate collections \u2014 Northzone and CityStyle, 45d overdue", impact: 620000, reasoning: "Collection probability falls below 60% past day 60", source: "A-106 \u00B7 P-203", status: "pending" },
  { id: "rec305", code: "R-305", action: "List Puffer Jackets WJ-2291 with SportsMart at \u20B99.8L", impact: 980000, reasoning: "Best buyer match at 92% on the highest Recovery Score item (85/100)", source: "Recover \u00B7 WJ-2291", status: "pending" },
];

export interface Integration {
  id: string;
  name: string;
  initial: string;
  category: string;
  status: "connected" | "not_connected" | "error";
  lastSync?: string;
}

export const INTEGRATIONS: Integration[] = [
  { id: "tally", name: "Tally Prime", initial: "T", category: "Accounting", status: "connected", lastSync: "2 min ago" },
  { id: "qb", name: "QuickBooks Online", initial: "Q", category: "Accounting", status: "connected", lastSync: "14 min ago" },
  { id: "zoho", name: "Zoho Books", initial: "Z", category: "Accounting", status: "connected", lastSync: "1 hr ago" },
  { id: "razorpay", name: "Razorpay", initial: "R", category: "Banking", status: "connected", lastSync: "5 min ago" },
  { id: "amazon", name: "Amazon Seller Central", initial: "A", category: "Sales channel", status: "error", lastSync: "2 days ago" },
  { id: "shopify", name: "Shopify", initial: "S", category: "Sales channel", status: "not_connected" },
  { id: "odoo", name: "Odoo ERP", initial: "O", category: "Inventory", status: "not_connected" },
  { id: "sheets", name: "Google Sheets", initial: "G", category: "Data export", status: "not_connected" },
];

export const USERS = [
  { name: "Ravi Khanna", email: "ravi@meridian.co.in", role: "Owner", initials: "RK" },
  { name: "Meera Iyer", email: "meera@meridian.co.in", role: "Finance Lead", initials: "MI" },
  { name: "Arjun Patel", email: "arjun@meridian.co.in", role: "Ops Manager", initials: "AP" },
];
