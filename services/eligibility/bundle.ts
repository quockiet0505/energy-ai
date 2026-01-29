import { EligibilityResult } from "./types";

// Check whether a solar or battery bundle fits the property.
export function check_bundle_eligibility(input: {
  house_type: "DETACHED" | "APARTMENT";
  roof_type: "TILE" | "METAL" | "FLAT";
  grid_connected: boolean;
}): EligibilityResult {
  if (!input.grid_connected) {
    return { eligible: false, exclusion_reason: "OFF_GRID_NOT_SUPPORTED" };
  }

  if (input.house_type === "APARTMENT") {
    return { eligible: false, exclusion_reason: "APARTMENT_NOT_SUPPORTED" };
  }

  return { eligible: true };
}
