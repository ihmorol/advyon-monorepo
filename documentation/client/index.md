# Client Overview

The Advyon Client is a modern Single Page Application (SPA) built with **React 18** and **Vite**. It focuses on performance, accessibility, and a premium user experience.

## Technology Stack

| Category | Technology | Usage |
|---|---|---|
| **Core** | [React 18](https://react.dev/) | UI Library |
| **Build Tool** | [Vite](https://vitejs.dev/) | Fast development and bundling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| **UI Library** | [Shadcn UI](https://ui.shadcn.com/) | Reusable components (Radix Primitives) |
| **State** | [Zustand](https://docs.pmnd.rs/zustand) | Global state management |
| **Routing** | [React Router v6](https://reactrouter.com/) | Client-side routing |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | Server state management |
| **Forms** | [React Hook Form](https://react-hook-form.com/) | Form validation and handling |

## Architecture pattern

The application follows a **Feature-based architecture**. Code is co-located by business domain rather than technical type.

```
src/
  features/
    auth/         # Authentication feature
      components/ # Auth-specific components
      routes/     # Auth routes
    workspace/    # Case management feature
```
