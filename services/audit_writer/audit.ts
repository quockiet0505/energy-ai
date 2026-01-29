// Create a deterministic audit record.
export function write_audit_record(
  user_profile: unknown,
  tool_outputs: unknown,
  final_recommendation: unknown
) {
  return {
    audit_id: `AUDIT_${Date.now()}`,
    user_profile,
    tool_outputs,
    final_recommendation,
    created_at: new Date().toISOString(),
  };
}
