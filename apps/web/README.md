# Task Manager - Web UI

> **Note:** This web application was created for testing and educational purposes only.

A modern, responsive React-based web interface for the Task Management API. Built with TypeScript, React, and Vite.

## Author

**Dotch3**  
Email: dotch3@gmail.com  
Created: 2025

## Inspiration

This project was created as part of learning, inspired on the course:

-   **Course:** Playwright Express
-   **Instructor:** Fernando Papito
-   **Purpose:** Testing and educational exercise

## Table of Contents

-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running the Application](#running-the-application)
-   [API Integration](#api-integration)
-   [Project Structure](#project-structure)
-   [Features & API Mapping](#features--api-mapping)
-   [User Interface](#user-interface)
-   [Development](#development)
-   [Building for Production](#building-for-production)
-   [Troubleshooting](#troubleshooting)
-   [License](#license)

## Features

-   ✅ **Real-time task management** - Create, read, update, and delete tasks
-   ✅ **Task completion tracking** - Mark tasks as complete with visual feedback
-   ✅ **Statistics dashboard** - View total, completed, and pending tasks
-   ✅ **API health monitoring** - Real-time connection status indicator
-   ✅ **Duplicate prevention** - Validates unique task names (case-insensitive)
-   ✅ **Edit restrictions** - Cannot edit completed tasks (business rule)
-   ✅ **Confirmation dialogs** - User-friendly confirmations for destructive actions
-   ✅ **Error handling** - Clear error messages with dialog notifications
-   ✅ **Responsive design** - Works on desktop, tablet, and mobile devices
-   ✅ **Modern UI/UX** - Clean, gradient background with card-based layout
-   ✅ **Keyboard shortcuts** - Enter to save, Escape to cancel
-   ✅ **Tooltips** - Helpful hints on hover for all interactive elements
-   ✅ **Auto-refresh** - Automatic data synchronization with API
-   ✅ **Database reset** - Quick reset to default 3 tasks for testing

## Technology Stack

-   **Framework:** React 18
-   **Language:** TypeScript 5.x
-   **Build Tool:** Vite 5.x
-   **HTTP Client:** Axios
-   **State Management:** @tanstack/react-query (React Query v5)
-   **Icons:** Lucide React
-   **Styling:** Custom CSS with CSS Variables
-   **Development:** Hot Module Replacement (HMR)

## Prerequisites

Before running the web UI, ensure you have:

-   **Node.js** 18 or higher
-   **npm** or **yarn** package manager
-   **Task Management API** running on `http://localhost:3000` (see `apps/api` folder)

## Installation

### Step 1: Navigate to the web directory

```bash
cd apps/web
```

### Step 2: Install dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Create environment file

```bash
cp .env.example .env
```

## Configuration

### Environment Variables

Create a `.env` file in the `apps/web` directory:

```bash
VITE_API_URL=http://localhost:3000/api
```

| Variable       | Description                         | Default                     | Required |
| -------------- | ----------------------------------- | --------------------------- | -------- |
| `VITE_API_URL` | Base URL of the Task Management API | `http://localhost:3000/api` | Yes      |

**Important Notes:**

-   Environment variables in Vite must be prefixed with `VITE_`
-   Changes to `.env` require a server restart
-   Never commit the `.env` file (it's in `.gitignore`)

### Connecting to Different API Ports

If your API runs on a different port, update the `.env` file:

```bash
# API running on port 8080
VITE_API_URL=http://localhost:8080/api

# API running on a different host
VITE_API_URL=http://192.168.1.100:3000/api
```

## Running the Application

### Development Mode (Recommended)

Runs the app with hot module replacement (HMR):

```bash
npm run dev
# or
yarn dev
```

The application will start on **http://localhost:5173** by default.

**Expected Output:**

```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

### Preview Production Build

Build and preview the production version locally:

```bash
npm run build
npm run preview
# or
yarn build
yarn preview
```

## API Integration

The web UI communicates with the Task Management API through the following endpoints:

### API Service Layer

Located in: `src/services/api.service.ts`

All API calls are centralized in the `taskService` object:

```typescript
import { taskService } from "./services/api.service"

// Example usage
const tasks = await taskService.getAllTasks()
const newTask = await taskService.createTask({ name: "Buy groceries" })
```

### Health Check

The UI continuously monitors API connectivity:

-   Polls `/health` endpoint every 10 seconds
-   Displays connection status in the header
-   Shows API port number when connected

## Project Structure

```
apps/web/
├── src/
│   ├── components/              # React components
│   │   ├── ApiStatus.tsx        # API connection indicator
│   │   ├── Dialog.tsx           # Reusable dialog/modal component
│   │   ├── StatsCards.tsx       # Statistics cards (total/completed/pending)
│   │   ├── TaskForm.tsx         # Create task form
│   │   ├── TaskItem.tsx         # Individual task component
│   │   ├── TaskList.tsx         # List of tasks
│   │   └── TaskManager.tsx      # Main container component
│   │
│   ├── services/                # API integration
│   │   └── api.service.ts       # Axios HTTP client & API methods
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── task.types.ts        # Task-related types
│   │   └── error.types.ts       # Error handling types
│   │
│   ├── App.tsx                  # Root application component
│   ├── App.css                  # Application styles
│   ├── index.css                # Global styles & CSS variables
│   └── main.tsx                 # Application entry point
│
├── public/                      # Static assets
├── index.html                   # HTML template
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

## Features & API Mapping

### 1. View All Tasks

**UI Component:** `TaskList.tsx`  
**API Endpoint:** `GET /api/tasks`  
**Description:** Displays all tasks sorted by creation date (newest first)

### 2. Create Task

**UI Component:** `TaskForm.tsx`  
**API Endpoint:** `POST /api/tasks`  
**Request Body:**

```json
{
    "name": "Task name"
}
```

**Validations:**

-   Name is required
-   Maximum 250 characters
-   Must be unique (case-insensitive)

**Error Handling:** Shows dialog with error message if duplicate name

### 3. Edit Task

**UI Component:** `TaskItem.tsx` (Edit button)  
**API Endpoint:** `PUT /api/tasks/:id`  
**Request Body:**

```json
{
    "name": "Updated task name"
}
```

**Business Rules:**

-   Cannot edit tasks marked as DONE
-   New name must be unique
-   Shows warning dialog if attempting to edit completed task

**Keyboard Shortcuts:**

-   `Enter` - Save changes
-   `Escape` - Cancel editing

### 4. Complete Task

**UI Component:** `TaskItem.tsx` (Checkbox)  
**API Endpoint:** `PATCH /api/tasks/:id/complete`  
**Description:** Marks task as done (is_done: true)  
**Visual Feedback:**

-   Green background
-   Strikethrough text
-   Green checkmark

### 5. Delete Task

**UI Component:** `TaskItem.tsx` (Delete button)  
**API Endpoint:** `DELETE /api/tasks/:id`  
**Description:** Permanently removes task  
**Safety:** Shows confirmation dialog before deletion

### 6. Reset Database

**UI Component:** `TaskManager.tsx` (Reset button)  
**API Endpoint:** `POST /api/tasks/reset`  
**Description:** Deletes all tasks and restores 3 default tasks  
**Safety:** Shows confirmation dialog with warning message

### 7. API Health Status

**UI Component:** `ApiStatus.tsx`  
**API Endpoint:** `GET /health`  
**Description:** Monitors API connectivity  
**Features:**

-   Real-time status indicator (green/red dot)
-   Shows API port number
-   Polls every 10 seconds
-   Visual feedback with pulse animation

## User Interface

### Main Components

#### Header

-   Title: "📝 Task Manager"
-   Subtitle: "Organize your tasks efficiently"
-   API connection status badge

#### Statistics Cards

-   **Total Tasks** - Blue color
-   **Completed** - Green color
-   **Pending** - Orange color

#### Create Task Form

-   Text input (max 250 characters)
-   "Add Task" button
-   Real-time error display

#### Task List

-   Sorted by creation date (newest first)
-   Shows creation and update timestamps
-   Empty state message when no tasks

#### Task Item

-   **Checkbox** - Mark as complete
-   **Task Name** - Click to view details
-   **Edit Button** - Pencil icon (disabled for completed tasks)
-   **Delete Button** - Trash icon
-   **Timestamps** - Created and updated dates

#### Dialogs

-   **Confirmation Dialogs** - For delete and reset actions
-   **Error Dialogs** - For validation errors and API errors
-   **Warning Dialogs** - For business rule violations

### Color Scheme

```css
Primary Blue:    #3b82f6
Success Green:   #10b981
Danger Red:      #ef4444
Warning Orange:  #f59e0b
Background:      Linear gradient (purple to violet)
```

### Responsive Design

-   **Desktop:** Full layout with all features
-   **Tablet:** Adjusted spacing and card layout
-   **Mobile:** Stacked layout, full-width buttons

## Development

### Hot Module Replacement (HMR)

Vite provides instant feedback during development:

-   Changes to React components update without full page reload
-   CSS changes apply instantly
-   Fast refresh preserves component state

### Code Quality

The project uses TypeScript strict mode:

```json
{
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
}
```

### Development Tips

1. **Keep API running** - The web UI requires the API to be running
2. **Check browser console** - Look for API errors or network issues
3. **Use React DevTools** - Install React Developer Tools browser extension
4. **Monitor Network tab** - See API requests and responses

## Building for Production

### Build the application

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `dist/` folder.

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── vite.svg
```

### Deploy

The `dist/` folder can be deployed to any static hosting service:

-   **Vercel**
-   **Netlify**
-   **GitHub Pages**
-   **AWS S3 + CloudFront**
-   **Azure Static Web Apps**

**Important:** Update `VITE_API_URL` to point to your production API before building.

## Troubleshooting

### Problem: "API Disconnected" message

**Solutions:**

1. Check if the API is running on `http://localhost:3000`
2. Verify `.env` file has correct `VITE_API_URL`
3. Check browser console for CORS errors
4. Restart both API and web servers

### Problem: Tasks not loading

**Solutions:**

1. Open DevTools → Network tab
2. Check if `/api/tasks` request returns 200 OK
3. Verify API response format is an array of tasks
4. Check browser console for JavaScript errors

### Problem: "Failed to create task" errors

**Solutions:**

1. Check if task name is unique
2. Verify API is handling POST `/api/tasks` correctly
3. Check network tab for error response details
4. Ensure task name doesn't exceed 250 characters

### Problem: Port 5173 already in use

**Solutions:**

```bash
# Kill process using port 5173
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.ts
server: {
  port: 5174
}
```

### Problem: Environment variables not loading

**Solutions:**

1. Ensure `.env` file is in `apps/web/` directory
2. Variable must start with `VITE_` prefix
3. Restart the dev server after changing `.env`
4. Check for typos in variable names

### Problem: Styles not applying

**Solutions:**

1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check if CSS files are imported in components
3. Clear Vite cache: `rm -rf node_modules/.vite`
4. Restart dev server

## Browser Support

-   Chrome/Edge: Latest 2 versions
-   Firefox: Latest 2 versions
-   Safari: Latest 2 versions
-   Mobile browsers: iOS Safari, Chrome Android

## Performance

-   Initial load: ~100KB gzipped
-   React Query caching reduces API calls
-   Optimistic updates for better UX
-   Code splitting with lazy loading

## Accessibility

-   Semantic HTML elements
-   ARIA labels where needed
-   Keyboard navigation support
-   Focus indicators
-   Screen reader friendly

## Security

-   No sensitive data in localStorage
-   API URL configurable via environment
-   CORS handled by API
-   Input validation and sanitization

## License

MIT License - see [LICENSE](../api/LICENSE) file for details

Copyright (c) 2025 dotch3 <dotch3@gmail.com>

## Acknowledgments

-   **Fernando Papito** - For the excellent "Playwright Express" course that inspired this project
-   **React Team** - For the amazing React framework
-   **Vite Team** - For the blazing fast build tool
-   **TanStack Team** - For React Query library
-   Created as a learning exercise for test automation and web development

## Related Projects

-   **Task Management API** - Backend REST API (`../api/`)
-   **Playwright Tests** - E2E test suite (coming soon)

## Support

For questions or issues, contact: dotch3@gmail.com

## Disclaimer

This software is provided for testing and educational purposes only. Use at your own risk.

---

**Created by dotch3** | [dotch3@gmail.com](mailto:dotch3@gmail.com)  
_Inspired by Playwright Express course by Fernando Papito_

## Quick Start Checklist

-   [ ] API is running on port 3000
-   [ ] Node.js 18+ installed
-   [ ] Dependencies installed (`npm install`)
-   [ ] `.env` file created with `VITE_API_URL`
-   [ ] Dev server started (`npm run dev`)
-   [ ] Browser opened to `http://localhost:5173`
-   [ ] API connection shows "Connected"
-   [ ] Can see the 3 default seeded tasks

**Happy Task Managing! 🎉**
