import { getPollVotes, updatePollVote } from '@/db'
import { PollTask, Vote } from '@/lib/types'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

interface UncompletedPollTaskViewProps {
  activeTask: PollTask
  // options: {
  //   checked: boolean
  //   setChecked: Dispatch<SetStateAction<boolean>>
  //   label: string
  //   id?: string
  //   taskId?: string
  //   votes?: number
  // }[]
  closeView: () => void
}

const submitBtnSx = { mt: 4, fontWeight: 700, width: 'fit-content' }

export default function UncompletedPoll({ activeTask, closeView }: UncompletedPollTaskViewProps) {
  const trip = useContext(TripContext)
  const { user } = useContext(UserContext)

  function submitPoll() {
    if (!user || !trip) return

    updatePollVote({
      userId: user.id,
      tripId: trip.id,
      taskId: activeTask.id,
      ids: activeTask.multiple
        ? options.filter((opt) => opt.checked).map((opt) => opt.id as string)
        : [radioValue || '']
    })
      .then(() => {
        closeView()
      })
      .catch((e) => console.error('Error voting', e))
  }

  const [radioValue, setRadioValue] = useState<string | null>(null)
  const options = activeTask.pollOptions.map((opt) => {
    const [checked, setChecked] = useState(false)

    return {
      ...opt,
      checked,
      setChecked
    }
  })

  useEffect(() => {
    if (!user) return

    getPollVotes({ userId: user.id, taskId: activeTask.id })
      .then((res) => {
        const votes = res.data.votes
        if (votes.length) {
          if (activeTask.multiple) {
            votes.forEach((vote: Vote) => {
              options.find((opt) => opt.id === vote.optionId)?.setChecked(true)
            })
          } else {
            setRadioValue(votes[0].optionId)
          }
        }
      })
      .catch((e) => {
        console.error('Error fetching votes', e)
      })
  }, [])

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
            value={radioValue}
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
