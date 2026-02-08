<objective>
Conduct a comprehensive UX/UI audit of the current Buildr application to identify design gaps, missing components, and violations of the strict Design Compact.
</objective>

<context>
The application is a Premium Nigeria-First Landing Page Builder.
We adhere to a strict "Art-Directed" design philosophy (Design Compact).
The goal is to ensure every page feels premium, "heavy" with trust, and asymmetrically designed.

Referenced Guidelines:
- **Design Compact**: Asymmetry is Law (No 50/50), Lagos Luxury (Trust Signals), Living Interface (Motion).
- **Project Context**: Template-Only, Nigeria-First (Naira, sqm, WhatsApp).
</context>

<requirements>
1. **Analyze Codebase**: Scan `app/` and `components/` directories.
2. **Critique Design**:
   - Identify **Symmetric Grids** (grid-cols-2 in Hero) -> FAILURE.
   - Identify **Generic UI** (Bootstrap look) -> FAILURE.
   - Identify **Missing Components** (Navigation, Footer, Trust Badges).
   - Identify **Missing Trust Signals** (RC Number, Verified Badge with depth).
3. **Identify Gaps**:
   - Does the app have a unified Navigation?
   - Is there a clear consistent Footer?
   - Are "Nigeria-First" elements present (Naira, WhatsApp)?
</requirements>

<output_format>
Generate a report in `analysis/ux-audit.md` with:
- **Critical Violations**: List of 50/50 grids, flat icons, generic colors.
- **Missing Components**: e.g., "Main Navigation", "Unified Footer".
- **Nigeria-First Gaps**: e.g., "Price in USD", "Missing WhatsApp".
- **Action Plan**: Specific recommended fixes.
</output_format>

<verification>
Ensure the report cites specific file paths and line numbers where violations occur.
</verification>
