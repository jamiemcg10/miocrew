import { PollTask } from '@/lib/types'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import PieChart from './PieChart'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup'
import { updatePollVote } from '@/db'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { UserContext } from '@/lib/utils/contexts/UserContext'

interface PollTaskViewProps {
  activeTask: PollTask | null
  closeView: () => void
}

interface UncompletedPollTaskViewProps {
  activeTask: PollTask
  options: {
    checked: boolean
    setChecked: Dispatch<SetStateAction<boolean>>
    label: string
    id?: string
    taskId?: string
    votes?: number
  }[]
  closeView: () => void
}

interface CompletedPollTaskViewProps {
  activeTask: PollTask
}

// TODO: Need to track who has completed poll to determine the view
const submitBtnSx = { mt: 4, fontWeight: 700, width: 'fit-content' }

export default function PollTaskView({ activeTask, closeView }: PollTaskViewProps) {
  if (!activeTask) return

  const options = activeTask.pollOptions.map((opt) => {
    const [checked, setChecked] = useState(false)

    return {
      ...opt,
      checked,
      setChecked
    }
  })

  console.log({ activeTask })

  return (
    <>
      {activeTask.completed ? (
        <CompletedPoll activeTask={activeTask} />
      ) : (
        <UncompletedPoll activeTask={activeTask} options={options} closeView={closeView} />
      )}
    </>
  )
}

function UncompletedPoll({ activeTask, options, closeView }: UncompletedPollTaskViewProps) {
  const trip = useContext(TripContext)
  const { user } = useContext(UserContext)

  function submitPoll() {
    if (!user || !trip) return

    updatePollVote({
      userId: user.id,
      tripId: trip.id,
      ids: activeTask.multiple
        ? options.filter((opt) => opt.checked).map((opt) => opt.id as string)
        : [radioValue]
    })
      .then(() => {
        closeView()
      })
      .catch((e) => console.error('Error voting', e))
  }

  const [radioValue, setRadioValue] = useState('')

  return (
    <form className="flex flex-col mt-8">
      <FormControl>
        <FormLabel>{activeTask?.pollQuestion}</FormLabel>
        {activeTask?.multiple ? (
          <FormGroup>
            {options.map((option, i) => {
              return (
                <FormControlLabel
                  label={option.label}
                  control={
                    <Checkbox
                      checked={option.checked}
                      onChange={(e) => option.setChecked(e.target.checked)}
                    />
                  }
                  key={i}
                />
              )
            })}
          </FormGroup>
        ) : (
          <RadioGroup
            onChange={(e) => {
              setRadioValue((e.target as HTMLInputElement).value)
            }}>
            {options.map((option, i) => {
              return (
                <FormControlLabel
                  label={option.label}
                  value={option.id}
                  control={<Radio />}
                  key={i}
                />
              )
            })}
          </RadioGroup>
        )}
      </FormControl>
      <Button variant="contained" sx={submitBtnSx} onClick={submitPoll}>
        Submit
      </Button>
    </form>
  )
}

function CompletedPoll({ activeTask }: CompletedPollTaskViewProps) {
  if (!activeTask) return

  return (
    <>
      <div className="italic">Results</div>
      <div className="my-4 sm:my-2 text-lg">{activeTask.pollQuestion}</div>
      <PieChart results={activeTask.pollOptions} />
    </>
  )
}
