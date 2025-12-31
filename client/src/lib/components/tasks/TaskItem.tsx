import { GeneralTask, PollTask, Task, User } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import TableRow from '../layout/TableRow'
import CrewAvatar from '../CrewAvatar'
import { Dispatch, SetStateAction } from 'react'

interface TaskItemProps {
  task: Task
  setActiveTask: Dispatch<SetStateAction<Task | null>>
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
    <div className="flex items-center gap-2">
      <CrewAvatar user={assignee} size="xs" />{' '}
      <span>
        {assignee.firstName} {assignee.lastName}
      </span>
    </div>
  )
}

export default function TaskItem({ task, setActiveTask }: TaskItemProps) {
  function onClick() {
    setActiveTask(task)
  }
  return (
    <TableRow onClick={onClick}>
      <div>
        {task.completed ? (
          <CheckBoxRoundedIcon fontSize="small" />
        ) : (
          <CheckBoxOutlineBlankRoundedIcon fontSize="small" />
        )}
      </div>
      <div className="flex grow justify-between ml-2 flex-col sm:flex-row">
        <span className="pr-4 inline-flex items-center gap-2 basis-3/5">
          {getImage(task.type)}
          {task.name}
        </span>
        <div className="flex grow justify-between">
          <span className="italic text-sm content-center">
            {isPollTask(task) ? 'Everyone' : getAssigneeName(task.assignee)}
          </span>
          {task.dueDate && (
            <span className="text-right pl-2 text-sm content-center">
              Due {dateFormatter(task.dueDate)}
            </span>
          )}
        </div>
      </div>
    </TableRow>
  )
}
