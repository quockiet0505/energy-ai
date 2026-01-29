import { MOCK_VPP_PROGRAMS } from "./_mock";

// Evaluate eligible VPP programs and value ranges.
export function evaluate_vpp_programs(
  battery_model: string,
  state: string
) {
  return MOCK_VPP_PROGRAMS
    .filter(
      p =>
        state &&
        p.states.includes(state) &&
        battery_model.toUpperCase().includes(p.battery_model)
    )
    .map(p => ({
      program_id: p.program_id,
      expected_value_range: p.expected_value_range,
    }));
}
