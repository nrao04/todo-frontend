import type { TaskColor } from '@/types/task';

// Color configuration for our task cards
export const colorConfig: Record<TaskColor, { bg: string; border: string; text: string }> = {
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
  gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' },
};

// Get color classes for a task
export function getTaskColorClasses(color: TaskColor) {
  return colorConfig[color];
}

// Get all available colors for the color picker
export function getAvailableColors(): TaskColor[] {
  return Object.keys(colorConfig) as TaskColor[];
}
