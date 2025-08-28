'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Task } from '@/types/task';
import { getTaskColorClasses } from '@/lib/colors';
import { toggleTaskCompletion, deleteTask } from '@/lib/api';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [localTask, setLocalTask] = useState(task);

  const colorClasses = getTaskColorClasses(localTask.color);

  // Priority colors and icons
  const priorityConfig = {
    low: { color: 'from-green-500 to-emerald-600', icon: '🟢', label: 'Low' },
    medium: { color: 'from-yellow-500 to-orange-600', icon: '🟡', label: 'Medium' },
    high: { color: 'from-red-500 to-pink-600', icon: '🔴', label: 'High' },
  };

  // Format due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date < today) {
      return 'Overdue';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get due date styling
  const getDueDateStyle = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date < today) {
      return 'text-red-400 bg-red-500/20 border-red-500/30';
    } else if (date.toDateString() === today.toDateString()) {
      return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    } else {
      return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  // Handle task completion toggle
  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (isToggling) return;

    const newCompletedState = e.target.checked;

    // Update local state immediately for better UX
    setLocalTask((prev) => ({ ...prev, completed: newCompletedState }));
    setIsToggling(true);

    try {
      await toggleTaskCompletion(localTask.id, newCompletedState);
      // Force a hard refresh to get the latest data from the server
      window.location.reload();
    } catch (error) {
      console.error('Failed to toggle task:', error);
      // Revert local state if API call failed
      setLocalTask((prev) => ({ ...prev, completed: !newCompletedState }));
    } finally {
      setIsToggling(false);
    }
  };

  // Handle task deletion
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isDeleting) return;

    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteTask(localTask.id);
      // Force a hard refresh to get the latest data from the server
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Navigate to edit page when clicking the card
  const handleCardClick = () => {
    router.push(`/tasks/${localTask.id}/edit`);
  };

  return (
    <div
      role="button"
      onClick={handleCardClick}
      className={`
        relative overflow-hidden rounded-xl border-2 p-4 cursor-pointer
        transition-all duration-300 hover:scale-[1.01] hover:shadow-xl
        group bg-black/30 backdrop-blur-md border-white/10
        ${localTask.completed ? 'opacity-70' : ''}
      `}
    >
      {/* Animated background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Subtle border glow on hover */}
      <div
        className={`absolute inset-0 rounded-xl border-2 ${colorClasses.border} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      />

      <div className="relative z-10 flex items-center justify-between">
        {/* Left side: checkbox and title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Modern animated checkbox */}
          <div className="relative">
            <input
              type="checkbox"
              checked={localTask.completed}
              onChange={handleToggle}
              disabled={isToggling}
              className="h-5 w-5 rounded-md border-2 border-gray-400 
                       text-white focus:ring-4 focus:ring-blue-500/30
                       disabled:opacity-50 cursor-pointer
                       transition-all duration-200
                       checked:bg-gradient-to-r checked:from-green-500 checked:to-emerald-600
                       checked:border-transparent hover:border-gray-300"
              aria-label="Toggle task completion"
            />
            {isToggling && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className={`
                text-base font-bold text-white truncate
                ${localTask.completed ? 'line-through text-gray-400' : ''}
                transition-all duration-200
              `}
            >
              {localTask.title}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              {/* Color indicator */}
              <span
                className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${colorClasses.gradient}`}
              />

              {/* Priority indicator */}
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${
                  priorityConfig[localTask.priority].color
                } text-white`}
              >
                <span>{priorityConfig[localTask.priority].icon}</span>
                <span>{priorityConfig[localTask.priority].label}</span>
              </div>

              {/* Due date */}
              {localTask.dueDate && (
                <div
                  className={`px-2 py-1 rounded-lg text-xs font-medium border ${getDueDateStyle(
                    localTask.dueDate
                  )}`}
                >
                  📅 {formatDueDate(localTask.dueDate)}
                </div>
              )}

              {/* Creation date */}
              <p className="text-xs text-gray-400 font-medium">
                Created {new Date(localTask.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right side: delete button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-4 p-2 text-gray-400 hover:text-red-400 
                   hover:bg-red-500/10 rounded-lg transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   group/delete"
          aria-label="Delete task"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

      {/* Completion status indicator */}
      {localTask.completed && (
        <div className="absolute top-2 right-2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-lg font-bold shadow-lg">
            ✓ DONE
          </div>
        </div>
      )}

      {/* Subtle corner accent */}
      <div
        className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${colorClasses.gradient} opacity-10 rounded-bl-xl`}
      />
    </div>
  );
}
