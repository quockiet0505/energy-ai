// estimate_usage_from_bill
// build_usage_profile
import { UsageProfile } from "./types";

export function estimateUsageFromBill(
  monthly_bill: number,
  postcode: string,
  customer_type: "RESIDENTIAL" | "BUSINESS"
) {
  const avgRate = customer_type === "BUSINESS" ? 0.28 : 0.32;
  return {
    estimated_monthly_kwh: Math.round(monthly_bill / avgRate),
    confidence_level: "MEDIUM" as const,
  };
}

export function buildUsageProfile(
  monthly_kwh: number,
  has_pool: boolean,
  has_ev: boolean,
  has_ac: boolean
): UsageProfile {
  let daytime = 0.35;
  let evening = 0.45;
  let overnight = 0.2;

  if (has_ev) overnight += 0.15;
  if (has_pool || has_ac) daytime += 0.1;

  const total = daytime + evening + overnight;

  return {
    daytime_pct: daytime / total,
    evening_pct: evening / total,
    overnight_pct: overnight / total,
  };
}
