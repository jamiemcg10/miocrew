import { PollTask } from '@/lib/types'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import PieChart from './PieChart'

interface PollTaskViewProps {
  activeTask: PollTask | null
}

interface SpecializedPollTaskViewProps {
  activeTask: PollTask
}

// NOTE: Need to track who has completed poll to determine the view

export default function PollTaskView({ activeTask }: PollTaskViewProps) {
  if (!activeTask) return

  return (
    <>
      {activeTask.completed ? (
        <CompletedPoll activeTask={activeTask} />
      ) : (
        <UncompletedPoll activeTask={activeTask} />
      )}
    </>
  )
}

function UncompletedPoll({ activeTask }: SpecializedPollTaskViewProps) {
  return (
    <form className="flex flex-col mt-8">
      <FormControl>
        <FormLabel>{activeTask?.description}</FormLabel>
        <FormGroup>
          {activeTask?.options.map((option, i) => {
            return (
              <FormControlLabel
                label={option.label}
                control={
                  activeTask?.multiple ? <Checkbox name={option.label}></Checkbox> : <Radio />
                }
                key={i}
              />
            )
          })}
        </FormGroup>
      </FormControl>
      <Button variant="contained" sx={{ mt: 4, fontWeight: 700, width: 'fit-content' }}>
        Submit
      </Button>
    </form>
  )
}

function CompletedPoll({ activeTask }: SpecializedPollTaskViewProps) {
  return (
    <>
      <div className="italic">Results</div>
      <div className="my-4 sm:my-2 text-lg">{activeTask.description}</div>
      <PieChart results={activeTask.options} />
    </>
  )
}
