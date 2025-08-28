import { getTask } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import { notFound } from 'next/navigation';

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  try {
    // fetch the task to edit
    const task = await getTask(params.id);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto">
          <TaskForm initialTask={task} />
        </div>
      </div>
    );
  } catch (error) {
    // if task not found, show 404
    notFound();
  }
}
