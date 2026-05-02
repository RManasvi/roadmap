import { Task, TaskType } from '@/lib/types'

const taskIcons: Record<TaskType, string> = {
  concept: '📚',
  code: '💻',
  practice: '🏋️',
  project: '🚀',
  reading: '📖',
}

interface TaskItemProps {
  task: Task
  isCompleted: boolean
  onToggle: (taskId: string) => void
}

export function TaskItem({ task, isCompleted, onToggle }: TaskItemProps) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] hover:border-[#2E2E3E] transition-colors">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded cursor-pointer mt-1 flex-shrink-0"
        style={{
          accentColor: '#00D4FF',
        }}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{taskIcons[task.type]}</span>
          <p className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
            {task.title}
          </p>
        </div>
        <p className="text-sm text-gray-400">{task.description}</p>
      </div>
    </div>
  )
}
