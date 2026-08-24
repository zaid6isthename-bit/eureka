/**
 * Recovery Score™ engine — pure functions.
 *
 * score = Σ(normalizedFactor × weight) × 100
 * Weights: stagnation 25 · cash pressure 20 · market demand 20 ·
 *          quantity 15 · condition 10 · price competitiveness 10
 */

export type Condition = "New" | "Good" | "Fair" | "Poor";

export type RecStatus =
  | "Unreviewed"
  | "Listed"
  | "Matched"
  | "In negotiation"
  | "Recovered";

export const STATUSES: (RecStatus | "All")[] = [
  "All",
  "Unreviewed",
  "Listed",
  "Matched",
  "In negotiation",
  "Recovered",
];

export const STAGES = [
  { key: "identify", label: "Identify" },
  { key: "score", label: "Score" },
  { key: "estimate", label: "Estimate" },
  { key: "match", label: "Match" },
  { key: "recover", label: "Recover" },
] as const;

const WEIGHTS = {
  stagnation: 25,
  cashPressure: 20,
  demand: 20,
  quantity: 15,
  condition: 10,
  priceCompetitiveness: 10,
} as const;

/** Business-level liquidity context — drives the cash-pressure factor. */
export const BUSINESS = { runwayDays: 47, targetRunwayDays: 125 };

const CONDITION_NORM: Record<Condition, number> = {
  New: 1,
  Good: 0.8,
  Fair: 0.55,
  Poor: 0.3,
};

export const COMMISSION_PCT = 0.08;
export const LOGISTICS_PCT = 0.02;

export type ScoreFactor = {
  key: keyof typeof WEIGHTS;
  label: string;
  weight: number;
  raw: string;
  norm: number;
  points: number;
};

export type Economics = {
  bookValue: number;
  unitLow: number;
  unitHigh: number;
  rangeLow: number;
  rangeHigh: number;
  recoveryPct: number;
  daysToLiquidate: number;
  demandTier: "High" | "Medium" | "Low";
  gross: number;
  commission: number;
  logistics: number;
  net: number;
  roiPct: number;
};

type BuyerSeed = {
  name: string;
  city: string;
  region: string;
  categoryFit: number;
  purchases: number;
  /** Purchasing capacity relative to a typical lot's expected value (1.2 ⇒ absorbs 120%). */
  capacityMul: number;
  note: string;
};

type RawSeed = {
  id: string;
  sku: string;
  name: string;
  category: string;
  qty: number;
  ageDays: number;
  condition: Condition;
  location: string;
  city: string;
  region: string;
  askPrice: number;
  marketPrice: number;
  demandIndex: number;
  status?: RecStatus;
  introTo?: string;
  buyers: BuyerSeed[];
};

export type Candidate = RawSeed & {
  status: RecStatus;
  factors: ScoreFactor[];
  score: number;
  tier: "Prime" | "Viable" | "Marginal";
  economics: Economics;
  matched: Buyer[];
};

export type Buyer = BuyerSeed & {
  sub: { categoryFit: number; locationProx: number; capacity: number; history: number };
  match: number;
  offer: number;
};

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const round2 = (n: number) => Math.round(n * 100) / 100;

function priceCompetitiveness(askPrice: number, marketPrice: number) {
  return clamp01(2 - askPrice / marketPrice);
}

function cashPressure() {
  return clamp01(1 - BUSINESS.runwayDays / BUSINESS.targetRunwayDays);
}

export function computeFactors(
  c: Pick<RawSeed, "ageDays" | "qty" | "demandIndex" | "condition" | "askPrice" | "marketPrice">,
  maxQty: number
): ScoreFactor[] {
  const stagnation = clamp01(c.ageDays / 365);
  const cash = cashPressure();
  const demand = clamp01(c.demandIndex / 100);
  const quantity = clamp01(c.qty / maxQty);
  const condition = CONDITION_NORM[c.condition];
  const price = priceCompetitiveness(c.askPrice, c.marketPrice);

  const mk = (
    key: keyof typeof WEIGHTS,
    label: string,
    norm: number,
    raw: string
  ): ScoreFactor => ({
    key,
    label,
    weight: WEIGHTS[key],
    norm: round2(norm),
    raw,
    points: round2(norm * WEIGHTS[key]),
  });

  return [
    mk("stagnation", "Days since last sale", stagnation, `${c.ageDays} days`),
    mk("cashPressure", "Cash pressure", cash, `${BUSINESS.runwayDays}d runway`),
    mk("demand", "Market demand", demand, `index ${c.demandIndex}/100`),
    mk("quantity", "Quantity on hand", quantity, `${c.qty.toLocaleString("en-IN")} units`),
    mk("condition", "Item condition", condition, c.condition),
    mk("priceCompetitiveness", "Price competitiveness", price, `ask ${Math.round((c.askPrice / c.marketPrice) * 100)}% of mkt`),
  ];
}

