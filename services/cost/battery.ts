// simulate_battery_impact
// calculate_battery_roi
// evaluate_vpp_programs
// evaluate_vpp_constraints
import { PricingComponents, UsageProfile } from "./types";

export function simulateBatteryImpact(
  battery_capacity_kwh: number,
  usage: UsageProfile,
  pricing: PricingComponents
) {
  const shifted = battery_capacity_kwh * 300;
  const saving =
    shifted *
    ((pricing.usageRates.peakRate ?? 0) -
      (pricing.usageRates.offPeakRate ?? 0));

  return {
    annual_additional_saving: round(saving),
    peak_shift_pct: 0.4,
  };
}

export function calculateBatteryROI(
  upfront_cost: number,
  annual_saving: number,
  vpp_income = 0
) {
  const total = annual_saving + vpp_income;
  return {
    payback_years: round(upfront_cost / total),
    net_10yr_benefit: round(total * 10 - upfront_cost),
  };
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}
