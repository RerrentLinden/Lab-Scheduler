# Lab Scheduler

## Project Overview
Lab Scheduler is a laboratory instrument reservation platform designed to help research teams coordinate shared equipment usage. The goal of this document is to provide a project-wide reference for future development and deployment work. It captures the planned feature set, chosen technology stack, and the conventions that subsequent contributors should follow.

## Core Feature Modules
### User Management
- **Registration & Login**: Account creation with mobile number, password, and username fields plus password recovery.
- **Role Permissions**: Super administrators (also equipment managers) can configure the entire system; regular users can browse and book instruments.
- **Personal Dashboard**:
  - Update password and view account metadata.
  - Charts for frequently used instruments and typical usage windows.
  - Manage favorite instruments for one-click booking.

### Instrument Management
- Maintain instrument metadata (photo, name, unique ID, category, room, bench location, responsible contact).
- Track availability states (available, maintenance, retired) with change history.
- Record maintenance logs, next service reminders, and maintenance contacts.

### Instrument Booking
- Calendar view per instrument, showing hourly reservations with color coding.
- Booking rules: reserve ≥30 minutes in advance, cancel ≥30 minutes ahead with a reason, maximum 4-hour slot length, reservations up to one day in advance.
- Quick selection of currently available instruments within a category.
- QR-based quick reservation and sign-in to confirm usage start.

### Conflict Handling & Waitlists
- Auto-release reservations if users fail to sign in within 15 minutes; notify waitlisted users in sequence.
- Allow active sessions to request extensions while checking downstream conflicts and alerting affected users.
- Users can opt into waitlists with customizable notification windows.

### Analytics & Reporting
- Monthly utilization summaries, usage frequency rankings, idle slot analysis.
- Persistent reservation history with filters by date range, user, or instrument and export to Excel.
- Track policy violations (no-shows, frequent cancellations, overuse) and maintain a credit score that influences queue priority.

### System Reliability & Notifications
- Persist all booking and audit data, support Excel exports, and schedule automated backups.
- Notification events: booking confirmation, pre-use reminders, cancellation updates, and equipment restored alerts.

## Architectural Approach
The system will be implemented as a **monolithic Node.js (Express) application** that serves HTML pages rendered with a lightweight templating engine (e.g., EJS or Nunjucks). This approach keeps the technology footprint small and avoids the operational overhead of a fully separated front-end and back-end stack, while still enabling interactive browser-based experiences with progressive enhancement via vanilla JavaScript when needed.

Key integration points:
1. **Server-rendered HTML UI**: Core pages are rendered on the server and progressively enhanced in the browser.
2. **RESTful endpoints for dynamic features**: Background updates (e.g., calendar refresh, statistics charts) can be handled through JSON endpoints as the project evolves.
3. **MySQL database**: Central data store for users, instruments, reservations, maintenance logs, and analytics snapshots.
4. **Dockerized deployment**: Application and database are containerized to simplify setup across environments.

## Planned Directory Structure
The repository will evolve toward the following layout as features are implemented:
```
Lab-Scheduler/
├── backend/           # Express application source (routes, services, templates, static assets)
├── database/          # SQL schema, seed data, and migration scripts
├── docker/            # Dockerfiles and docker-compose configurations
├── docs/              # Additional documentation (API specs, design notes)
├── scripts/           # Automation scripts (backup, maintenance, reporting)
└── tests/             # Automated test suites (unit, integration, end-to-end)
```
For now only documentation lives in the repository; create the above directories as the corresponding functionality is implemented.

## Development Workflow
### Prerequisites
- Node.js 20+ and npm.
- MySQL 8 (local install or containerized instance).
- Docker and Docker Compose for container-based workflows.

### Environment Configuration
1. Copy `.env.example` (to be added later) to `.env` and configure:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` for MySQL access.
   - `SESSION_SECRET` and other security-related values.
2. Initialize the database using the forthcoming migration scripts.
3. Install JavaScript dependencies in `backend/` with `npm install` once the backend scaffold is committed.

### Local Development (planned)
1. Start MySQL locally or via Docker.
2. Run database migrations and seed data.
3. Launch the Express dev server (e.g., `npm run dev`) and access the UI via the printed URL.
4. Use linting (`npm run lint`) and tests (`npm test`) before committing changes.

## Docker & Deployment Strategy
- A `docker-compose.yml` file will orchestrate the Express app and a MySQL service.
- The application container will expose HTTP port 8080 (configurable), while MySQL will expose 3306 internally.
- Persistent volumes will store database data and uploaded assets.
- CI/CD pipelines should build and push versioned images, run automated tests, and trigger rolling updates on the target server.

## Data Management Guidelines
- Keep all reservation and audit records indefinitely; design tables with archival partitions if necessary.
- Schedule regular automated database backups and store them securely (e.g., compressed dumps exported nightly).
- Provide CSV/Excel export endpoints to satisfy reporting requirements.

## Testing & Quality Assurance
- Unit tests for business rules (booking limits, conflict detection, notification triggers).
- Integration tests covering booking workflows end-to-end.
- Linting and formatting to maintain consistent code style.
- Security reviews for authentication, authorization, and input validation.

## Roadmap Highlights
1. Scaffold Express backend with authentication and session management.
2. Implement core CRUD flows for instruments and reservations.
3. Build calendar and analytics visualizations.
4. Add notification services (email/SMS/push) as needed.
5. Harden deployment scripts and monitoring.

## Contributing
- Follow Git-based feature branching (or short-lived topic branches) and submit pull requests for review.
- Keep documentation and configuration files updated with each feature addition.
- Coordinate database schema changes through versioned migration scripts.

## License
Project licensing will be defined once the codebase is established. Until then, contributions remain proprietary to the originating team.
