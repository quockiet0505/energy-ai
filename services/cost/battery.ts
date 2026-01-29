import { UsageProfile, PricingComponents } from "./types";

// Estimate additional savings from battery usage.
export function simulate_battery_impact(
  battery_capacity_kwh: number,
  usage: UsageProfile,
  pricing: PricingComponents
) {
  const shifted_kwh = battery_capacity_kwh * 300;

  const spread =
    (pricing.usage_rates.peak_rate ?? 0.45) -
    (pricing.usage_rates.offpeak_rate ?? 0.18);

  return {
    annual_additional_saving: Math.round(shifted_kwh * spread),
    peak_shift_pct: Math.round(usage.evening_pct * 100),
  };
}
