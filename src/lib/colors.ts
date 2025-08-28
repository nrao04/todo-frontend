import type { TaskColor } from '@/types/task';

// Modern color configuration with gradients and vibrant colors
export const colorConfig: Record<
  TaskColor,
  {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    shadow: string;
    hover: string;
  }
> = {
  red: {
    bg: 'bg-gradient-to-br from-red-500 to-red-600',
    border: 'border-red-700',
    text: 'text-red-800',
    gradient: 'from-red-500 to-red-600',
    shadow: 'shadow-red-200',
    hover: 'hover:from-red-500 hover:to-red-700',
  },
  blue: {
    bg: 'bg-gradient-to-br from-sky-500 to-sky-600',
    border: 'border-sky-700',
    text: 'text-sky-800',
    gradient: 'from-sky-500 to-sky-600',
    shadow: 'shadow-sky-200',
    hover: 'hover:from-sky-500 hover:to-sky-700',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    border: 'border-emerald-700',
    text: 'text-emerald-800',
    gradient: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-200',
    hover: 'hover:from-emerald-500 hover:to-emerald-700',
  },
  yellow: {
    bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    border: 'border-amber-700',
    text: 'text-amber-800',
    gradient: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-200',
    hover: 'hover:from-amber-500 hover:to-amber-700',
  },
  purple: {
    bg: 'bg-gradient-to-br from-violet-500 to-violet-600',
    border: 'border-violet-700',
    text: 'text-violet-800',
    gradient: 'from-violet-500 to-violet-600',
    shadow: 'shadow-violet-200',
    hover: 'hover:from-violet-500 hover:to-violet-700',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    border: 'border-orange-700',
    text: 'text-orange-800',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-200',
    hover: 'hover:from-orange-500 hover:to-orange-700',
  },
  pink: {
    bg: 'bg-gradient-to-br from-rose-500 to-rose-600',
    border: 'border-rose-700',
    text: 'text-rose-800',
    gradient: 'from-rose-500 to-rose-600',
    shadow: 'shadow-rose-200',
    hover: 'hover:from-rose-500 hover:to-rose-700',
  },
  gray: {
    bg: 'bg-gradient-to-br from-zinc-500 to-zinc-600',
    border: 'border-zinc-700',
    text: 'text-zinc-800',
    gradient: 'from-zinc-500 to-zinc-600',
    shadow: 'shadow-zinc-200',
    hover: 'hover:from-zinc-500 hover:to-zinc-700',
  },
};

// Get color classes for a specific task color
export function getTaskColorClasses(color: TaskColor) {
  return colorConfig[color];
}

// Get all available colors
export function getAvailableColors(): TaskColor[] {
  return Object.keys(colorConfig) as TaskColor[];
}

// Accent colors for general UI elements
export const accentColors = {
  primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
  secondary: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  success: 'bg-gradient-to-r from-green-400 to-emerald-500',
  warning: 'bg-gradient-to-r from-yellow-400 to-orange-500',
  danger: 'bg-gradient-to-r from-red-400 to-pink-500',
};
