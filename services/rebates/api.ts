import { api } from "encore.dev/api";
import { check_rebate_qualification } from "./qualify";

// Get eligible rebates and values.
export const get_rebates = api(
  { method: "POST", path: "/rebates/check" },
  async (input: {
    state: string;
    is_owner: boolean;
    system_type: "SOLAR" | "BATTERY";
  }) => {
    return {
      eligible_rebates: check_rebate_qualification(input),
    };
  }
);
