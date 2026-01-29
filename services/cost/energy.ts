// grid cost
// extract_plan_pricing_components
// calculate_energy_cost
// calculate_tou_energy_cost
// calculate_solar_export_value

import { PricingComponents, UsageProfile } from "./types";

// Calculate annual electricity cost for single-rate pricing.
export function calculate_energy_cost(
  pricing: PricingComponents,
  monthly_kwh: number
) {
  const usage_cost =
    monthly_kwh * 12 * pricing.usage_rates.single_rate!;

  const supply_cost = pricing.supply_charge_daily * 365;

  return {
    annual_cost: Math.round(usage_cost + supply_cost),
    cost_breakdown: {
      usage: Math.round(usage_cost),
      supply: Math.round(supply_cost),
    },
  };
}

// Calculate annual electricity cost for TOU pricing.
export function calculate_tou_energy_cost(
  pricing: PricingComponents,
  usage: UsageProfile,
  monthly_kwh: number
) {
  const annual_kwh = monthly_kwh * 12;

  const usage_cost =
    annual_kwh *
    (
      usage.evening_pct * pricing.usage_rates.peak_rate! +
      usage.daytime_pct * pricing.usage_rates.shoulder_rate! +
      usage.overnight_pct * pricing.usage_rates.offpeak_rate!
    );

  const supply_cost = pricing.supply_charge_daily * 365;

  return {
    annual_cost: Math.round(usage_cost + supply_cost),
    tou_breakdown: {
      peak_pct: usage.evening_pct,
      shoulder_pct: usage.daytime_pct,
      offpeak_pct: usage.overnight_pct,
    },
  };
}

// Calculate revenue from exported solar energy.
export function calculate_solar_export_value(
  exported_kwh: number,
  feed_in_tariff: number
) {
  return {
    annual_export_value: Math.round(exported_kwh * feed_in_tariff),
  };
}
