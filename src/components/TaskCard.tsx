'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Task } from '@/types/task';
import { getTaskColorClasses } from '@/lib/colors';
import { toggleTaskCompletion, deleteTask } from '@/lib/api';

interface TaskCardProps {
  task: Task;
  onTaskUpdate: () => void; // callback to refresh the task list
}

export default function TaskCard({ task, onTaskUpdate }: TaskCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const colorClasses = getTaskColorClasses(task.color);

  // Handle task completion toggle
  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigation when clicking checkbox

    if (isToggling) return; // prevent double-clicks

    setIsToggling(true);
    try {
      await toggleTaskCompletion(task.id, !task.completed);
      onTaskUpdate(); // refresh the task list
    } catch (error) {
      console.error('Failed to toggle task:', error);
      // could add a toast notification here
    } finally {
      setIsToggling(false);
    }
  };

  // Handle task deletion
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigation

    if (isDeleting) return;

    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      onTaskUpdate(); // refresh the task list
    } catch (error) {
      console.error('Failed to delete task:', error);
      // could add a toast notification here
    } finally {
      setIsDeleting(false);
    }
  };

  // Navigate to edit page when clicking the card
  const handleCardClick = () => {
    router.push(`/tasks/${task.id}/edit`);
  };

  return (
    <div
      role="button"
      onClick={handleCardClick}
      className={`
        ${colorClasses.bg} ${colorClasses.border}
        rounded-xl border-2 p-4 cursor-pointer
        transition-all duration-200 hover:shadow-md hover:scale-[1.02]
        ${task.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        {/* Left side: checkbox and title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            disabled={isToggling}
            className="h-5 w-5 rounded border-2 border-gray-300 
                     text-blue-600 focus:ring-blue-500 
                     disabled:opacity-50 cursor-pointer"
            aria-label="Toggle task completion"
          />

          <div className="min-w-0 flex-1">
            <h3
              className={`
              font-medium text-gray-900 truncate
              ${task.completed ? 'line-through text-gray-500' : ''}
            `}
            >
              {task.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Created {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right side: delete button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 
                   hover:bg-red-50 rounded-lg transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Delete task"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
