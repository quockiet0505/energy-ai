import { api } from "encore.dev/api";
import { detectInefficiencies } from "./insights";
import { rankPlans } from "./plans";
import { rankBundles } from "./bundles";

export const detect_issues = api(
  { method: "POST", path: "/ranking/issues" },
  async (input: {
    pricing_model: string;
    has_solar: boolean;
    has_battery: boolean;
    feed_in_tariff: number;
    in_vpp: boolean;
  }) =>
    detectInefficiencies(
      input.pricing_model,
      input.has_solar,
      input.has_battery,
      input.feed_in_tariff,
      input.in_vpp
    )
);

export const rank_plans = api(
  { method: "POST", path: "/ranking/plans" },
  async (input: { plan_cost_results: any[], detected_issues: any[] }) =>
     rankPlans(input.plan_cost_results, input.detected_issues)
);

export const rank_bundles = api(
  { method: "POST", path: "/ranking/bundles" },
  async (input: { bundle_simulations: any[] }) =>
    rankBundles(input.bundle_simulations)
);
