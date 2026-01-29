import { api } from "encore.dev/api";
import { estimate_usage_from_bill, build_usage_profile } from "./usage";
import { extract_plan_pricing_components } from "./pricing";
import {
  calculate_energy_cost,
  calculate_tou_energy_cost,
} from "./energy";
import { simulate_solar_impact } from "./solar";
import { simulate_battery_impact } from "./battery";

// Simulate annual energy cost for a plan.
export const simulate_billing = api(
  { method: "POST", path: "/cost/simulate" },
  async (input: {
    monthly_bill?: number;
    monthly_kwh?: number;
    state: string;
    pricing_model: "SINGLE" | "TOU";
    has_pool?: boolean;
    has_ev?: boolean;
    has_ac?: boolean;
  }) => {
    const monthly_kwh =
      input.monthly_kwh ??
      estimate_usage_from_bill(input.monthly_bill!, input.state)
        .estimated_monthly_kwh;

    const pricing = extract_plan_pricing_components(
      input.state,
      input.pricing_model
    );

    const usage = build_usage_profile(
      monthly_kwh,
      !!input.has_pool,
      !!input.has_ev,
      !!input.has_ac
    );

    return input.pricing_model === "TOU"
      ? calculate_tou_energy_cost(pricing, usage, monthly_kwh)
      : calculate_energy_cost(pricing, monthly_kwh);
  }
);

// Simulate solar impact.
export const simulate_solar = api(
  { method: "POST", path: "/cost/solar" },
  async (input: {
    solar_size_kw: number;
    monthly_kwh: number;
    state: string;
  }) => {
    const pricing = extract_plan_pricing_components(
      input.state,
      "SINGLE"
    );

    const usage = build_usage_profile(input.monthly_kwh, false, false, false);

    return simulate_solar_impact(input.solar_size_kw, usage, pricing);
  }
);

// Simulate battery impact.
export const simulate_battery = api(
  { method: "POST", path: "/cost/battery" },
  async (input: {
    battery_capacity_kwh: number;
    monthly_kwh: number;
    state: string;
  }) => {
    const pricing = extract_plan_pricing_components(
      input.state,
      "TOU"
    );

    const usage = build_usage_profile(input.monthly_kwh, false, false, false);

    return simulate_battery_impact(
      input.battery_capacity_kwh,
      usage,
      pricing
    );
  }
);
