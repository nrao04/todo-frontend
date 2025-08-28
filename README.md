# Todo App Frontend

A modern, responsive Todo List application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Features

-  **Create, Edit, Delete** tasks with beautiful UI
-  **Color-coded tasks** (8 different colors)
-  **Toggle completion** status
-  **Responsive design** that works on all devices
-  **Fast and modern** with Next.js App Router
-  **Type-safe** with TypeScript throughout

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Express.js API (separate repository)

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see [todo-backend](https://github.com/nrao04/todo-backend))

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**Note**: Make sure your backend is running on port 3001, or update the URL accordingly.

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx          # Home page (task list)
│   ├── tasks/            # Task-related pages
│   │   ├── new/          # Create new task
│   │   └── [id]/edit/    # Edit existing task
│   └── layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── TaskCard.tsx      # Individual task display
│   └── TaskForm.tsx      # Create/edit task form
├── lib/                   # Utility functions
│   ├── api.ts            # API client functions
│   ├── colors.ts         # Color utilities
│   └── config.ts         # API configuration
└── types/                 # TypeScript type definitions
    └── task.ts           # Task-related types
```

## API Integration

This frontend connects to a backend API with the following endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update existing task
- `DELETE /api/tasks/:id` - Delete task

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Backend Repository

The backend API is located at: [https://github.com/nrao04/todo-backend](https://github.com/nrao04/todo-backend)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.