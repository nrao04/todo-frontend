// Task color options - these match what the backend supports
export type TaskColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'gray';

export type TaskPriority = 'low' | 'medium' | 'high';

// Main task interface - this matches our backend schema
export interface Task {
  id: string; // backend uses string IDs
  title: string;
  color: TaskColor;
  completed: boolean;
  dueDate?: string; // ISO date string, optional
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

// For creating new tasks (we don't need id/timestamps)
export interface CreateTaskInput {
  title: string;
  color: TaskColor;
  dueDate?: string; // ISO date string, optional
  priority: TaskPriority;
}

// For updating existing tasks
export interface UpdateTaskInput {
  title?: string;
  color?: TaskColor;
  completed?: boolean;
  dueDate?: string; // ISO date string, optional
  priority?: TaskPriority;
}
