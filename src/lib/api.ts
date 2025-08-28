import { API_BASE, API_ENDPOINTS } from './config';
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE}${API_ENDPOINTS.tasks}`, {
    cache: 'no-store', // always get fresh data
  });

  const result = await handleResponse<{ data: Task[] }>(response);
  return result.data;
}

// Get a single task by ID
export async function getTask(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE}${API_ENDPOINTS.tasks}/${id}`, {
    cache: 'no-store',
  });

  const result = await handleResponse<{ data: Task }>(response);
  return result.data;
}

// Create a new task
export async function createTask(input: CreateTaskInput): Promise<Task> {
  const response = await fetch(`${API_BASE}${API_ENDPOINTS.tasks}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const result = await handleResponse<{ data: Task }>(response);
  return result.data;
}

// Update an existing task
export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const response = await fetch(`${API_BASE}${API_ENDPOINTS.tasks}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const result = await handleResponse<{ data: Task }>(response);
  return result.data;
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}${API_ENDPOINTS.tasks}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to delete task`);
  }
}

// Toggle task completion status
export async function toggleTaskCompletion(id: string, completed: boolean): Promise<Task> {
  return updateTask(id, { completed });
}
