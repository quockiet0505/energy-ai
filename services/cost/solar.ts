import { UsageProfile, PricingComponents } from "./types";

// Estimate bill reduction after installing solar panels.
export function simulate_solar_impact(
  solar_size_kw: number,
  usage: UsageProfile,
  pricing: PricingComponents
) {
  const annual_generation_kwh = solar_size_kw * 4 * 365;

  const self_consumed =
    annual_generation_kwh * usage.daytime_pct;

  const exported =
    annual_generation_kwh - self_consumed;

  return {
    annual_saving: Math.round(
      self_consumed * (pricing.usage_rates.single_rate ?? 0.30)
    ),
    self_consumption_rate: +(self_consumed / annual_generation_kwh).toFixed(2),
    exported_kwh: Math.round(exported),
  };
}
