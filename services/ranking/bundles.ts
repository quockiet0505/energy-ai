import { RankedItem } from "./types";

// Rank solar or battery bundles by ROI.
export function rank_bundles_by_roi(
  bundles: { bundle_id: string; payback_years: number }[]
): RankedItem[] {
  const sorted = [...bundles].sort(
    (a, b) => a.payback_years - b.payback_years
  );

  return sorted.map((b, idx) => ({
    id: b.bundle_id,
    rank: idx + 1,
    reason_codes: idx === 0 ? ["FASTEST_PAYBACK"] : [],
  }));
}
