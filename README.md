# ProjectHub: Multi-Tenant Project Management Backend

---

## 📖 Scenario

You’re building ProjectHub, a SaaS backend for teams to manage projects, tasks, comments and collaborators. Multiple organizations (tenants) share the same codebase and database, but must never see each other’s data.

---

## 🎯 Core Requirements

1. API Design

   - Fully RESTful endpoints under `/api/v1/` with versioning.
   - CRUD for Organizations, Users, Projects, Tasks, Comments.

2. Data Modeling (MongoDB + Mongoose)

   - Tenants: each document must be scoped to an `organizationId`.
   - Many-to-many: Users ↔ Projects (with per-project Role enum: owner, admin, member, viewer).
   - Tasks belong to Projects; Comments belong to Tasks and reference their author.
   - Timestamps and soft deletes for all entities.

3. Authentication & Authorization

   - JWT-based auth with Passport.js.
   - Middleware to verify tenant scope on every request.
   - Role-based access control: only owners/admins can add users or delete a project; members can CRUD tasks; viewers can read only.

4. Audit Trail

   - Record every create/update/delete in an `AuditLog` collection with fields: actorUserId, action, entityType, entityId, timestamp, diff (what changed).

5. Localization & Enums

   - Define roles, task statuses (todo, in-progress, done) and priority (low, medium, high) as enums.
   - Build a translation layer so API can return enum labels in English, French or Spanish based on `Accept-Language` header.

6. Performance & Scalability

   - Indexes on tenant fields and commonly filtered properties (`organizationId`, `projectId`, `status`).
   - Implement Redis caching for project list per user (TTL 5 minutes).

7. Validation & Error Handling

   - Use Joi or express-validator to enforce payload rules.
   - Consistent JSON error format with HTTP status codes.

8. Documentation & Testing

   - Swagger (OpenAPI) spec under `/docs`.
   - Unit tests for controllers and middleware with Jest and Supertest. Aim for ≥80% coverage.

9. Deployment
   - Dockerfile and Docker Compose for app, MongoDB, Redis.
   - GitHub Actions CI workflow: lint → test → build Docker image → push to registry.

---
