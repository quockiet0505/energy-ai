// write_audit_record
// replay_recommendation
const store = new Map<string, any>();

export function writeAuditRecord(
  user_profile: any,
  tool_outputs: any,
  final_recommendation: any
) {
  const id = "audit_" + Date.now();
  store.set(id, { user_profile, tool_outputs, final_recommendation });
  return { audit_id: id };
}

export function replayRecommendation(audit_id: string) {
  return store.get(audit_id);
}
