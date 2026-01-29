// filter_plans_by_geography_and_customer
// check_plan_eligibility
export function filterPlansByGeographyAndCustomer(
     postcode: string,
     customer_type: "RESIDENTIAL" | "BUSINESS"
   ) {
     return { valid_plan_ids: ["plan_basic", "plan_tou"] };
   }
   
   export function checkPlanEligibility() {
     return { eligible: true, exclusion_reason: null };
   }
   