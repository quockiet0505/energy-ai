export type UsageProfile = {
  daytime_pct: number;
  evening_pct: number;
  overnight_pct: number;
};

export type PricingComponents = {
  pricing_model: "SINGLE" | "TOU";
  supply_charge_daily: number;
  usage_rates: {
    single_rate?: number;
    peak_rate?: number;
    shoulder_rate?: number;
    offpeak_rate?: number;
  };
  feed_in_tariff: number;
};
