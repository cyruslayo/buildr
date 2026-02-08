# Data Models - Web

## Overview
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Schema File:** `prisma/schema.prisma`

## Entities

### User & Auth
Standard NextAuth V5 adapter models.
- **User**: Core user entity. Includes `email`, `name`, `image`, `plan` details.
- **Account**: Social login references.
- **Session**: Session management.
- **VerificationToken**: Email verification.

### Core Domain
- **Project**: Represents a landing page project.
  - `id`: PK
  - `name`: Project name
  - `code`: Valid HTML/Page content
  - `pageType`: Type of landing page
  - `userId`: Owner (Relation to User)
  - `versions`: History (Relation to Version)
  
- **Version**: Project history/snapshots.
  - `code`: Snapshot content
  - `message`: Commit message/label

- **Lead**: Captured leads from landing pages.
  - `email`: Lead email
  - `source`: Origin (landing, wizard, etc.)

## Relationships
- **User -> Projects**: One-to-Many (Cascade delete behavior not explicit in Project, implied ownership).
- **Project -> Versions**: One-to-Many.
- **User -> Accounts/Sessions**: One-to-Many (Cascade delete).

## Migrations
Managed via Prisma Migrate.
