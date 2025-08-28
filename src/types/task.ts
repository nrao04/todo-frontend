// Task color options - these match what the backend supports
export type TaskColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'gray';

// Main task interface - this matches our backend schema
export interface Task {
  id: string; // backend uses string IDs
  title: string;
  color: TaskColor;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// For creating new tasks (we don't need id/timestamps)
export interface CreateTaskInput {
  title: string;
  color: TaskColor;
}

// For updating existing tasks
export interface UpdateTaskInput {
  title?: string;
  color?: TaskColor;
  completed?: boolean;
}
