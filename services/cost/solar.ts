// simulate_solar_impact
// calculate_solar_roi
import { PricingComponents, UsageProfile } from "./types";

export function simulateSolarImpact(
  solar_size_kw: number,
  usage: UsageProfile,
  pricing: PricingComponents
) {
  const generation = solar_size_kw * 1400;
  const selfUsed = generation * usage.daytime_pct;
  const exported = generation - selfUsed;

  const saving =
    selfUsed *
    (pricing.usageRates.singleRate ??
      pricing.usageRates.peakRate ??
      0);

  return {
    annual_saving: round(saving),
    self_consumption_rate: round(selfUsed / generation),
    exported_kwh: round(exported),
  };
}

export function calculateSolarROI(
  upfront_cost: number,
  annual_saving: number,
  rebate_value: number
) {
  const net = upfront_cost - rebate_value;
  return {
    payback_years: round(net / annual_saving),
    net_10yr_benefit: round(annual_saving * 10 - net),
  };
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}
