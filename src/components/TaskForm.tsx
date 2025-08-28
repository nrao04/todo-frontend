'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Task, TaskColor } from '@/types/task';
import { createTask, updateTask } from '@/lib/api';
import { getAvailableColors, getTaskColorClasses } from '@/lib/colors';

interface TaskFormProps {
  initialTask?: Task; // if provided, we're editing; otherwise creating
}

export default function TaskForm({ initialTask }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTask?.title || '');
  const [color, setColor] = useState<TaskColor>(initialTask?.color || 'blue');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableColors = getAvailableColors();
  const isEditing = !!initialTask;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      if (isEditing && initialTask) {
        await updateTask(initialTask.id, { title: title.trim(), color });
      } else {
        await createTask({ title: title.trim(), color });
      }

      // redirect back to home page
      router.push('/');
      router.refresh(); // refresh to get updated data
    } catch (error) {
      console.error('Failed to save task:', error);
      setError('Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditing ? 'Update your task details below.' : 'Add a new task to your list.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400"
            required
          />
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Choose Color</label>
          <div className="grid grid-cols-4 gap-3">
            {availableColors.map((colorOption) => {
              const colorClasses = getTaskColorClasses(colorOption);
              const isSelected = color === colorOption;

              return (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => setColor(colorOption)}
                  className={`
                    w-12 h-12 rounded-lg border-2 transition-all duration-200
                    ${colorClasses.bg} ${colorClasses.border}
                    ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-105'}
                  `}
                  aria-label={`Select ${colorOption} color`}
                >
                  {isSelected && (
                    <svg
                      className="w-6 h-6 mx-auto text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Link
            href="/"
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 
                     hover:bg-gray-200 rounded-lg text-center font-medium
                     transition-colors duration-200"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                     font-medium transition-colors duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </div>
            ) : isEditing ? (
              'Update Task'
            ) : (
              'Create Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