export function computeScore(factors: ScoreFactor[]) {
  return Math.round(factors.reduce((s, f) => s + f.points, 0));
}

export function tierOf(score: number): Candidate["tier"] {
  if (score >= 80) return "Prime";
  if (score >= 60) return "Viable";
  return "Marginal";
}

export function computeEconomics(
  c: Pick<RawSeed, "qty" | "marketPrice" | "condition" | "askPrice" | "demandIndex">
): Economics {
  const cond = CONDITION_NORM[c.condition];
  const price = priceCompetitiveness(c.askPrice, c.marketPrice);

  const adj = Math.max(-0.15, Math.min(0.15, (cond - 0.65) * 0.2 + (price - 0.8) * 0.25));
  const unitLow = Math.round(c.marketPrice * 0.55 * (1 + adj));
  const unitHigh = Math.round(c.marketPrice * 0.75 * (1 + adj));
  const unitMid = (unitLow + unitHigh) / 2;

  const bookValue = c.qty * c.marketPrice;
  const gross = Math.round(c.qty * unitMid);
  const commission = Math.round(gross * COMMISSION_PCT);
  const logistics = Math.round(gross * LOGISTICS_PCT);
  const net = gross - commission - logistics;
  const recoveryPct = round2(((unitMid * c.qty) / bookValue) * 100);
  const roiPct = round2((net / bookValue) * 100);

  const demandTier = c.demandIndex >= 70 ? "High" : c.demandIndex >= 40 ? "Medium" : "Low";
  const daysToLiquidate = demandTier === "High" ? 18 : demandTier === "Medium" ? 38 : 72;

  return {
    bookValue,
    unitLow,
    unitHigh,
    rangeLow: unitLow * c.qty,
    rangeHigh: unitHigh * c.qty,
    recoveryPct,
    daysToLiquidate,
    demandTier,
    gross,
    commission,
    logistics,
    net,
    roiPct,
  };
}

const LOCATION_PROX = { self: 100, region: 70, other: 40 } as const;

function proximity(buyerCity: string, buyerRegion: string, itemCity: string, itemRegion: string) {
  if (buyerCity === itemCity) return LOCATION_PROX.self;
  if (buyerRegion === itemRegion) return LOCATION_PROX.region;
  return LOCATION_PROX.other;
}

export function matchBuyers(
  c: Pick<RawSeed, "city" | "region">,
  buyers: BuyerSeed[],
  econ: Economics
): Buyer[] {
  return buyers
    .map((b) => {
      const locationProx = proximity(b.city, b.region, c.city, c.region);
      const capacity = Math.round(clamp01(b.capacityMul / 1.2) * 100);
      const history = Math.min(100, b.purchases * 22);
      const sub = { categoryFit: b.categoryFit, locationProx, capacity, history };
      const match = Math.round(
        sub.categoryFit * 0.4 + sub.locationProx * 0.25 + sub.capacity * 0.2 + sub.history * 0.15
      );
      const offer =
        Math.round((econ.gross * (0.78 + (b.categoryFit / 100) * 0.22)) / 1000) * 1000;
      return { ...b, sub, match, offer };
    })
    .sort((a, z) => z.match - a.match);
}

export function buildCandidates(raws: RawSeed[]): Candidate[] {
  const maxQty = Math.max(...raws.map((r) => r.qty));
  return raws.map((raw): Candidate => {
    const status: RecStatus = raw.status ?? "Unreviewed";
    const factors = computeFactors(raw, maxQty);
    const score = computeScore(factors);
    const economics = computeEconomics(raw);
    const matched = matchBuyers(raw, raw.buyers, economics);
    return { ...raw, status, factors, score, tier: tierOf(score), economics, matched };
  });
}

/* ------------------------------------------------------------------ */
/* Seed data — every number below is derived at runtime, never stored  */
/* ------------------------------------------------------------------ */

