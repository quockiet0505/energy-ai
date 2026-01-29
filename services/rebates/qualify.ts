import { MOCK_REBATES } from "./_mock";

// Check which rebates a user is eligible for.
export function check_rebate_qualification(input: {
  state: string;
  is_owner: boolean;
  system_type: "SOLAR" | "BATTERY";
}) {
  return MOCK_REBATES
    .filter(
      r =>
        r.state === input.state &&
        r.applies_to === input.system_type &&
        (!r.owner_only || input.is_owner)
    )
    .map(r => ({
      rebate_id: r.rebate_id,
      amount: r.amount,
    }));
}
