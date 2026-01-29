import { DetectedIssue } from "./types";
import { MOCK_THRESHOLDS } from "./_mock";

// Detect flat rate inefficiency when a battery is present.
export function detect_flat_rate_battery_penalty(
  pricing_model: string,
  has_battery: boolean
): DetectedIssue | null {
  if (pricing_model === "SINGLE" && has_battery) {
    return {
      issue_code: "FLAT_RATE_WITH_BATTERY",
      estimated_annual_loss: MOCK_THRESHOLDS.flat_rate_battery_loss,
    };
  }
  return null;
}

// Detect loss caused by low feed-in tariff.
export function detect_low_feed_in_tariff(
  feed_in_tariff: number
): DetectedIssue | null {
  if (feed_in_tariff < MOCK_THRESHOLDS.low_fit) {
    return {
      issue_code: "LOW_FEED_IN_TARIFF",
      estimated_annual_loss: 150,
    };
  }
  return null;
}

// Detect missing VPP participation value.
export function detect_missing_vpp(
  in_vpp: boolean,
  has_battery: boolean
): DetectedIssue | null {
  if (!in_vpp && has_battery) {
    return {
      issue_code: "NOT_IN_VPP",
      estimated_annual_loss: MOCK_THRESHOLDS.vpp_missing_value,
    };
  }
  return null;
}

// Aggregate all detected inefficiencies.
export function detect_inefficiencies(input: {
  pricing_model: string;
  has_battery: boolean;
  feed_in_tariff: number;
  in_vpp: boolean;
}): DetectedIssue[] {
  return [
    detect_flat_rate_battery_penalty(
      input.pricing_model,
      input.has_battery
    ),
    detect_low_feed_in_tariff(input.feed_in_tariff),
    detect_missing_vpp(input.in_vpp, input.has_battery),
  ].filter(Boolean) as DetectedIssue[];
}
