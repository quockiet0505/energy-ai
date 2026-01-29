export type PricingModel = "SINGLE" | "TOU" | "WHOLESALE";

export interface UsageRates {
  singleRate?: number;
  peakRate?: number;
  shoulderRate?: number;
  offPeakRate?: number;
}

export interface FeesSummary {
  hasCreditCardFee: boolean;
  hasExitFee: boolean;
}

export interface PricingComponents {
  pricingModel: PricingModel;
  supplyChargeDaily: number;
  usageRates: UsageRates;
  feedInTariff: number;
  feesSummary: FeesSummary;
}

export interface UsageProfile {
  daytime_pct: number;
  evening_pct: number;
  overnight_pct: number;
}
