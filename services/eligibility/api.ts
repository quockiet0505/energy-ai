import { api } from "encore.dev/api";
import {
  filterPlansByGeographyAndCustomer,
  checkPlanEligibility,
} from "./plan";
import {
  filterBundlesByTypeAndStatus,
  checkBundleEligibility,
} from "./bundle";
import { checkVppTechnicalEligibility } from "./vpp";

export const filter_plans = api(
  { method: "POST", path: "/eligibility/plans" },
  async (input: { postcode: string; customer_type: "RESIDENTIAL" | "BUSINESS" }) =>
    filterPlansByGeographyAndCustomer(input.postcode, input.customer_type)
);

export const check_plan = api(
  { method: "POST", path: "/eligibility/plan" },
  async (input: {
    plan_id: string;
    meter_type: string;
    has_solar: boolean;
    has_battery: boolean;
  }) => checkPlanEligibility()
);

export const filter_bundles = api(
  { method: "POST", path: "/eligibility/bundles" },
  async () => filterBundlesByTypeAndStatus()
);

export const check_bundle = api(
  { method: "POST", path: "/eligibility/bundle" },
  async () => checkBundleEligibility()
);

export const check_vpp = api(
  { method: "POST", path: "/eligibility/vpp" },
  async () => checkVppTechnicalEligibility()
);
