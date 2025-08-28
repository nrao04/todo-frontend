import TaskForm from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <TaskForm />
      </div>
    </div>
  );
}
