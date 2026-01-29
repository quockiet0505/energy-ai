import { api } from "encore.dev/api";
import { rand, pick } from "../utils/random";
import {
  calculateEnergyCost,
  calculateTouEnergyCost,
  calculateSolarExportValue,
} from "./energy";
import { buildUsageProfile } from "./usage";
import { simulateSolarImpact } from "./solar";
import { simulateBatteryImpact } from "./battery";
import { PricingComponents } from "./types";

function randomPricing(): PricingComponents {
  const model = pick(["SINGLE", "TOU", "WHOLESALE"] as const);

  if (model === "SINGLE") {
    return {
      pricingModel: "SINGLE",
      supplyChargeDaily: rand(0.9, 1.5),
      usageRates: { singleRate: rand(0.25, 0.4) },
      feedInTariff: rand(0.05, 0.1),
      feesSummary: { hasCreditCardFee: false, hasExitFee: false },
    };
  }

  if (model === "TOU") {
    return {
      pricingModel: "TOU",
      supplyChargeDaily: rand(0.9, 1.5),
      usageRates: {
        peakRate: rand(0.4, 0.6),
        shoulderRate: rand(0.25, 0.35),
        offPeakRate: rand(0.15, 0.25),
      },
      feedInTariff: rand(0.05, 0.1),
      feesSummary: { hasCreditCardFee: false, hasExitFee: false },
    };
  }

  return {
    pricingModel: "WHOLESALE",
    supplyChargeDaily: rand(1.0, 1.6),
    usageRates: {},
    feedInTariff: rand(0.05, 0.1),
    feesSummary: { hasCreditCardFee: false, hasExitFee: false },
  };
}

export const calculate_cost = api(
  { method: "POST", path: "/cost/calculate" },
  async (input: { monthly_kwh: number }) => {
    const pricing = randomPricing();
    const usage = buildUsageProfile(input.monthly_kwh, false, false, false);

    if (pricing.pricingModel === "TOU") {
      return calculateTouEnergyCost(pricing, usage, input.monthly_kwh);
    }

    if (pricing.pricingModel === "SINGLE") {
      return calculateEnergyCost(pricing, input.monthly_kwh);
    }

    return {
      pricingModel: "WHOLESALE",
      note: "WHOLESALE pricing not implemented yet",
      pricing,
    };
  }
);

export const simulate_solar = api(
  { method: "POST", path: "/cost/solar" },
  async (input: { solar_size_kw: number; monthly_kwh: number }) => {
    const pricing = randomPricing();
    const usage = buildUsageProfile(input.monthly_kwh, false, false, false);

    const solar = simulateSolarImpact(
      input.solar_size_kw,
      usage,
      pricing
    );

    const exportValue = calculateSolarExportValue(
      solar.exported_kwh,
      pricing.feedInTariff
    );

    return { ...solar, ...exportValue };
  }
);

export const simulate_battery = api(
  { method: "POST", path: "/cost/battery" },
  async (input: { battery_capacity_kwh: number; monthly_kwh: number }) => {
    const pricing = randomPricing();
    const usage = buildUsageProfile(input.monthly_kwh, false, false, false);

    return simulateBatteryImpact(
      input.battery_capacity_kwh,
      usage,
      pricing
    );
  }
);
