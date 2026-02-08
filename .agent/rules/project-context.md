---
description: Critical project constraints and context for Buildr (Nigeria-First)
globs: "**/*"
trigger: always_on
---
# Buildr Project Context

**Core Philosophy:**
- **Product:** A Template-Only Landing Page Builder for Nigerian Real Estate.
- **Migration Status:** We have moved AWAY from "Code-First" (Monaco/Sandpack). DO NOT suggest or implement code editing features for end-users.
- **Target Audience:** Non-technical real estate agents in Nigeria.

**Critical Constraints:**
1.  **Template-Only:** Users select templates + fill forms. No code generation for users.
2.  **Nigeria-First (CRITICAL):** 
    -   **Currency:** ALWAYS Naira (N).
    -   **Measurements:** ALWAYS sqm.
    -   **Property Types:** Be specific ("Semi-Detached Duplex", "Fully Detached Duplex", "Terrace", "BQ").
    -   **Integrations:** Paystack, WhatsApp (Required on every page).
3.  **Trust Signals (CRITICAL):** 
    -   Nigeria is a low-trust market. Every template MUST have visible slots for:
        -   RC Number (Corporate Affairs Commission).
        -   Verified Badge.
        -   Physical Office Address.
4.  **No Placeholders:** Use realistic Nigerian content (e.g., "Lekki Phase 1", "Ikoyi", "4 Bedroom Detached Duplex") instead of "Lorem Ipsum".
