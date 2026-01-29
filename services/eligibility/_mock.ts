// Mock plan capability flags
export const MOCK_PLAN_CAPABILITIES = {
     PLAN_FLAT_BASIC: {
       supports_solar: true,
       supports_battery: false,
     },
     PLAN_TOU_SMART: {
       supports_solar: true,
       supports_battery: true,
     },
   };
   
   // Mock postcode coverage
   export const MOCK_PLAN_POSTCODES = {
     PLAN_FLAT_BASIC: ["3000", "3001", "2115"],
     PLAN_TOU_SMART: ["3000", "2115"],
   };
   
   // Mock VPP technical rules
   export const MOCK_VPP_RULES = {
     min_solar_kw: 5,
     supported_batteries: ["TESLA_POWERWALL"],
   };

   export type PlanId = keyof typeof MOCK_PLAN_POSTCODES;

   