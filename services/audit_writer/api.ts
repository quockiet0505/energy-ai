import { api } from "encore.dev/api";
import { write_audit_record } from "./audit";

// Store a reproducible recommendation record.
export const write_audit = api(
  { method: "POST", path: "/audit/write" },
  async (input: {
    user_profile: unknown;
    tool_outputs: unknown;
    final_recommendation: unknown;
  }) => {
    return write_audit_record(
      input.user_profile,
      input.tool_outputs,
      input.final_recommendation
    );
  }
);
