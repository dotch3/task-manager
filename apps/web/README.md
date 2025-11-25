# Task Manager - Full Stack Application

> **Note:** This project was created for testing and educational purposes, specifically for practicing Playwright test automation.

A complete task management application with RESTful API and modern web interface, designed as a test automation practice project.

## Author

**dotch3**  
Email: dotch3@gmail.com  
GitHub: [@dotch3](https://github.com/dotch3)  
Created: 2025

## Inspiration

This project was created as part of learning from the course:

-   **Course:** Playwright Express
-   **Instructor:** Fernando Papito
-   **Purpose:** Test automation practice with Playwright

## 📋 Project Overview

This is a **monorepo project** containing a full-stack task management application designed specifically for practicing end-to-end (E2E) testing with Playwright. The application implements common CRUD operations and business rules that provide excellent scenarios for test automation.

### Why This Project?

-   ✅ **Learn Playwright** - Practice writing E2E tests for real applications
-   ✅ **Test Real Scenarios** - CRUD operations, validations, error handling
-   ✅ **Full Stack Testing** - Test both API and UI independently or together
-   ✅ **Business Rules** - Practice testing complex validation logic
-   ✅ **Modern Stack** - Learn testing with TypeScript, React, and REST APIs

## 🏗️ Project Structure

```
task-manager/
├── apps/
│   ├── api/                  # Backend REST API (Express + TypeScript + SQLite)
│   │   ├── src/
│   │   ├── docs/             # Swagger/OpenAPI documentation
│   │   ├── package.json
│   │   └── README.md         # API documentation
│   │
│   └── web/                  # Frontend Web UI (React + TypeScript + Vite)
│       ├── src/
│       ├── package.json
│       └── README.md         # Web UI documentation
│
├── tests/                    # Playwright E2E tests (Coming soon)
│   ├── api/                  # API tests
│   ├── ui/                   # UI tests
│   └── e2e/                  # End-to-end tests
│
├── .gitignore
├── LICENSE
└── README.md                 # This file
```

## 🚀 Components

### 1. Backend API (Express + TypeScript + SQLite)

**Location:** `apps/api/`  
**Port:** 3000 (configurable)  
**Documentation:** [API README](apps/api/README.md)

**Features:**

-   RESTful API with full CRUD operations
-   SQLite database with automatic seeding
-   Swagger/OpenAPI documentation
-   TypeScript for type safety
-   Business rule validations
-   Comprehensive error handling

**Tech Stack:**

-   Node.js + Express.js
-   TypeScript
-   SQLite (better-sqlite3)
-   Swagger UI

**Quick Start:**

```bash
cd apps/api
npm install
npm run dev
# API running on http://localhost:3000
# Swagger docs: http://localhost:3000/api-docs
```

### 2. Frontend Web UI (React + TypeScript + Vite)

**Location:** `apps/web/`  
**Port:** 5173 (default)  
**Documentation:** [Web README](apps/web/README.md)

**Features:**

-   Modern React application with TypeScript
-   Real-time task management
-   API health monitoring
-   Responsive design
-   Confirmation dialogs
-   Error handling with user-friendly messages

**Tech Stack:**

-   React 18
-   TypeScript
-   Vite
-   React Query (TanStack Query)
-   Axios

**Quick Start:**

```bash
cd apps/web
npm install
npm run dev
# Web UI running on http://localhost:5173
```

## 🎯 Application Features

### Task Management

-   ✅ **Create tasks** - Add new tasks with unique names
-   ✅ **View tasks** - List all tasks with sorting and filtering
-   ✅ **Edit tasks** - Update task names (with restrictions)
-   ✅ **Complete tasks** - Mark tasks as done
-   ✅ **Delete tasks** - Remove tasks permanently
-   ✅ **Reset database** - Restore to default state for testing

### Business Rules (Perfect for Testing!)

1. **Unique Task Names**

    - Task names must be unique (case-insensitive)
    - Validation on both create and update operations
    - Error message: "A task with this name already exists"

2. **Edit Restrictions**

    - Cannot edit task names that are marked as DONE
    - Error message: "Cannot edit a task that is marked as DONE"

3. **Name Validation**

    - Task names are required
    - Maximum length: 250 characters
    - Trimmed whitespace automatically

4. **Automatic Timestamps**
    - `created_date` - Set when task is created
    - `updated_time` - Updated when task is modified

### Default Seeded Tasks

The application seeds 3 default tasks on first run:

1. "to make a good coffee" - Pending
2. "to send the invite for my b-day's party to the guys" - Pending
3. "To pay the credit card invoice" - Completed

## 🧪 Perfect for Playwright Testing

This project is specifically designed for practicing Playwright test automation:

### API Testing Scenarios

-   ✅ Test all CRUD endpoints
-   ✅ Validate request/response schemas
-   ✅ Test error handling (400, 404, 409, 422)
-   ✅ Test business rule validations
-   ✅ Test database reset functionality
-   ✅ Performance testing

### UI Testing Scenarios

-   ✅ Test user interactions (click, type, submit)
-   ✅ Test form validations
-   ✅ Test confirmation dialogs
-   ✅ Test error messages display
-   ✅ Test task list sorting
-   ✅ Test responsive design
-   ✅ Test keyboard shortcuts
-   ✅ Visual regression testing

### End-to-End Testing Scenarios

-   ✅ Complete user workflows
-   ✅ API and UI integration
-   ✅ Multi-step processes
-   ✅ State management across pages
-   ✅ Error recovery flows

## 📦 Installation

### Prerequisites

-   **Node.js** 18 or higher
-   **npm** or **yarn**
-   **Git**

### Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### Install All Dependencies

#### Option 1: Install each app separately

```bash
# Install API dependencies
cd apps/api
npm install

# Install Web dependencies
cd ../web
npm install
```

#### Option 2: Using npm workspaces (if configured)

```bash
npm install
```

## 🏃 Running the Application

### Step 1: Start the API

```bash
cd apps/api
npm run dev
```

**Expected Output:**

```
🚀 Server is running!
📍 API: http://localhost:3000/api
📚 Swagger Docs: http://localhost:3000/api-docs
❤️  Health Check: http://localhost:3000/health
```

### Step 2: Start the Web UI (in a new terminal)

```bash
cd apps/web
npm run dev
```

**Expected Output:**

```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:5173/
```

### Step 3: Open your browser

Navigate to: **http://localhost:5173**

You should see:

-   ✅ "API Connected" badge in the header
-   ✅ Statistics showing 3 tasks (2 pending, 1 completed)
-   ✅ The 3 default seeded tasks

## ⚙️ Configuration

### API Configuration

Create `apps/api/.env`:

```bash
PORT=3000
NODE_ENV=development
```

### Web UI Configuration

Create `apps/web/.env`:

```bash
VITE_API_URL=http://localhost:3000/api
```

## 🧪 Testing with Playwright (Coming Soon)

This project will include comprehensive Playwright tests:

### Planned Test Structure

```
tests/
├── api/
│   ├── tasks.spec.ts         # Task CRUD tests
│   ├── validations.spec.ts   # Business rule tests
│   └── errors.spec.ts        # Error handling tests
│
├── ui/
│   ├── task-list.spec.ts     # Task list UI tests
│   ├── task-form.spec.ts     # Create/edit form tests
│   ├── dialogs.spec.ts       # Dialog tests
│   └── responsive.spec.ts    # Responsive design tests
│
└── e2e/
    ├── user-workflows.spec.ts # Complete user flows
    └── integration.spec.ts    # API + UI integration
```

### Running Playwright Tests (Future)

```bash
# Install Playwright
npm install -D @playwright/test

# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific test
npx playwright test tests/api/tasks.spec.ts
```

## 📊 API Endpoints

| Method   | Endpoint                  | Description               |
| -------- | ------------------------- | ------------------------- |
| `GET`    | `/health`                 | API health check          |
| `GET`    | `/api/tasks`              | Get all tasks             |
| `GET`    | `/api/tasks/:id`          | Get task by ID            |
| `POST`   | `/api/tasks`              | Create new task           |
| `PUT`    | `/api/tasks/:id`          | Update task name          |
| `PATCH`  | `/api/tasks/:id/complete` | Mark task as complete     |
| `DELETE` | `/api/tasks/:id`          | Delete task               |
| `POST`   | `/api/tasks/reset`        | Reset database to default |

**Full API Documentation:** http://localhost:3000/api-docs

## 🛠️ Technology Stack

### Backend

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Language:** TypeScript
-   **Database:** SQLite (better-sqlite3)
-   **Docs:** Swagger/OpenAPI
-   **Validation:** Custom middleware

### Frontend

-   **Framework:** React 18
-   **Language:** TypeScript
-   **Build Tool:** Vite
-   **HTTP Client:** Axios
-   **State Management:** React Query (TanStack Query)
-   **Icons:** Lucide React
-   **Styling:** Custom CSS with CSS Variables

### Testing (Planned)

-   **E2E Framework:** Playwright
-   **API Testing:** Playwright API Testing
-   **Assertions:** Playwright Assertions
-   **Reporting:** Playwright HTML Reporter

## 📚 Documentation

-   **Main README:** You are here!
-   **API Documentation:** [apps/api/README.md](apps/api/README.md)
-   **Web UI Documentation:** [apps/web/README.md](apps/web/README.md)
-   **API Swagger:** http://localhost:3000/api-docs (when running)

## 🎓 Learning Objectives

By working with this project, you will practice:

1. **API Testing**

    - HTTP methods (GET, POST, PUT, PATCH, DELETE)
    - Status codes (200, 201, 204, 400, 404, 409, 422, 500)
    - Request/response validation
    - Error handling

2. **UI Testing**

    - Element interactions (click, type, select)
    - Form submissions
    - Dialog handling
    - Assertions and expectations
    - Waiting strategies

3. **Test Automation Best Practices**

    - Page Object Model (POM)
    - Test data management
    - Test isolation
    - Fixtures and setup/teardown
    - Parallel execution

4. **Advanced Scenarios**
    - API mocking and stubbing
    - Visual regression testing
    - Performance testing
    - Accessibility testing
    - Cross-browser testing

## 🐛 Troubleshooting

### API won't start

-   Check if port 3000 is available
-   Verify Node.js version (18+)
-   Delete `node_modules` and reinstall
-   Check for syntax errors in code

### Web UI shows "API Disconnected"

-   Ensure API is running on port 3000
-   Check `.env` file in `apps/web`
-   Verify CORS is enabled in API
-   Check browser console for errors

### Database issues

-   Delete `apps/api/tasks.db` and restart API
-   Use reset endpoint: `POST /api/tasks/reset`
-   Check file permissions

## 🤝 Contributing

This is an educational project. Feel free to:

-   Fork the repository
-   Create your own test scenarios
-   Add new features for testing practice
-   Share your Playwright test implementations

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

Copyright (c) 2025 dotch3 <dotch3@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

## 🙏 Acknowledgments

-   **Fernando Papito** - For the excellent "Playwright Express" course that inspired this project
-   **Playwright Team** - For the amazing test automation framework
-   **React Team** - For the powerful UI framework
-   **Express Team** - For the minimal and flexible Node.js framework

## 📧 Contact

**Author:** dotch3  
**Email:** dotch3@gmail.com  
**Purpose:** Educational and test automation practice

## ⚠️ Disclaimer

This software is provided for testing and educational purposes only. It is designed as a practice project for learning Playwright test automation. Use at your own risk.

---

**Created by dotch3** | [dotch3@gmail.com](mailto:dotch3@gmail.com)  
_Inspired by Playwright Express course by Fernando Papito_

---

## 🚀 Quick Start Summary

```bash
# 1. Clone the repository
git clone https://github.com/dotch3/task-manager
cd task-manager

# 2. Start the API
cd apps/api
npm install
npm run dev

# 3. Start the Web UI (new terminal)
cd apps/web
npm install
npm run dev

# 4. Open browser
# http://localhost:5173

# 5. Start testing with Playwright! (coming soon)
```

**Happy Testing! 🎉**
