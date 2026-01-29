import { UsageProfile } from "./types";
import { MOCK_AVG_RATE_BY_STATE } from "./_mock";

// Estimate electricity usage (kWh) from a bill amount.
export function estimate_usage_from_bill(
  monthly_bill: number,
  state: string
) {
  const rate = MOCK_AVG_RATE_BY_STATE[state] ?? 0.30;

  return {
    estimated_monthly_kwh: Math.round(monthly_bill / rate),
    confidence_level: "MEDIUM",
  };
}

// Build daily usage profile (day / evening / overnight).
export function build_usage_profile(
  monthly_kwh: number,
  has_pool: boolean,
  has_ev: boolean,
  has_ac: boolean
): UsageProfile {
  let daytime = 0.35;
  let evening = 0.45;
  let overnight = 0.20;

  if (has_pool) daytime += 0.05;
  if (has_ev) overnight += 0.10;
  if (has_ac) evening += 0.05;

  const total = daytime + evening + overnight;

  return {
    daytime_pct: daytime / total,
    evening_pct: evening / total,
    overnight_pct: overnight / total,
  };
}
