export function inr(n: number): string {
  return "\u20B9" + new Intl.NumberFormat("en-IN").format(Math.round(n));
}

export function lakh(n: number): string {
  const l = n / 100000;
  if (l >= 100) return "\u20B9" + (l / 100).toFixed(2) + "Cr";
  return "\u20B9" + l.toFixed(1) + "L";
}

export function monoDate(iso: string): string {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${day} \u00B7 ${time}`;
}

export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}
