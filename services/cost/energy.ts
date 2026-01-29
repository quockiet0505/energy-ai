// grid cost
// extract_plan_pricing_components
// calculate_energy_cost
// calculate_tou_energy_cost
// calculate_solar_export_value

import { PricingComponents, UsageProfile } from "./types";


export function calculateEnergyCost(
  pricing: PricingComponents,
  monthly_kwh: number
) {
  const annual = monthly_kwh * 12;
  const supply = pricing.supplyChargeDaily * 365;
  const usage =
    pricing.pricingModel === "SINGLE"
      ? annual * (pricing.usageRates.singleRate ?? 0)
      : 0;

  return {
    annual_cost: round(supply + usage),
    cost_breakdown: {
      supply: round(supply),
      usage: round(usage),
      fees: 0,
    },
  };
}

export function calculateTouEnergyCost(
  pricing: PricingComponents,
  usage: UsageProfile,
  monthly_kwh: number
) {
  const annual = monthly_kwh * 12;

  const peak = annual * usage.evening_pct * (pricing.usageRates.peakRate ?? 0);
  const shoulder =
    annual * usage.daytime_pct * (pricing.usageRates.shoulderRate ?? 0);
  const offpeak =
    annual * usage.overnight_pct * (pricing.usageRates.offPeakRate ?? 0);

  const supply = pricing.supplyChargeDaily * 365;

  return {
    annual_cost: round(supply + peak + shoulder + offpeak),
    tou_breakdown: {
      supply: round(supply),
      peak: round(peak),
      shoulder: round(shoulder),
      offpeak: round(offpeak),
    },
  };
}

export function calculateSolarExportValue(
  exported_kwh: number,
  feed_in_tariff: number
) {
  return {
    annual_export_value: round(exported_kwh * feed_in_tariff),
  };
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}
