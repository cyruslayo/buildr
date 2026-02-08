---
description: The Buildr Dev Team Compact - Quality, Process, and Review Standards
globs: "**/*.{ts,tsx,js,jsx}"
trigger: always_on
---
# The Dev Team Compact

This project adheres to strict quality and process standards.

## 1. The Red-Green Proof (TDD)
- **Rule:** You cannot write implementation code without a failing test.
- **Requirement:** Every feature PR/Commit must include the test file that verifies the feature.

## 2. Server Component Supremacy
- **Rule:** "use client" is a privilege, not a default.
- **Requirement:** Any file using "use client" MUST include a comment justifying why.

## 3. Nigerian Market Validation
- **Rule:** "If it says Dollars, it is a bug."
- **Requirement:** All generated outputs must be validated for Naira (N), sqm, and WhatsApp.

## 4. Mobile-First Integrity
- **Rule:** Layouts break at 375px (iPhone SE).
- **Requirement:** All UI components must be verified at 375px width.

## 5. Git Hygiene
- **Rule:** Ticket-Driven Development.
- **Branch Naming:** feature/BLDR-[TicketID].
