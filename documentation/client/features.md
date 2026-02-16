# Features

The application is structured around these core functional areas.

## Authentication (`src/features/auth`)
Handles the user session flow using **Clerk**.
- **Login/Signup**: Redirects to Clerk hosted pages or handled via embedded components.
- **Onboarding**: Post-signup flow to determine user role (Lawyer/Client).

## Workspace (`src/features/workspace`)
The primary interface for Lawyers.
- **Case List**: Kanban or List view of active cases.
- **Case Detail**: Tabbed interface showing Documents, Calendar, and Messages for a specific case.

## Community (`src/features/community`)
Q&A Forum for legal professionals and clients.
- **Feed**: List of trending threads.
- **Thread View**: Detailed discussion with nested replies and voting mechanisms.

## Dashboard (`src/features/dashboard`)
The landing page after login.
- **Widgets**: Reusable dashboard cards (Recent Activity, Upcoming Deadlines).
- **Layout**: Grid-based layout that adapts to user role.
