// API configuration - this points to our Express.js backend
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// API endpoints - these match our backend routes
export const API_ENDPOINTS = {
  tasks: '/api/tasks',
  taskStats: '/api/tasks/stats',
  completedTasks: '/api/tasks/completed',
  pendingTasks: '/api/tasks/pending',
} as const;
