// filter_bundles_by_type_and_status
// check_bundle_eligibility
export function filterBundlesByTypeAndStatus() {
     return { bundle_ids: ["solar_6kw", "battery_10kwh"] };
   }
   
   export function checkBundleEligibility() {
     return { eligible: true, warnings: [] };
   }
   