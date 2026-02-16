# Server Setup Guide

This guide covers the setup and installation of the Advyon Server (Backend).

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **MongoDB**: Local instance or Atlas connection string

## Environment Configuration

Create a `.env` file in the `advyon-server` root directory.

```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | MongoDB connection string | `mongodb://localhost:27017/advyon` |
| `BCRYPT_SALT_ROUNDS` | Salt rounds for hashing | `12` |
| `DEFAULT_PASS` | Default user password | `default123` |
| `SUPER_ADMIN_PASSWORD` | Seeded admin password | `admin123` |

### Security & Auth

| Variable | Description |
|----------|-------------|
| `JWT_ACCESS_SECRET` | Secret for access tokens |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens |
| `JWT_ACCESS_EXPIRES_IN` | Access token duration (e.g., `1d`) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token duration (e.g., `365d`) |
| `RESET_PASS_UI_LINK` | Frontend password reset URL |
| `CLERK_SECRET_KEY` | Clerk Auth Secret |
| `CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key |

### External Services

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Name |
| `CLOUDINARY_API_KEY` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Cloudinary Secret |
| `OPENROUTER_API_KEY` | OpenRouter API Key (AI) |
| `GROQ_API_KEY` | Groq API Key (AI) |
| `GEMINI_API_KEY` | Google Gemini API Key |

## Installation

1.  Navigate to the server directory:
    ```bash
    cd advyon-server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Server

### Development Mode
Starts the server with hot-reloading using `ts-node-dev`.

```bash
npm run dev
```

### Production Build
Builds the TypeScript code to JavaScript.

```bash
npm run build
```

### Start Production Server
Runs the built code from `dist/`.

```bash
npm run prod
```

## Project Structure

```
src/
├── app/
│   ├── config/       # Environment configuration
│   ├── modules/      # Feature modules (Controller, Service, Route, Model)
│   ├── middlewares/  # Express middlewares (Auth, Error handling)
│   └── utils/        # Utility functions
├── server.ts         # Entry point
└── app.ts            # Express app setup
```
