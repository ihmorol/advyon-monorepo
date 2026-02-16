# Client Setup Guide

This guide covers the setup and installation of the Advyon Client (Frontend).

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

## Environment Configuration

Create a `.env` file in the `advyon-client` root directory.

```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Default / Example |
|----------|-------------|-------------------|
| `VITE_API_URL` | Backyard API URL | `http://localhost:5000/api/v1` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk Auth Key | `pk_test_...` |

## Installation

1.  Navigate to the client directory:
    ```bash
    cd advyon-client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Development

Start the Vite development server with hot module replacement (HMR).

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Production

### Build
Create an optimized production build in the `dist/` directory.

```bash
npm run build
```

### Preview
Locally preview the production build.

```bash
npm run preview
```

## Project Structure

The client uses a feature-based architecture.

```
src/
├── app/            # App-wide settings and providers
├── assets/         # Static assets (images, fonts)
├── components/     # Shared UI components (Radix UI, Shadcn)
│   ├── ui/         # Base UI elements (Button, Input)
│   └── shared/     # Reusable logic components
├── features/       # Feature-specific logic (slices, api hooks)
├── layouts/        # Page layouts (Dashboard, Auth)
├── lib/            # Utilities and configurations (axios, cn)
├── pages/          # Route components
├── services/       # API service definitions
└── store/          # Zustand/Redux state stores
```
