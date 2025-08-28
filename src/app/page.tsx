import Link from 'next/link';
import { getTasks } from '@/lib/api';
import TaskCard from '@/components/TaskCard';

export default async function HomePage() {
  // fetch tasks from our backend
  const tasks = await getTasks();

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-900">My Tasks</h1>
            <Link
              href="/tasks/new"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white 
                       font-semibold rounded-xl hover:bg-blue-700 
                       transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Task
            </Link>
          </div>

          {/* Task Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-gray-900">Task Summary</div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{total}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Completed:</span>
                <span className="font-medium text-green-600">{completed}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Pending:</span>
                <span className="font-medium text-orange-600">{total - completed}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Task List */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">All Tasks</h2>
            <p className="text-gray-600">
              Click on any task to edit it, or use the checkbox to mark it complete.
            </p>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first task!</p>
              <Link
                href="/tasks/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white 
                         font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Task
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onTaskUpdate={() => {
                    // This will trigger a page refresh to get updated data
                    // In a real app, you might want to use React Query or SWR for better UX
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
