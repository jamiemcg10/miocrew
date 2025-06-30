import { Task, User } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'

interface TaskItemProps {
  task: Task
}

function getImage(type: string) {
  switch (type) {
    case 'poll':
      return <PieChartRoundedIcon />
    case 'general':
      return <EventRoundedIcon />
  }
}

function getAssigneeName(assignee: 'Everyone' | User) {
  if (assignee === 'Everyone') {
    return 'Everyone'
  } else {
    return `${assignee.firstName} ${assignee.lastName}`
  }
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="h-16 sm:h-12 mb-4 bg-[#cccccc] rounded-lg items-center flex justify-between dark:even:bg-white/20 dark:odd:bg-white/10">
      <div className="flex grow justify-between mr-4 flex-col sm:flex-row">
        <span className="pr-4 pl-2 inline-flex items-center text-lg font-semibold gap-2 basis-3/5">
          {task.completed ? (
            <CheckBoxRoundedIcon fontSize="small" />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon fontSize="small" />
          )}
          {getImage(task.type)}
          {task.name}
        </span>
        <span className="basis-1/5 italic text-sm content-center">
          {getAssigneeName(task.assignee)}
        </span>
        <span className="text-right px-2 font-semibold basis-1/6 text-sm content-center">
          {dateFormatter.format(task.dueDate)}
        </span>
      </div>
    </div>
  )
}
