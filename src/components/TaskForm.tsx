'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Task, TaskColor, TaskPriority } from '@/types/task';
import { createTask, updateTask } from '@/lib/api';

interface TaskFormProps {
  initialTask?: Task;
}

export default function TaskForm({ initialTask }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTask?.title || '');
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate ? initialTask.dueDate.split('T')[0] : ''
  );
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority || 'medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Use a default color for all tasks
  const defaultColor: TaskColor = 'blue';

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
      const taskData = {
        title: title.trim(),
        color: defaultColor,
        priority,
        ...(dueDate && { dueDate: new Date(dueDate).toISOString() }),
      };

      if (isEditing && initialTask) {
        // Update existing task
        await updateTask(initialTask.id, taskData);
      } else {
        // Create new task
        await createTask(taskData);
      }

      // redirect back to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Failed to save task:', error);
      setError('Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* Modern header with gradient */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl transform hover:rotate-6 transition-transform duration-300">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h1>
          <p className="text-lg text-gray-300 font-medium leading-relaxed">
            {isEditing ? 'Time to level up this task.' : 'What are you going to crush today?'}
          </p>
        </div>

        {/* Modern form card */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-base font-bold text-white">
                Task Title <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to get done?"
                  className="w-full px-4 py-3 text-base bg-black/20 border-2 border-white/10 rounded-xl 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500
                           transition-all duration-200 hover:border-white/20"
                  required
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Due Date Input */}
            <div className="space-y-2">
              <label htmlFor="dueDate" className="block text-base font-bold text-white">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 text-base bg-black/20 border-2 border-white/10 rounded-xl 
                         text-white focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500
                         transition-all duration-200 hover:border-white/20"
              />
            </div>

            {/* Priority Selection */}
            <div className="space-y-3">
              <label className="block text-base font-bold text-white">Priority Level</label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as TaskPriority[]).map((priorityOption) => {
                  const isSelected = priority === priorityOption;
                  const priorityColors = {
                    low: 'from-green-500 to-emerald-600',
                    medium: 'from-yellow-500 to-orange-600',
                    high: 'from-red-500 to-pink-600',
                  };

                  return (
                    <button
                      key={priorityOption}
                      type="button"
                      onClick={() => setPriority(priorityOption)}
                      className={`
                        relative px-4 py-3 rounded-xl border-2 transition-all duration-300 font-bold text-white
                        ${
                          isSelected
                            ? `bg-gradient-to-r ${priorityColors[priorityOption]} border-white ring-4 ring-blue-500 ring-offset-2 scale-105 shadow-lg`
                            : 'bg-black/20 border-white/10 hover:border-white/20 hover:scale-105'
                        }
                      `}
                    >
                      {priorityOption.charAt(0).toUpperCase() + priorityOption.slice(1)}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-red-300 font-medium text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Link
                href="/"
                className="flex-1 px-4 py-3 text-gray-300 bg-black/20 hover:bg-black/40 
                         border border-white/10 hover:border-white/20 rounded-xl text-center font-bold
                         transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="flex-1 px-4 py-3 text-white rounded-xl font-bold
                         bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                         transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         border border-white/20"
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
      </div>
    </div>
  );
}
