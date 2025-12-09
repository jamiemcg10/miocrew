import { Task } from '@/lib/types'
import Popup from '../Popup'
import PollTaskView from './PollTaskView'
import GeneralTaskView from './GeneralTaskView'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import IconButton from '@mui/material/IconButton'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext } from 'react'
import { deleteTask } from '@/db/tasks'
import { TripContext } from '@/lib/utils/contexts/TripContext'

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

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  return (
    <Popup open={!!activeTask} onClose={onClose}>
      <>
        {user?.id === activeTask?.creatorId ? (
          <div className="absolute bottom-8 right-8">
            <IconButton size="small" onClick={onEdit}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={onDelete}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
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
