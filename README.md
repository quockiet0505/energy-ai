# energy-ai

### PROJECT FOLDER STRUCTURE

```bash
energy-ai-platform/
├── data/
│   ├── raw/
│   ├── core/
│   └── audit/
│
├── services/
│   ├── eligibility/
│   ├── cost/
│   ├── ranking/
│   └── audit_writer/
│
├── agent/
│   ├── gating/
│   ├── playbooks/
│   ├── tools/
│   └── examples/
│
├── knowledge/
│   ├── definitions/
│   └── explanations/
│
├── infra/
│   ├── cloud_run/
│   └── iam/
│
├── docs/
│   ├── architecture.md
│   ├── event_flow.md
│   └── demo_script.md
│
├── README.md
├── .env.example
└── .gitignore

```

### data/ — Data & Facts (BigQuery Layer)

Stores all datasets used by the system.

- raw/: original source JSON data uploaded as-is (no logic depends on this directly)
- core/: normalized BigQuery tables used by backend services
- audit/: audit and replay data for debugging and compliance

### services/ — Deterministic Business Logic (Cloud Run Tools)

Each folder represents an independent Cloud Run service.

- eligibility/: checks whether plans, solar, or VPP options are applicable
- cost/: performs electricity cost calculations
- ranking/: compares and ranks available options
- audit_writer/: stores recommendation audit logs

### agent/ — AI Orchestration (Vertex AI Agent)

Controls conversation flow and tool usage.

- gating/: defines required inputs before calling any service
- playbooks/: conversation and tool-calling flows
- tools/: tool schemas (contracts between Agent and services)
- examples/: sample conversations for testing and demos

The agent never performs calculations or database queries directly.

### knowledge/ — Explanation & Education (Vertex AI Search)

Contains human-readable explanations.

- definitions/: domain terminology (TOU, VPP, FiT, etc.)
- explanations/: how calculations and decisions are explained to users

Used only for explanation, never for decision-making.

### infra/ — Infrastructure & Deployment

Deployment and access configuration.

- cloud_run/: scripts to deploy services
- iam/: service accounts and permission documentation

Not used at runtime.

### docs/ — Project Documentation

Human-facing documentation.

- architecture.md: system architecture overview
- event_flow.md: end-to-end request flow
- demo_script.md: demo walkthrough for stakeholders