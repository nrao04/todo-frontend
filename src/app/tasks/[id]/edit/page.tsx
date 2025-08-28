import { getTask } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import { notFound } from 'next/navigation';

interface EditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  try {
    // await the params since it's now a Promise in Next.js 15
    const { id } = await params;

    // fetch the task to edit
    const task = await getTask(id);

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
