import { api } from "encore.dev/api";
import { evaluate_vpp_programs } from "./evaluate";
import { evaluate_vpp_constraints } from "./constraints";

// Evaluate available VPP programs and value ranges.
export const evaluate_vpp = api(
  { method: "POST", path: "/vpp/evaluate" },
  async (input: {
    battery_model: string;
    state: string;
  }) => {
    return {
      eligible_programs: evaluate_vpp_programs(
        input.battery_model,
        input.state
      ),
    };
  }
);

// Get constraints and downsides for a VPP program.
export const vpp_constraints = api(
  { method: "POST", path: "/vpp/constraints" },
  async (input: { program_id: string }) => {
    return evaluate_vpp_constraints(input.program_id);
  }
);
