# System Architecture

Advyon Legal Platform follows a modern **Client-Server** architecture, leveraging cloud-native services for authentication, storage, and AI processing.

## High-Level Overview

The system is composed of a **React Frontend** (SPA) and an **Express Backend** (REST API), connected to **MongoDB**.

```mermaid
graph TD
    User[Web User] -->|HTTPS| Client[Advyon Client (React)]
    
    subgraph "Advyon Platform"
        Client -->|REST API| Server[Advyon Server (Express)]
        Server -->|Read/Write| DB[(MongoDB Atlas)]
    end
    
    subgraph "External Services"
        Client -->|Auth| Clerk[Clerk Auth]
        Server -->|Verify Token| Clerk
        Server -->|Store Files| Cloudinary[Cloudinary]
        Server -->|GenAI| AI[Google Gemini / Groq / OpenRouter]
    end
```

## Technology Stack

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Zod
- **Documentation**: Swagger / OpenAPI
- **AI Integration**: LangChain / Direct API SDKs

### Frontend (Client)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn UI (Radix Primitives)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Markdown**: React Markdown

## Data Flow

1.  **Request**: Client sends a request with a JWT (Bearer Token).
2.  **Auth Middleware**: Server validates the token with Clerk.
3.  **Validation**: Zod middleware validates the request body/params.
4.  **Controller**: Handles the request and calls the Service layer.
5.  **Service**: Executes business logic, talks to DB or External APIs.
6.  **Response**: Server sends a standardized JSON response.

## Directory Structure Pattern

Both Client and Server follow a **Modular/Feature-First** directory structure to ensure scalability.

### Server Module Pattern
Each feature (e.g., `User`, `Case`) is self-contained:
- `*.interface.ts`: TypeScript definitions
- `*.model.ts`: Mongoose schema
- `*.validation.ts`: Zod schemas
- `*.controller.ts`: Request handling
- `*.service.ts`: Business logic
- `*.route.ts`: API route definitions
