import { RankedItem } from "./types";

// Rank electricity plans by estimated annual cost.
export function rank_plans_by_cost(
  plan_costs: { plan_id: string; annual_cost: number }[]
): RankedItem[] {
  const sorted = [...plan_costs].sort(
    (a, b) => a.annual_cost - b.annual_cost
  );

  return sorted.map((p, idx) => ({
    id: p.plan_id,
    rank: idx + 1,
    reason_codes: idx === 0 ? ["LOWEST_ESTIMATED_COST"] : [],
  }));
}
