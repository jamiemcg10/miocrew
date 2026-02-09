import PieChart from './PieChart'
import { PollTask } from '@/lib/types'

interface CompletedPollTaskViewProps {
  activeTask: PollTask
}

export default function CompletedPoll({ activeTask }: CompletedPollTaskViewProps) {
  if (!activeTask) return

  return (
    <>
      <div className="italic">Results</div>
      <div className="my-4 sm:my-2 text-lg">{activeTask.pollQuestion}</div>
      <PieChart results={activeTask.pollOptions} />
    </>
  )
}
