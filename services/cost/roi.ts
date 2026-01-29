// Calculate simple payback period.
export function calculate_solar_roi(
     upfront_cost: number,
     annual_saving: number,
     rebate_value: number
   ) {
     const net_cost = upfront_cost - rebate_value;
   
     return {
       payback_years: +(net_cost / annual_saving).toFixed(1),
       net_10yr_benefit: Math.round(annual_saving * 10 - net_cost),
     };
   }
   
   // Calculate battery ROI with optional VPP income.
   export function calculate_battery_roi(
     upfront_cost: number,
     annual_saving: number,
     vpp_income = 0
   ) {
     return {
       payback_years: +(
         upfront_cost /
         (annual_saving + vpp_income)
       ).toFixed(1),
       net_10yr_benefit:
         Math.round((annual_saving + vpp_income) * 10 - upfront_cost),
     };
   }
   