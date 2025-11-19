import { GeneralTask, PollTask, Task, User } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import TableRow from '../layout/TableRow'
import CrewAvatar from '../CrewAvatar'

interface TaskItemProps {
  task: Task
  onClick: () => void
}

export function getImage(type: string) {
  switch (type) {
    case 'poll':
      return <PieChartRoundedIcon />
    case 'general':
      return <EventRoundedIcon />
  }
}

function isPollTask(task: GeneralTask | PollTask): task is PollTask {
  return task.assigneeId === 'Everyone'
}

function getAssigneeName(assignee: User) {
  return (
    <div className="flex gap-2">
      <CrewAvatar user={assignee} size="xs" /> {assignee.firstName} {assignee.lastName}
    </div>
  )
}

export default function TaskItem({ task, onClick }: TaskItemProps) {
  return (
    <TableRow onClick={onClick}>
      <div className="ml-2">
        {task.completed ? (
          <CheckBoxRoundedIcon fontSize="small" />
        ) : (
          <CheckBoxOutlineBlankRoundedIcon fontSize="small" />
        )}
      </div>
      <div className="flex grow justify-between ml-2 mr-4 flex-col sm:flex-row">
        <span className="pr-4 inline-flex items-center text-lg font-semibold gap-2 basis-2/3">
          {getImage(task.type)}
          {task.name}
        </span>
        <div className="flex grow justify-between">
          <span className="italic text-sm content-center">
            {isPollTask(task) ? 'Everyone' : getAssigneeName(task.assignee)}
          </span>
          {task.dueDate && (
            <span className="text-right px-2 font-semibold text-sm content-center">
              {dateFormatter(task.dueDate)}
            </span>
          )}
        </div>
      </div>
    </TableRow>
  )
}
