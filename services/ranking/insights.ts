// detect_inefficiencies
export function detectInefficiencies(
     pricing_model: string,
     has_solar: boolean,
     has_battery: boolean,
     feed_in_tariff: number,
     in_vpp: boolean
   ) {
     const issues = [];
   
     if (has_battery && pricing_model === "SINGLE") {
       issues.push({
         issue_code: "FLAT_RATE_WITH_BATTERY",
         estimated_annual_loss: 300,
       });
     }
   
     if (feed_in_tariff < 0.06) {
       issues.push({
         issue_code: "LOW_FEED_IN_TARIFF",
         estimated_annual_loss: 200,
       });
     }
   
     if (has_battery && !in_vpp) {
       issues.push({
         issue_code: "NOT_IN_VPP",
         estimated_annual_loss: 250,
       });
     }
   
     return { issues };
   }
   