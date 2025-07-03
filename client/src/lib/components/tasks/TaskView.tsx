import { Task } from '@/lib/types'
import Popup from '../Popup'
import PollTaskView from './PollTaskView'
import GeneralTaskView from './GeneralTaskView'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded'

interface TaskViewProps {
  activeTask: Task | null
  onClose: () => void
}

export default function TaskView({ activeTask, onClose }: TaskViewProps) {
  return (
    <Popup open={!!activeTask} onClose={() => onClose()}>
      <>
        <div className="flex text-2xl items-center space-x-2">
          {activeTask?.completed ? (
            <CheckBoxRoundedIcon fontSize="small" />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon fontSize="small" />
          )}
          {activeTask?.type === 'general' ? (
            <EventRoundedIcon
              sx={{
                mr: 1,
                '@media (min-width:640px)': {
                  mr: 2
                }
              }}
            />
          ) : (
            <PieChartRoundedIcon
              sx={{
                mr: 1,
                '@media (min-width:640px)': {
                  mr: 2
                }
              }}
            />
          )}
          {activeTask?.name}
        </div>
        {activeTask?.type === 'poll' ? (
          <PollTaskView activeTask={activeTask} />
        ) : (
          <GeneralTaskView activeTask={activeTask} />
        )}
      </>
    </Popup>
  )
}
