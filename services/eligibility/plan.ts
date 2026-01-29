import {
  MOCK_PLAN_CAPABILITIES,
  MOCK_PLAN_POSTCODES,
  PlanId,
} from "./_mock";
import { EligibilityResult } from "./types";

// Check if a plan is available in the user's postcode.
export function check_plan_geography(
  plan_id: PlanId,
  postcode: string
): EligibilityResult {
  const allowed = MOCK_PLAN_POSTCODES[plan_id].includes(postcode);
  return allowed
    ? { eligible: true }
    : { eligible: false, exclusion_reason: "POSTCODE_NOT_SUPPORTED" };
}

// Check if a plan supports solar installations.
export function check_plan_solar_support(
  plan_id: PlanId,
  has_solar: boolean
): EligibilityResult {
  if (!has_solar) return { eligible: true };

  return MOCK_PLAN_CAPABILITIES[plan_id].supports_solar
    ? { eligible: true }
    : { eligible: false, exclusion_reason: "SOLAR_NOT_SUPPORTED" };
}

// Check if a plan supports battery installations.
export function check_plan_battery_support(
  plan_id: PlanId,
  has_battery: boolean
): EligibilityResult {
  if (!has_battery) return { eligible: true };

  return MOCK_PLAN_CAPABILITIES[plan_id].supports_battery
    ? { eligible: true }
    : { eligible: false, exclusion_reason: "BATTERY_NOT_SUPPORTED" };
}

// Apply all non-pricing eligibility rules to a plan.
export function check_plan_eligibility(input: {
  plan_id: PlanId;
  postcode: string;
  has_solar: boolean;
  has_battery: boolean;
}): EligibilityResult {
  const geo = check_plan_geography(input.plan_id, input.postcode);
  if (!geo.eligible) return geo;

  const solar = check_plan_solar_support(
    input.plan_id,
    input.has_solar
  );
  if (!solar.eligible) return solar;

  const battery = check_plan_battery_support(
    input.plan_id,
    input.has_battery
  );
  if (!battery.eligible) return battery;

  return { eligible: true };
}
