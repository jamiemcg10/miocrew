import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import PollOptionsDialog from './PollOptionsDialog'
import Dialog from '../Dialog'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { PollTaskOption, User } from '@/lib/types'
import { DatePicker } from '@heroui/date-picker'
import { today, getLocalTimeZone } from '@internationalized/date'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { addTask } from '@/db/tasks'

interface CreateTaskDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

type TaskType = 'general' | 'poll'

export default function CreateTaskDialog({ open, setOpen }: CreateTaskDialogProps) {
  const [type, setType] = useState<'general' | 'poll' | ''>('')
  const [assignee, setAssignee] = useState<string>('')
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState<PollTaskOption[]>([
    { label: '', votes: 0 },
    { label: '', votes: 0 }
  ])

  const trip = useContext(TripContext)
  const user = useContext(UserContext)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const dateRef = useRef<HTMLInputElement | null>(null)

  const [dateInvalid, setDateInvalid] = useState(false)

  function getTaskPayload() {
    return {
      name: nameRef?.current?.value,
      description: descriptionRef?.current?.value,
      type: type,
      due_date: dateRef?.current?.value,
      assignee_id: type === 'poll' ? 'everyone' : assignee,
      completed: false,
      trip_id: trip?.id,
      creator_id: user!.id,
      question: type === 'poll' ? pollQuestion : undefined,
      multiple: type === 'poll' ? false : undefined
    }
  }

  function saveTask() {
    if (!trip || !user) return

    const taskPayload = getTaskPayload()

    const pollTaskPayload =
      type === 'poll'
        ? pollOptions.map((opt) => {
            return {
              ...opt,
              votes: 0
            }
          })
        : null

    console.log({ taskPayload, pollTaskPayload })

    addTask({
      userId: user?.id,
      tripId: trip?.id,
      data: {
        task: taskPayload,
        poll_options: pollTaskPayload
      }
    })
      .catch((e) => console.error(`Error adding task`, e))
      .finally(() => setOpen(false))
  }

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Create new task</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField label="Task Name" required sx={{ mb: 2 }} inputRef={nameRef} />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Task Type</InputLabel>
          <Select
            label="Task Type"
            required
            value={type}
            onChange={(e) => {
              setType(e.target.value as TaskType)
            }}>
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="poll">Poll</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          multiline
          rows={3}
          sx={{ mb: 2 }}
          inputRef={descriptionRef}
        />
        {type === 'poll' ? (
          <PollOptionsDialog
            question={pollQuestion}
            setQuestion={setPollQuestion}
            options={pollOptions}
            setOptions={setPollOptions}
          />
        ) : type === 'general' ? (
          <FormControl>
            <InputLabel>Assignee</InputLabel>
            <Select
              label="Assignee"
              value={assignee}
              sx={{ mb: 2 }}
              onChange={(e) => {
                setAssignee(e.target.value)
              }}>
              {Object.values(trip?.attendees || {}).map((a: User) => {
                return (
                  <MenuItem value={a.id} key={a.id}>
                    {a.firstName} {a.lastName}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        ) : null}
        <DatePicker
          className="w-3/5 mb-2"
          label="Due Date"
          variant="bordered"
          size="sm"
          inputRef={dateRef}
          isRequired
          isInvalid={dateInvalid}
          isDateUnavailable={(date) => {
            return date < today(getLocalTimeZone())
          }}
          classNames={{
            label: 'group-data-[required=true]:after:text-inherit',
            inputWrapper: 'group-data-[invalid=true]:focus-within:border-danger',
            segment: 'data-[invalid=true]:data-[editable=true]:data-[placeholder=true]:text-danger'
          }}
          errorMessage={(value) => {
            if (value.isInvalid) {
              return 'Please select a due date.'
            }
          }}
          onChange={() => {
            setDateInvalid(false)
          }}
        />
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }} onClick={saveTask}>
          Create Task
        </Button>
      </form>
    </Dialog>
  )
}
