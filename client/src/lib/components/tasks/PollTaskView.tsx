import { PollTask } from '@/lib/types'
import UncompletedPoll from './UncompletedPoll'
import CompletedPoll from './CompletedPoll'

interface PollTaskViewProps {
  activeTask: PollTask | null
  closeView: () => void
}

export default function PollTaskView({ activeTask, closeView }: PollTaskViewProps) {
  if (!activeTask) return

  return (
    <>
      {activeTask.completed ? (
        <CompletedPoll activeTask={activeTask} />
      ) : (
        <UncompletedPoll activeTask={activeTask} closeView={closeView} />
      )}
    </>
  )
}
