import { Task } from '@/lib/types'
import Popup from '../Popup'
import PollTaskView from './PollTaskView'
import GeneralTaskView from './GeneralTaskView'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext } from 'react'
import { deleteTask, updateTask } from '@/db/tasks'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import ActionButtons from '../ActionButtons'
import Button from '@mui/material/Button'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

interface TaskViewProps {
  activeTask: Task | null
  onEdit: () => void
  onClose: () => void
}

const iconSx = {
  mr: 1,
  '@media (min-width:640px)': {
    mr: 2
  }
}

export default function TaskView({ activeTask, onEdit, onClose }: TaskViewProps) {
  function onDelete() {
    if (!user || !trip || !activeTask) return

    deleteTask({ userId: user.id, tripId: trip.id, taskId: activeTask?.id })
      .catch((e) => {
        console.error(`Error deleting task`, e)
      })
      .finally(onClose)
  }

  function closeSurvey() {
    if (!user || !trip || !activeTask) return

    updateTask({
      userId: user.id,
      tripId: trip.id,
      data: {
        task: {
          id: activeTask.id,
          completed: true
        }
      }
    })
      .catch((e) => {
        console.error(`Error closing poll`, e)
      })
      .finally()
  }

  const { user } = useContext(UserContext)
  const { trip } = useContext(TripContext)

  return (
    <Popup open={!!activeTask} onClose={onClose}>
      <>
        {user?.id === activeTask?.creatorId && !activeTask?.completed ? (
          <div className="absolute bottom-8 right-8">
            {activeTask?.type === 'poll' && (
              <Button variant="text" startIcon={<CancelRoundedIcon />} onClick={closeSurvey}>
                Close poll
              </Button>
            )}
            <ActionButtons onEdit={onEdit} onDelete={onDelete} />
          </div>
        ) : null}
        <div className="flex text-2xl items-center space-x-2">
          {activeTask?.completed ? (
            <CheckBoxRoundedIcon fontSize="small" />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon fontSize="small" />
          )}
          {activeTask?.type === 'general' ? (
            <EventRoundedIcon sx={iconSx} />
          ) : (
            <PieChartRoundedIcon sx={iconSx} />
          )}
          {activeTask?.name}
        </div>
        {activeTask?.type === 'poll' ? (
          <PollTaskView activeTask={activeTask} closeView={onClose} />
        ) : (
          <GeneralTaskView activeTask={activeTask} closeView={onClose} />
        )}
      </>
    </Popup>
  )
}
