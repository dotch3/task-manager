# Task Management API

> **Note:** This API was created for testing and educational purposes only.

A RESTful API for managing tasks built with TypeScript, Express, and SQLite.

## Author

**Dotch3**  
Email: dotch3@gmail.com  
Created: 2025

## Inspiration

This project was created as part of learning from the course:

-   **Course:** Playwright Express
-   **Instructor:** Fernando Papito
-   **Purpose:** Testing and educational exercise

## Table of Contents

-   [Features](#features)
-   [Business Rules](#business-rules)
-   [Technology Stack](#technology-stack)
-   [Installation](#installation)
-   [Running the API](#running-the-api)
-   [API Endpoints](#api-endpoints)
-   [Testing the API](#testing-the-api)
-   [Default Seeded Tasks](#default-seeded-tasks)
-   [Project Structure](#project-structure)
-   [Database](#database)
-   [License](#license)

## Features

-   ✅ Create, read, update, and delete tasks
-   ✅ Mark tasks as complete
-   ✅ SQLite database with automatic seeding
-   ✅ Swagger/OpenAPI documentation
-   ✅ TypeScript for type safety
-   ✅ Duplicate task name prevention (case-insensitive)
-   ✅ Database reset functionality
-   ✅ Automatic timestamps management
-   ✅ CORS enabled for web client integration

## Business Rules

### Task Creation

-   Task names are **required** and cannot be empty
-   Task names cannot exceed **250 characters**
-   Task names must be **unique** (case-insensitive comparison)
-   Tasks are created with `is_done: false` by default

### Task Update

-   Only the task **name** can be updated
-   Cannot update a task that is marked as **DONE** (`is_done: true`)
-   Updated task names must also be unique
-   Timestamps are automatically updated

### Task Completion

-   Tasks can be marked as complete using the `/complete` endpoint
-   Once marked as DONE, the task name cannot be edited
-   Tasks can still be deleted even if marked as DONE

### Task Deletion

-   Tasks can be deleted regardless of their completion status
-   Deletion is permanent

## Technology Stack

-   **Runtime:** Node.js (v18+)
-   **Language:** TypeScript 5.x
-   **Framework:** Express.js 4.x
-   **Database:** SQLite with better-sqlite3
-   **Documentation:** Swagger/OpenAPI 3.0
-   **Dev Tools:** ts-node-dev for hot reload
-   **Additional:** CORS, UUID, YAML parser

## Installation

### Prerequisites

-   Node.js 18 or higher
-   npm or yarn package manager

### Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd apps/api
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Optional: Create environment file**

The API uses environment variables for configuration. Create a `.env` file in the root of the API directory:

```bash
cp .env.example .env
```

### Environment Variables

| Variable   | Description                               | Default       | Required |
| ---------- | ----------------------------------------- | ------------- | -------- |
| `PORT`     | Port number where the server will listen  | `3000`        | No       |
| `NODE_ENV` | Environment mode (development/production) | `development` | No       |
| `HOST`     | Host address                              | `localhost`   | No       |

### Example .env file

```bash
PORT=3000
NODE_ENV=development
HOST=localhost
```

### Changing the Port

To run the API on a different port, update the `PORT` value in your `.env` file:

```bash
PORT=8080
NODE_ENV=development
HOST=localhost
```

Then restart the server:

```bash
npm run dev
```

The API will now be available at `http://localhost:8080`

**Note:** Throughout this README, examples use port `3000` for consistency, but the actual port depends on your `.env` configuration.

## Running the API

### Development Mode (with hot reload)

```bash
npm run dev
# or
yarn dev
```

### Production Mode

```bash
# Build the TypeScript code
npm run build
# or
yarn build

# Start the server
npm start
# or
yarn start
```

### Expected Output

```
🔧 Initializing database...
✅ Database initialized successfully
🌱 Seeding initial data...
✅ Database seeded successfully

🚀 Server is running!
📍 API: http://localhost:3000/api
📚 Swagger Docs: http://localhost:3000/api-docs
❤️  Health Check: http://localhost:3000/health

📋 Available endpoints:
   GET    http://localhost:3000/api/tasks
   GET    http://localhost:3000/api/tasks/:id
   POST   http://localhost:3000/api/tasks
   PUT    http://localhost:3000/api/tasks/:id
   PATCH  http://localhost:3000/api/tasks/:id/complete
   DELETE http://localhost:3000/api/tasks/:id

🔧 Admin endpoints:
   POST   http://localhost:3000/api/tasks/reset

👤 Author: Dotch3 (dotch3@gmail.com)
⚠️  Note: Created for testing purposes
```

**Note:** The port shown (3000) is an example. Your actual port will match the value in your `.env` file.

## API Endpoints

### Health Check

```http
GET /health
```

Returns API status and information.

### Task Management

#### Get All Tasks

```http
GET /api/tasks
```

**Response:** Array of all tasks

#### Get Task by ID

```http
GET /api/tasks/{id}
```

**Parameters:**

-   `id` (path) - Task UUID

**Response:** Single task object

#### Create Task

```http
POST /api/tasks
Content-Type: application/json

{
  "name": "Buy groceries"
}
```

**Validations:**

-   Name is required
-   Name max 250 characters
-   Name must be unique

**Response:**

```json
{
    "message": "Task created successfully",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Buy groceries",
    "task": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Buy groceries",
        "is_done": false,
        "created_date": "2024-01-15T10:30:00.000Z",
        "updated_time": "2024-01-15T10:30:00.000Z"
    }
}
```

#### Update Task Name

```http
PUT /api/tasks/{id}
Content-Type: application/json

{
  "name": "Buy groceries and cook dinner"
}
```

**Constraints:**

-   Cannot update task marked as DONE
-   New name must be unique

**Response:**

```json
{
  "message": "Task updated successfully",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Buy groceries and cook dinner",
  "task": { ... }
}
```

#### Mark Task as Complete

```http
PATCH /api/tasks/{id}/complete
```

**Response:**

```json
{
    "message": "Task marked as DONE",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Buy groceries",
    "status": "DONE",
    "task": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Buy groceries",
        "is_done": true,
        "created_date": "2024-01-15T10:30:00.000Z",
        "updated_time": "2024-01-15T12:00:00.000Z"
    }
}
```

#### Delete Task

```http
DELETE /api/tasks/{id}
```

**Response:**

```json
{
    "message": "Task deleted successfully",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Buy groceries"
}
```

### Admin Endpoints

#### Reset Database

```http
POST /api/tasks/reset
```

Deletes all tasks and restores the 3 default tasks.

**Response:**

```json
{
    "message": "Database has been reset to default state",
    "tasksCount": 3
}
```

## Testing the API

### Using Swagger UI

1. Start the API: `npm run dev`
2. Open browser: http://localhost:3000/api-docs
3. Try out endpoints interactively

### Using cURL

**Get all tasks:**

```bash
curl http://localhost:3000/api/tasks
```

**Create a task:**

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"name": "Buy groceries"}'
```

**Update a task:**

```bash
curl -X PUT http://localhost:3000/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Buy groceries and cook"}'
```

**Complete a task:**

```bash
curl -X PATCH http://localhost:3000/api/tasks/{id}/complete
```

**Delete a task:**

```bash
curl -X DELETE http://localhost:3000/api/tasks/{id}
```

**Reset database:**

```bash
curl -X POST http://localhost:3000/api/tasks/reset
```

### Using Postman or Insomnia

Import the Swagger/OpenAPI specification from:
http://localhost:3000/api-docs/swagger.json

## Default Seeded Tasks

The database is automatically seeded with 3 tasks on first run (when database is empty):

1. **"to make a good coffee"** - `is_done: false`
2. **"to send the invite for my b-day's party to the guys"** - `is_done: false`
3. **"To pay the credit card invoice"** - `is_done: true`

**Note:** Seeding only happens when the tasks table is empty. To re-seed, use the `/api/tasks/reset` endpoint or delete the `tasks.db` file and restart the server.

## Project Structure

```
apps/api/
├── src/
│   ├── config/
│   │   └── database.config.ts       # Database and server configuration
│   ├── controllers/
│   │   └── task.controller.ts       # Request handlers
│   ├── database/
│   │   └── db.ts                    # Database initialization
│   ├── middlewares/
│   │   └── error.middleware.ts      # Error handling
│   ├── routes/
│   │   ├── index.ts                 # Routes aggregator
│   │   └── task.routes.ts           # Task routes
│   ├── services/
│   │   └── task.service.ts          # Business logic
│   ├── types/
│   │   ├── task.types.ts            # Task type definitions
│   │   └── errors.types.ts          # Custom error types
│   └── index.ts                     # Application entry point
├── docs/
│   └── swagger.yaml                 # OpenAPI documentation
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── LICENSE                          # MIT License
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tasks.db                         # SQLite database (auto-generated)
└── README.md                        # This file
```

## Database

### Location

The SQLite database file is created at: `apps/api/tasks.db`

### Schema

```sql
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,              -- UUID
  name TEXT NOT NULL,               -- Task name (max 250 chars, unique)
  is_done BOOLEAN NOT NULL DEFAULT 0, -- Completion status
  created_date TEXT NOT NULL,       -- ISO 8601 timestamp
  updated_time TEXT NOT NULL        -- ISO 8601 timestamp
);
```

### Reset Database

To start fresh, you can:

1. Use the reset endpoint: `POST /api/tasks/reset`
2. Or manually delete the file: `rm tasks.db` and restart the server

## HTTP Status Codes

-   `200` - Success
-   `201` - Created
-   `204` - No Content (successful deletion)
-   `400` - Bad Request (validation error)
-   `404` - Not Found
-   `409` - Conflict (duplicate name)
-   `422` - Unprocessable Entity (cannot edit completed task)
-   `500` - Internal Server Error

## Error Responses

All errors follow this format:

```json
{
    "error": "Error message description"
}
```

### Common Errors

**Task not found:**

```json
{
    "error": "Task not found"
}
```

**Duplicate task name:**

```json
{
    "error": "A task with this name already exists"
}
```

**Cannot edit completed task:**

```json
{
    "error": "Cannot edit a task that is marked as DONE"
}
```

**Validation error:**

```json
{
    "error": "Name is required"
}
```

## License

MIT License - see [LICENSE](LICENSE) file for details

Copyright (c) 2025 Dotch3 <dotch3@gmail.com>

## Acknowledgments

-   **Fernando Papito** - For the excellent "Playwright Express" course that inspired this project
-   Created as a learning exercise for test automation and API development

## Contributing

This is a personal learning project. Feel free to fork and modify for your own learning purposes.

## Support

For questions or issues, contact: dotch3@gmail.com

## Disclaimer

This software is provided for testing and educational purposes only. Use at your own risk.

---

**Created by Dotch3** | [dotch3@gmail.com](mailto:dotch3@gmail.com)  
_Inspired by Playwright Express course by Fernando Papito_
