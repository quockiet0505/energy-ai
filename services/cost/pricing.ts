import {
     MOCK_AVG_RATE_BY_STATE,
     MOCK_FIT_BY_STATE,
     MOCK_SUPPLY_CHARGE_DAILY,
     MOCK_TOU_RATES,
   } from "./_mock";
import { PricingComponents } from "./types";
   
   // Normalize plan pricing into calculation-ready components.
   export function extract_plan_pricing_components(
     state: string,
     pricing_model: "SINGLE" | "TOU"
   ): PricingComponents {
     if (pricing_model === "SINGLE") {
       return {
         pricing_model: "SINGLE",
         supply_charge_daily: MOCK_SUPPLY_CHARGE_DAILY,
         usage_rates: {
           single_rate: MOCK_AVG_RATE_BY_STATE[state] ?? 0.30,
         },
         feed_in_tariff: MOCK_FIT_BY_STATE[state] ?? 0.06,
       };
     }
   
     return {
       pricing_model: "TOU",
       supply_charge_daily: MOCK_SUPPLY_CHARGE_DAILY,
       usage_rates: {
         peak_rate: MOCK_TOU_RATES.peak,
         shoulder_rate: MOCK_TOU_RATES.shoulder,
         offpeak_rate: MOCK_TOU_RATES.offpeak,
       },
       feed_in_tariff: MOCK_FIT_BY_STATE[state] ?? 0.06,
     };
   }
   