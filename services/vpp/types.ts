export type VppProgram = {
     program_id: string;
     expected_value_range: [number, number];
   };
   
   export type VppConstraints = {
     reserve_pct: number;
     max_dispatch_kwh_per_year: number;
     contract_term_months: number;
   };
   