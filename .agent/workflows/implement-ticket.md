---
description: Execute a single ticket using TDD (RedGreenRefactor)
---
# Workflow: Implement Ticket

1.  **Read Ticket**:
    -   Parse ticket ID from user (e.g., BLDR-2WIZ-001).
    -   Read docs/project-docs/12-IMPLEMENTATION-TICKETS.md to find ticket.
    -   Extract: Priority, Effort, Test First, Implementation, Acceptance Criteria, Dependencies.

2.  **Verify Dependencies**:
    -   Check if all dependency tickets are marked complete.
    -   If not, warn user and ask to proceed or switch.

3.  **Write Test First**:
    -   Create test file as specified in "Test First" section.
    -   Run pnpm test to confirm test fails (Red phase).

4.  **Implement Code**:
    -   Write minimal code to pass the test.
    -   Run pnpm test to confirm test passes (Green phase).

5.  **Refactor**:
    -   Apply design rules (Rule 03).
    -   Run pnpm test again.

6.  **Mark Complete**:
    -   Update ticket status in 12-IMPLEMENTATION-TICKETS.md.
