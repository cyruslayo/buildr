---
description: Enforce usage of pnpm package manager
globs: "**/*"
trigger: always_on
---
# Package Manager: PNPM

This project uses **pnpm**.

**Forbidden Commands:**
- npm install
- npm run
- npx (prefer pnpm dlx)
- yarn

**Required Commands:**
- pnpm install
- pnpm add <package>
- pnpm dev
- pnpm build
- pnpm dlx <command> (for one-off executions)
