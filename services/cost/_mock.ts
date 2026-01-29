// Mock average electricity prices by state (AUD/kWh)
export const MOCK_AVG_RATE_BY_STATE: Record<string, number> = {
     NSW: 0.30,
     VIC: 0.28,
     QLD: 0.26,
     SA: 0.35,
     WA: 0.29,
   };
   
   // Mock feed-in tariffs by state (AUD/kWh)
   export const MOCK_FIT_BY_STATE: Record<string, number> = {
     NSW: 0.08,
     VIC: 0.05,
     QLD: 0.06,
     SA: 0.10,
     WA: 0.07,
   };
   
   // Mock TOU spreads
   export const MOCK_TOU_RATES = {
     peak: 0.45,
     shoulder: 0.30,
     offpeak: 0.18,
   };
   
   // Mock supply charge
   export const MOCK_SUPPLY_CHARGE_DAILY = 1.10;
   