import { MOCK_VPP_RULES } from "./_mock";
import { EligibilityResult } from "./types";

// Check hard technical VPP eligibility.
export function check_vpp_technical_eligibility(input: {
  battery_model: string;
  solar_size_kw: number;
  has_smart_meter: boolean;
}): EligibilityResult {
  if (!input.has_smart_meter) {
    return { eligible: false, exclusion_reason: "SMART_METER_REQUIRED" };
  }

  if (input.solar_size_kw < MOCK_VPP_RULES.min_solar_kw) {
    return { eligible: false, exclusion_reason: "SOLAR_TOO_SMALL" };
  }

  if (
    !MOCK_VPP_RULES.supported_batteries.some(b =>
      input.battery_model.toUpperCase().includes(b)
    )
  ) {
    return { eligible: false, exclusion_reason: "BATTERY_NOT_SUPPORTED" };
  }

  return { eligible: true };
}
