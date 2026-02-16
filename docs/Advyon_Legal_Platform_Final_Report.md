# ADVYON LEGAL PLATFORM
## Final Project Report
### Software Engineering Laboratory

---

**Course:** Software Engineering Laboratory  
**Project Title:** Advyon - AI-Powered Legal Case Management Platform  
**Submission Date:** February 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Introduction](#2-introduction)
3. [Problem Statement](#3-problem-statement)
4. [Proposed Solution](#4-proposed-solution)
5. [System Features](#5-system-features)
6. [Technology Stack](#6-technology-stack)
7. [System Architecture](#7-system-architecture)
8. [Database Design](#8-database-design)
9. [User Interface Screenshots](#9-user-interface-screenshots)
10. [Security Considerations](#10-security-considerations)
11. [Installation and Deployment](#11-installation-and-deployment)
12. [Future Enhancements](#12-future-enhancements)
13. [Conclusion](#13-conclusion)

---

## 1. Executive Summary

Advyon Legal Platform is a comprehensive, AI-powered legal case management system designed to modernize how legal professionals manage their practice. The platform integrates artificial intelligence capabilities for document analysis, provides real-time communication features, and offers an intuitive interface for managing legal cases, clients, documents, and schedules.

Built using modern web technologies including React 19, Node.js, Express, and MongoDB, the platform addresses the growing need for digital transformation in the legal industry. Key innovations include AI-powered document categorization and summarization, a collaborative community hub for legal professionals, and a comprehensive legal database featuring Bangladeshi laws, acts, and sections.

The platform supports multiple user roles including Lawyers, Clients, Judges, and Administrators, each with tailored interfaces and capabilities designed to enhance productivity and streamline legal workflows.

---

## 2. Introduction

### 2.1 Background

The legal industry has traditionally relied on paper-based documentation, manual case tracking, and time-consuming administrative processes. As the volume of legal documentation continues to grow exponentially, legal professionals face increasing challenges in efficiently managing their caseloads, tracking deadlines, and extracting relevant information from vast document repositories.

### 2.2 Motivation

The development of Advyon Legal Platform was motivated by several key observations:

- Legal professionals spend significant time on administrative tasks that could be automated
- Document review and analysis is a time-intensive process prone to human oversight
- Effective collaboration between legal team members often requires physical presence
- Traditional legal practice management tools lack integration with modern AI capabilities
- Access to comprehensive legal databases remains fragmented and expensive

### 2.3 Objectives

The primary objectives of this project are:

1. To design and implement a web-based legal case management system that streamlines legal practice operations
2. To integrate AI-powered document analysis for automatic categorization, summarization, and entity extraction
3. To provide real-time communication capabilities between lawyers and clients
4. To create a collaborative community platform for legal knowledge sharing
5. To offer a comprehensive searchable database of Bangladeshi laws and legal precedents
6. To implement role-based access control ensuring data security and privacy

---

## 3. Problem Statement

Legal practitioners face numerous challenges in their daily operations:

### 3.1 Document Management Complexity

Legal cases generate extensive documentation including contracts, court filings, evidence, and correspondence. Managing, organizing, and retrieving these documents efficiently is a significant challenge. Traditional filing systems, whether physical or basic digital storage, lack intelligent categorization and search capabilities.

### 3.2 Time-Critical Deadline Management

Missing court dates, filing deadlines, or statute of limitations can result in case dismissals, malpractice claims, or adverse judgments. Legal professionals need robust systems for tracking and alerting them to upcoming deadlines across multiple cases.

### 3.3 Client Communication Gaps

Clients often feel disconnected from their legal proceedings due to lack of regular updates. Traditional communication methods create delays and can result in miscommunication or lost messages.

### 3.4 Research Inefficiency

Legal research requires accessing vast databases of laws, precedents, and regulations. This process is time-consuming and requires specialized skills to navigate effectively.

### 3.5 Collaboration Barriers

Legal teams often work in silos, with limited mechanisms for sharing insights, strategies, or resources across the professional community.

---

## 4. Proposed Solution

Advyon Legal Platform addresses these challenges through an integrated, AI-enhanced web application that provides:

### 4.1 Intelligent Document Management

An AI-powered document system that automatically analyzes uploaded documents, extracting key information, categorizing content, and generating concise summaries. This reduces manual review time and ensures important details are not overlooked.

### 4.2 Comprehensive Case Tracking

A centralized case management system with progress tracking, milestone management, and integrated deadline alerts. Cases are organized with customizable folder structures and visual progress indicators.

### 4.3 Real-Time Communication

A built-in messaging system enabling secure, real-time communication between lawyers and clients. All communications are logged and associated with relevant cases for easy reference.

### 4.4 Legal Database Integration

A searchable database of Bangladeshi laws, acts, and sections allowing legal professionals to quickly find relevant legal provisions and precedents.

### 4.5 Community Knowledge Hub

A collaborative platform where legal professionals can share insights, ask questions, and discuss complex legal issues with peers across the profession.

### 4.6 AI Assistant

An intelligent AI assistant that provides contextual suggestions, answers legal queries, and assists with document-related tasks.

---

## 5. System Features

### 5.1 User Authentication and Management

The platform implements secure user authentication through Clerk, a modern authentication service providing:

- Email and password-based authentication
- Social login integration (Google OAuth)
- Secure session management
- User profile management with customizable preferences
- Role-based access control (Super Admin, Admin, Lawyer, Client, Judge)

### 5.2 Dashboard and Analytics

The dashboard serves as the central hub for all user activities, providing:

- Overview of active cases with current status
- Upcoming hearings and important deadlines
- Pending document reviews requiring attention
- Client messages awaiting response
- Quick action buttons for common tasks
- AI-generated insights and recommendations
- Activity feed showing recent actions
- Daily summary with critical deadline alerts

### 5.3 Case Management System

The case management module provides comprehensive tools for legal case handling:

- **Case Creation**: Structured forms for creating new cases with classification, urgency levels, and associated documentation
- **Case Workspace**: Dedicated workspace for each case with file organization, document management, and case notes
- **Progress Tracking**: Visual progress indicators and milestone tracking throughout the case lifecycle
- **Status Management**: Workflow states including Open, In Progress, Pending Review, Closed, and Archived
- **Folder Organization**: Hierarchical folder structures for organizing case documents including Correspondence, Evidence, Court Filings, and Discovery categories
- **Urgency Classification**: Priority levels (Low, Medium, High) with associated visual indicators
- **Practice Area Categories**: Classification by legal specialty including Criminal Defense, Family Law, Corporate, Immigration, and Civil Litigation

### 5.4 AI-Powered Document Analysis

The document analysis system leverages advanced AI capabilities:

- **Automatic Categorization**: Documents are classified into categories such as Legal Pleading, Contract, Evidence, Correspondence, Court Order, and Financial Record
- **Intelligent Summarization**: AI generates concise summaries highlighting key points and relevant information
- **Entity Extraction**: Automatic identification and extraction of important entities including names, dates, amounts, and legal references
- **Legal Reference Detection**: Identification of referenced laws, statutes, and case precedents within documents
- **Processing Status Tracking**: Visual indicators showing document analysis progress (Pending, In Progress, Analyzed, Complete)

### 5.5 Schedule and Calendar Management

The scheduling system helps legal professionals manage their time effectively:

- **Event Creation**: Create hearings, meetings, deadlines, and appointments with detailed information
- **Calendar Views**: Multiple viewing options including All Events, Today, Upcoming, and Past events
- **Event Types**: Categorization of events including Court Hearings, Client Meetings, Filing Deadlines, and General Appointments
- **Location and Link Integration**: Support for physical locations and virtual meeting links
- **Case Association**: Events can be linked to specific cases for contextual organization

### 5.6 Client Management

The client management module facilitates relationship management:

- **Client Directory**: Centralized listing of all clients with contact information
- **Relationship Tracking**: Association of clients with their respective cases
- **Contact Management**: Storing and organizing client communication details
- **Status Monitoring**: Tracking active engagements and client case status

### 5.7 Community Hub

The community platform enables professional collaboration:

- **Discussion Forums**: Topic-based forums organized by legal categories
- **Question and Answer System**: Structured Q&A format for seeking and providing legal insights
- **Category Organization**: Topics organized by practice area including Family Law, Criminal Defense, Civil Litigation, Property Law, and Corporate matters
- **Contributor Recognition**: Top contributors are highlighted to encourage participation
- **Trending Topics**: Display of popular discussion topics and current legal issues
- **Voting System**: Upvoting and downvoting for quality content curation
- **AI-Powered Summaries**: Auto-generated thread summaries for quick understanding

### 5.8 Legal Database

The legal database provides comprehensive access to legal resources:

- **Search Functionality**: Full-text search across laws, acts, and sections
- **Filter Options**: Filtering by Act type, Year, and Keywords
- **Section Details**: Detailed view of individual sections with references and interpretations
- **Related Sections**: Cross-referencing to related legal provisions
- **Save and Cite**: Ability to save sections and generate citations

### 5.9 AI Assistant

The intelligent AI assistant provides contextual support:

- **Case Context Awareness**: Responses consider the current case context
- **Legal Query Handling**: Answers to general legal questions and procedural queries
- **Document Suggestions**: Recommendations based on case requirements
- **Chat Interface**: Conversational interaction for natural communication
- **Suggestion Chips**: Quick action buttons for common queries

---

## 6. Technology Stack

### 6.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | User interface library |
| Vite | 6.0.6 | Build tool and development server |
| Tailwind CSS | 4.0.3 | Utility-first CSS framework |
| React Router DOM | 7.1.1 | Client-side routing |
| Zustand | 5.0.3 | State management |
| TanStack Query | 5.64.1 | Server state and caching |
| Clerk React | 5.22.3 | Authentication integration |
| Framer Motion | 11.18.0 | Animation library |
| Socket.io Client | 4.8.1 | Real-time communication |
| Recharts | 2.15.0 | Data visualization |
| React Markdown | 9.0.3 | Markdown rendering |

### 6.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express | 4.21.2 | Web application framework |
| TypeScript | 5.2.2 | Type-safe JavaScript |
| MongoDB | Latest | NoSQL database |
| Mongoose | 8.9.5 | MongoDB object modeling |
| Socket.io | 4.8.1 | WebSocket implementation |
| Clerk SDK | 5.1.5 | Authentication backend |
| Zod | 3.24.1 | Schema validation |
| Cloudinary | 2.5.1 | File storage |

### 6.3 AI and Machine Learning

| Service | Model | Purpose |
|---------|-------|---------|
| OpenRouter | Gemini 2.0 Flash | Document analysis and summarization |
| Groq | LLaMA 3.3 70B | Conversational AI assistant |
| Tesseract.js | 5.1.1 | OCR for image-based documents |

### 6.4 Development and DevOps

| Tool | Purpose |
|------|---------|
| ESLint | Code linting and quality |
| Jest | Testing framework |
| Nodemon | Development server auto-reload |
| ts-node-dev | TypeScript development |
| Git | Version control |
| npm | Package management |

---

## 7. System Architecture

### 7.1 High-Level Architecture

The Advyon Legal Platform follows a modern three-tier architecture pattern consisting of:

1. **Presentation Layer (Frontend)**: React-based single-page application handling user interface and client-side logic
2. **Application Layer (Backend)**: Node.js/Express server implementing business logic, API endpoints, and real-time services
3. **Data Layer**: MongoDB database for persistent storage with Cloudinary for file storage

### 7.2 Frontend Architecture

The frontend follows a feature-driven modular architecture:

- **Pages**: Individual route components representing different views
- **Components**: Reusable UI components categorized by functionality
- **Stores**: Zustand stores for global state management
- **Hooks**: Custom React hooks for shared logic
- **Services**: API communication and external service integration
- **Utils**: Helper functions and utilities

### 7.3 Backend Architecture

The backend implements a modular MVC-style architecture:

- **Modules**: Domain-specific modules (User, Case, Document, AI, Message, etc.)
- **Routes**: API endpoint definitions and routing
- **Controllers**: Request handling and response formatting
- **Services**: Business logic implementation
- **Models**: MongoDB schema definitions
- **Middleware**: Authentication, validation, and error handling
- **Utils**: Shared utilities and helper functions

### 7.4 Communication Flow

1. Client makes HTTP requests to the Express server via REST APIs
2. Real-time features use WebSocket connections through Socket.io
3. Authentication is handled by Clerk, with tokens validated on each request
4. Business logic processes requests and interacts with the database
5. AI services are called for document analysis and chat functionality
6. Responses are formatted and returned to the client

---

## 8. Database Design

### 8.1 Data Model Overview

The platform uses MongoDB with the following primary collections:

**Users Collection**
- User identification and authentication data
- Profile information and preferences
- Role assignments and permissions
- Gamification points and statistics

**Cases Collection**
- Case details and metadata
- Status and progress tracking
- Urgency and priority levels
- Timeline and deadline information
- Folder structure for organization
- Associated users (creator, assigned attorneys, clients)

**Documents Collection**
- File metadata and storage references
- Case associations
- AI analysis results (summary, category, entities)
- Processing status and timestamps
- User references (uploader, owner)

**Messages Collection**
- Conversation threads
- Real-time messaging data
- User relationships and timestamps

**Community Collection**
- Discussion threads and questions
- Categories and tags
- User contributions and votes

**Legal Acts and Sections Collections**
- Bangladeshi law database
- Acts, sections, and provisions
- Cross-references and citations

### 8.2 Database Indexing Strategy

Strategic indexes are implemented for optimal query performance:

- Compound indexes on frequently queried field combinations
- Text indexes for full-text search capabilities
- Unique indexes on identification fields
- TTL indexes for temporary data cleanup

### 8.3 Data Relationships

- One-to-Many: User to Cases, Case to Documents
- Many-to-Many: Cases to Users (through role-based associations)
- Embedded: Folder structures within Cases, Analysis results within Documents

---

## 9. User Interface Screenshots

### 9.1 Dashboard - Overview

The main dashboard provides a comprehensive overview of the user's legal practice, including active cases, upcoming hearings, pending reviews, and client messages.

![Dashboard Overview](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/1.png)

*Figure 9.1: Dashboard showing Overview with AI Insights, Today's Schedule, Client Requests, and Activity Feed*

---

### 9.2 Case Workspace

The workspace view displays active cases with their current status, recent activity updates, and deadline summaries.

![Case Workspace](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/2.png)

*Figure 9.2: Workspace showing active cases with status indicators and activity timeline*

---

### 9.3 New Case Creation

The case initiation form allows users to create new legal matters with AI-powered workspace preview and automated filing suggestions.

![New Case Form](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/3.png)

*Figure 9.3: Initiate New Matter form with classification, urgency selection, and AI Workspace Preview*

---

### 9.4 Document Management

The document hub provides a centralized view of all documents with AI analysis status and categorization.

![Document Management](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/4.png)

*Figure 9.4: My Documents page showing total documents, AI-analyzed count, categories, and processing status*

---

### 9.5 Archived Cases

The archive section maintains records of completed or dormant cases for future reference.

![Archived Cases](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/5.png)

*Figure 9.5: Archived Cases feature (under development)*

---

### 9.6 Case Workspace with AI Assistant

Individual case workspaces feature document organization, file upload capabilities, and an integrated AI assistant for case-specific queries.

![Case Workspace with AI](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/6.png)

*Figure 9.6: Case workspace showing folder structure, document upload area, and Advyon AI assistant panel*

---

### 9.7 Schedule and Calendar

The scheduling module enables management of hearings, meetings, and important deadlines with multiple view options.

![Schedule Calendar](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/7.png)

*Figure 9.7: Schedule & Calendar view with event filters and AI assistant integration*

---

### 9.8 Event Scheduling

The event creation form allows detailed scheduling of hearings, meetings, and deadlines with case linking capabilities.

![Event Scheduling](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/8.png)

*Figure 9.8: Schedule New Event form with event type, date/time, location, and case association options*

---

### 9.9 Client Management

The client management interface provides tools for managing client relationships and case associations.

![Client Management](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/9.png)

*Figure 9.9: My Clients page showing client list with contact details, status, and action options*

---

### 9.10 Analytics Dashboard

The analytics view provides performance insights including case distribution, upcoming deadlines, and practice metrics.

![Analytics Dashboard](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/10.png)

*Figure 9.10: Analytics Dashboard showing active cases, total clients, filings, and case distribution charts*

---

### 9.11 User Profile

The user profile section allows management of personal information, preferences, and security settings.

![User Profile](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/11.png)

*Figure 9.11: User Profile page with general information, preferences, and AI assistant providing platform guidance*

---

### 9.12 Community Hub

The community platform enables legal professionals to connect, share insights, and discuss complex legal matters.

![Community Hub](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/12.png)

*Figure 9.12: Community Hub showing discussions, topic categories, top contributors, and trending topics*

---

### 9.13 Ask a Question

The question submission interface allows users to seek legal insights from the professional community.

![Ask Question](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/13.png)

*Figure 9.13: Ask a Question modal with title, category selection, details, and tag input*

---

### 9.14 Discussion Thread with AI Summary

Individual discussion threads feature community answers and AI-generated summaries for quick comprehension.

![Discussion Thread](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/14.png)

*Figure 9.14: Discussion thread showing question, AI Summary, answers, and voting functionality*

---

### 9.15 Legal Database Search

The legal database provides comprehensive search capabilities across Bangladeshi laws, acts, and legal precedents.

![Legal Database](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/15.png)

*Figure 9.15: Search Acts & Sections interface with search filters and paginated search results*

---

### 9.16 Section Detail View

Detailed section views provide full legal text with cross-references to related sections and citation options.

![Section Detail](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/16.png)

*Figure 9.16: Section detail modal showing full legal text, related sections, and save/cite options*

---

### 9.17 AI Tools

The AI Tools section provides access to advanced AI-powered features for legal analysis and assistance.

![AI Tools](C:/Users/User/.gemini/antigravity/brain/c6221e6b-6238-4f7a-a6e9-d1530ed86df0/17.png)

*Figure 9.17: AI Tools feature (currently under development)*

---

## 10. Security Considerations

### 10.1 Authentication Security

- **Third-Party Authentication Provider**: Clerk handles all authentication flows, eliminating the need to store sensitive credentials
- **JWT Token Validation**: All API requests are validated against Clerk's JWT tokens
- **Session Management**: Secure session handling with automatic token refresh
- **OAuth Integration**: Support for social login with proper scope limitations

### 10.2 Data Protection

- **Input Validation**: All user inputs are validated using Zod schema validation
- **Data Sanitization**: Prevention of injection attacks through proper data handling
- **Encrypted Transmission**: All data transmitted over HTTPS
- **Database Security**: MongoDB security best practices including authentication and access control

### 10.3 Access Control

- **Role-Based Access Control (RBAC)**: Five distinct user roles with specific permissions
- **Route Protection**: Both frontend and backend route guards ensure authorized access
- **Resource Authorization**: Users can only access resources they are authorized to view

### 10.4 API Security

- **Rate Limiting**: Prevention of abuse through request rate limits
- **CORS Configuration**: Proper cross-origin resource sharing settings
- **Security Headers**: Implementation of security headers through Helmet.js
- **Error Handling**: Secure error messages that don't expose system details

### 10.5 File Security

- **Cloud Storage**: Files stored on Cloudinary with secure access controls
- **File Type Validation**: Restriction on uploadable file types
- **Size Limitations**: Maximum file size enforcement to prevent abuse

---

## 11. Installation and Deployment

### 11.1 System Requirements

**Prerequisites:**
- Node.js version 18 or higher
- MongoDB database (local or Atlas cloud)
- npm or yarn package manager
- Clerk account for authentication
- Cloudinary account for file storage
- OpenRouter API key for AI features
- Groq API key for conversational AI

### 11.2 Environment Configuration

The following environment variables must be configured:

**Backend Configuration:**
- Database connection string
- Server port configuration
- Clerk API keys
- Cloudinary credentials (cloud name, API key, API secret)
- OpenRouter API key
- Groq API key
- JWT secrets

**Frontend Configuration:**
- Clerk publishable key
- API base URL
- Socket server URL

### 11.3 Installation Steps

**Step 1: Clone Repository**
- Download the project source code from the version control system

**Step 2: Backend Setup**
- Navigate to the advyon-server directory
- Install dependencies using npm
- Configure environment variables
- Start the development server

**Step 3: Frontend Setup**
- Navigate to the advyon-client directory
- Install dependencies using npm
- Configure environment variables
- Start the development server

**Step 4: Database Setup**
- Ensure MongoDB is running (locally or via Atlas)
- The application will create necessary collections automatically

### 11.4 Production Deployment

For production deployment, the following considerations apply:

- Build the frontend for production optimization
- Configure production environment variables
- Set up reverse proxy (nginx recommended)
- Configure SSL certificates for HTTPS
- Set up database backups and monitoring
- Configure application logging

---

## 12. Future Enhancements

### 12.1 Planned Features

1. **Advanced AI Tools Module**: Expanded AI capabilities including contract drafting, legal research automation, and predictive case outcome analysis

2. **Mobile Application**: Native mobile applications for iOS and Android platforms enabling on-the-go case management

3. **Video Conferencing Integration**: Built-in video calling for virtual client consultations and remote court appearances

4. **Billing and Invoicing**: Integrated time tracking, invoice generation, and payment processing

5. **Advanced Reporting**: Custom report generation with export capabilities for practice analysis

6. **Multi-Language Support**: Interface localization for broader accessibility

7. **Archives Enhancement**: Full implementation of case archiving with search and retrieval capabilities

8. **Integration APIs**: Third-party integrations with court filing systems, calendar applications, and legal research databases

### 12.2 Technical Improvements

1. **Performance Optimization**: Enhanced caching strategies and database query optimization
2. **Testing Coverage**: Comprehensive unit and integration test suites
3. **Microservices Architecture**: Breaking down the monolithic backend into microservices for better scalability
4. **Container Deployment**: Docker containerization for easier deployment and scaling

---

## 13. Conclusion

The Advyon Legal Platform successfully demonstrates a modern approach to legal practice management, integrating artificial intelligence capabilities with traditional case management workflows. The platform addresses key challenges faced by legal professionals including document management complexity, deadline tracking, client communication, and legal research efficiency.

Key achievements of this project include:

1. **Successful AI Integration**: Implementation of document analysis capabilities using advanced language models for categorization, summarization, and entity extraction

2. **Comprehensive Feature Set**: A fully-functional platform covering case management, document handling, scheduling, client management, and community collaboration

3. **Modern Architecture**: Implementation of a scalable, maintainable architecture using industry-standard technologies and best practices

4. **User-Centric Design**: An intuitive interface designed with legal professionals' workflows in mind

5. **Legal Database Integration**: A searchable database of Bangladeshi laws providing valuable legal research capabilities

The platform provides a solid foundation for future enhancements and demonstrates the potential for AI-assisted legal practice management. As artificial intelligence continues to evolve, the Advyon platform is positioned to incorporate increasingly sophisticated capabilities while maintaining its focus on practical utility for legal professionals.

---

**End of Report**

---

*This report was prepared as part of the Software Engineering Laboratory coursework, demonstrating the design, development, and implementation of a full-stack web application with AI integration.*