export const SEED_RAW: RawSeed[] = [
  {
    id: "r1",
    sku: "WJ-2291",
    name: "Puffer Jacket — Alpine",
    category: "Winter Wear",
    qty: 340,
    ageDays: 294,
    condition: "Good",
    location: "Warehouse A",
    city: "Mumbai",
    region: "MH",
    askPrice: 2900,
    marketPrice: 3500,
    demandIndex: 42,
    buyers: [
      { name: "SportsMart Wholesale", city: "Mumbai", region: "MH", categoryFit: 94, purchases: 6, capacityMul: 1.1, note: "Buys winter clusters every Nov–Jan" },
      { name: "SecondStride Retail", city: "Delhi", region: "DL", categoryFit: 82, purchases: 3, capacityMul: 0.9, note: "Resells branded outerwear pan-India" },
      { name: "Export Traders India", city: "Surat", region: "GJ", categoryFit: 61, purchases: 1, capacityMul: 1.3, note: "Occasional bulk mixed-lot exports" },
    ],
  },
  {
    id: "r2",
    sku: "SK-3842",
    name: "Cotton Shirt — Slim Fit",
    category: "Casual",
    qty: 2860,
    ageDays: 332,
    condition: "Fair",
    location: "Warehouse B",
    city: "Thane",
    region: "MH",
    askPrice: 850,
    marketPrice: 1100,
    demandIndex: 66,
    buyers: [
      { name: "Urban Chic Retail", city: "Mumbai", region: "MH", categoryFit: 91, purchases: 5, capacityMul: 0.8, note: "Monthly casual-wear restocker" },
      { name: "Metro Factory Outlets", city: "Pune", region: "MH", categoryFit: 84, purchases: 4, capacityMul: 1.2, note: "Takes large fair-condition lots" },
      { name: "ValueMart Distributors", city: "Indore", region: "MP", categoryFit: 58, purchases: 2, capacityMul: 1.4, note: "Price-sensitive bulk buyer" },
    ],
  },
  {
    id: "r3",
    sku: "FT-1177",
    name: "Trail Sneakers — Ridge 5",
    category: "Footwear",
    qty: 520,
    ageDays: 188,
    condition: "New",
    location: "Warehouse A",
    city: "Mumbai",
    region: "MH",
    askPrice: 2400,
    marketPrice: 3200,
    demandIndex: 74,
    buyers: [
      { name: "PeakGear Co.", city: "Mumbai", region: "MH", categoryFit: 96, purchases: 7, capacityMul: 0.7, note: "Top footwear buyer, fast close" },
      { name: "StepUp Commerce", city: "Bengaluru", region: "KA", categoryFit: 78, purchases: 3, capacityMul: 1.0, note: "Online-first sneaker reseller" },
    ],
  },
  {
    id: "r4",
    sku: "LV-4410",
    name: "Leather Handbags — Milano",
    category: "Accessories",
    qty: 180,
    ageDays: 245,
    condition: "Good",
    location: "Warehouse C",
    city: "Pune",
    region: "MH",
    askPrice: 4200,
    marketPrice: 5600,
    demandIndex: 38,
    buyers: [
      { name: "LuxeLoft Boutiques", city: "Mumbai", region: "MH", categoryFit: 89, purchases: 4, capacityMul: 0.6, note: "Premium accessories, 3-city chain" },
      { name: "Export Traders India", city: "Surat", region: "GJ", categoryFit: 64, purchases: 1, capacityMul: 1.5, note: "Mixed-lot exporter" },
    ],
  },
  {
    id: "r5",
    sku: "KL-0932",
    name: "Kids Fleece Set — Cosy",
    category: "Winter Wear",
    qty: 1240,
    ageDays: 152,
    condition: "Good",
    location: "Warehouse B",
    city: "Thane",
    region: "MH",
    askPrice: 640,
    marketPrice: 800,
    demandIndex: 81,
    buyers: [
      { name: "TinyTots Wholesale", city: "Mumbai", region: "MH", categoryFit: 93, purchases: 8, capacityMul: 1.0, note: "Highest-frequency kidswear buyer" },
      { name: "FamilyCart Online", city: "Jaipur", region: "RJ", categoryFit: 71, purchases: 2, capacityMul: 0.8, note: "Marketplace seller network" },
    ],
  },
  {
    id: "r6",
    sku: "DN-7725",
    name: "Denim Jacket — Classic Blue",
    category: "Casual",
    qty: 760,
    ageDays: 271,
    condition: "Fair",
    location: "Warehouse D",
    city: "Nashik",
    region: "MH",
    askPrice: 1350,
    marketPrice: 1750,
    demandIndex: 51,
    buyers: [
      { name: "Metro Factory Outlets", city: "Pune", region: "MH", categoryFit: 86, purchases: 4, capacityMul: 0.9, note: "Regular denim lot purchaser" },
      { name: "SecondStride Retail", city: "Delhi", region: "DL", categoryFit: 74, purchases: 3, capacityMul: 1.1, note: "Pan-India reseller" },
    ],
  },
];

export function seedCandidates(): Candidate[] {
  return buildCandidates(SEED_RAW);
}
