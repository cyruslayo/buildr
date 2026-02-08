---
description: Validate generated output for Nigerian market compliance
---
# Workflow: Validate Nigerian Output

1.  **Run Validator**:
    -   Execute pnpm dlx ts-node lib/validation/nigerian-validator.ts <file>.

2.  **Check Results**:
    -   **PASS**: Output has , sqm, WhatsApp link.
    -   **FAIL**: Output has $, sqft, missing WhatsApp.

3.  **Apply Auto-Fixes** (if available):
    -   Run auto-fix pipeline for currency/measurement conversion.

4.  **Log Result**:
    -   Append validation result to CI output.
