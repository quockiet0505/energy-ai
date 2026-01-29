// Mock VPP programs by state
export const MOCK_VPP_PROGRAMS = [
     {
       program_id: "TESLA_ENERGY_PLAN",
       battery_model: "TESLA_POWERWALL",
       states: ["NSW", "VIC", "SA"],
       expected_value_range: [400, 600],
       reserve_pct: 20,
       max_dispatch_kwh_per_year: 1200,
       contract_term_months: 24,
     },
     {
       program_id: "AGL_VPP",
       battery_model: "GENERIC",
       states: ["NSW", "QLD"],
       expected_value_range: [250, 450],
       reserve_pct: 30,
       max_dispatch_kwh_per_year: 900,
       contract_term_months: 12,
     },
   ];
   