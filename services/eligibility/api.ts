import { api } from "encore.dev/api";
import { check_plan_eligibility } from "./plan";
import { check_bundle_eligibility } from "./bundle";
import { check_vpp_technical_eligibility } from "./vpp";

// Check electricity plan eligibility.
export const check_plan = api(
  { method: "POST", path: "/eligibility/plan" },
  async (input: {
    plan_id: "PLAN_FLAT_BASIC" | "PLAN_TOU_SMART";
    postcode: string;
    has_solar: boolean;
    has_battery: boolean;
  }) => {
    return check_plan_eligibility(input);
  }
);

// Check solar or battery bundle eligibility.
export const check_bundle = api(
  { method: "POST", path: "/eligibility/bundle" },
  async (input: {
    house_type: "DETACHED" | "APARTMENT";
    roof_type: "TILE" | "METAL" | "FLAT";
    grid_connected: boolean;
  }) => {
    return check_bundle_eligibility(input);
  }
);

// Check technical VPP eligibility.
export const check_vpp = api(
  { method: "POST", path: "/eligibility/vpp" },
  async (input: {
    battery_model: string;
    solar_size_kw: number;
    has_smart_meter: boolean;
  }) => {
    return check_vpp_technical_eligibility(input);
  }
);
