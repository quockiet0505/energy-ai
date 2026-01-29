import { api } from "encore.dev/api";
import { writeAuditRecord, replayRecommendation } from "./audit";

export const write_audit = api(
  { method: "POST", path: "/audit/write" },
  async (input: {
    user_profile: any;
    tool_outputs: any;
    final_recommendation: any;
  }) =>
    writeAuditRecord(
      input.user_profile,
      input.tool_outputs,
      input.final_recommendation
    )
);

export const replay_audit = api(
  { method: "POST", path: "/audit/replay" },
  async (input: { audit_id: string }) =>
    replayRecommendation(input.audit_id)
);
