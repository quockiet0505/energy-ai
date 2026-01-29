import { MOCK_VPP_PROGRAMS } from "./_mock";

// Expose VPP downsides and constraints.
export function evaluate_vpp_constraints(program_id: string) {
  const program = MOCK_VPP_PROGRAMS.find(p => p.program_id === program_id);

  if (!program) {
    return null;
  }

  return {
    reserve_pct: program.reserve_pct,
    max_dispatch_kwh_per_year: program.max_dispatch_kwh_per_year,
    contract_term_months: program.contract_term_months,
  };
}
