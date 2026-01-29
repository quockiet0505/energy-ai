import { api } from "encore.dev/api";
import { detect_inefficiencies } from "./insights";
import { rank_plans_by_cost } from "./plans";
import { rank_bundles_by_roi } from "./bundles";

// Detect inefficiencies and lost value in the current setup.
export const detect_insights = api(
  { method: "POST", path: "/ranking/insights" },
  async (input: {
    pricing_model: string;
    has_battery: boolean;
    feed_in_tariff: number;
    in_vpp: boolean;
  }) => {
    return {
      issues: detect_inefficiencies(input),
    };
  }
);

// Rank electricity plans.
export const rank_plans = api(
  { method: "POST", path: "/ranking/plans" },
  async (input: {
    plan_costs: { plan_id: string; annual_cost: number }[];
  }) => {
    return {
      ranked_plans: rank_plans_by_cost(input.plan_costs),
    };
  }
);

// Rank solar or battery bundles.
export const rank_bundles = api(
  { method: "POST", path: "/ranking/bundles" },
  async (input: {
    bundles: { bundle_id: string; payback_years: number }[];
  }) => {
    return {
      ranked_bundles: rank_bundles_by_roi(input.bundles),
    };
  }
);
