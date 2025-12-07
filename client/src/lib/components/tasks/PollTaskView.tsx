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

// NOTE: Need to track who has completed poll to determine the view
const submitBtnSx = { mt: 4, fontWeight: 700, width: 'fit-content' }

export default function PollTaskView({ activeTask }: PollTaskViewProps) {
  return (
    <>
      {activeTask?.completed ? (
        <CompletedPoll activeTask={activeTask} />
      ) : (
        <UncompletedPoll activeTask={activeTask} />
      )}
    </>
  )
}

function UncompletedPoll({ activeTask }: PollTaskViewProps) {
  return (
    <form className="flex flex-col mt-8">
      <FormControl>
        <FormLabel>{activeTask?.question}</FormLabel>
        <FormGroup>
          {activeTask?.options.map((option, i) => {
            return (
              <FormControlLabel
                label={option}
                control={activeTask?.multiple ? <Checkbox name={option}></Checkbox> : <Radio />}
                key={i}
              />
            )
          })}
        </FormGroup>
      </FormControl>
      <Button variant="contained" sx={submitBtnSx}>
        Submit
      </Button>
    </form>
  )
}

function CompletedPoll({ activeTask }: PollTaskViewProps) {
  return (
    <>
      <div className="italic">Results</div>
      <div className="my-4 sm:my-2 text-lg">{activeTask?.question}</div>
      <PieChart />
    </>
  )
}
