// rank_plans
export function rankPlans(
     plan_cost_results: any[],
     detected_issues: any[]
   ) {
     return {
       ranked_plans: plan_cost_results.sort(
         (a, b) => a.annual_cost - b.annual_cost
       ),
       reason_codes: ["LOW_COST"],
     };
   }
   