import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useRef } from 'react'
import PollOptionsDialog from './PollOptionsDialog'
import Dialog from '../Dialog'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { CrewMember, isTask, PollTaskOption, Task } from '@/lib/types'
import { today, getLocalTimeZone, CalendarDate, parseDate } from '@internationalized/date'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { createTask, updateTask } from '@/db/tasks'
import { TaskPayload } from '@/db'
import { taskReducer, initialTaskState } from '@/lib/utils/reducers/taskReducer'
import { dialogTitleSx, mb2Sx } from '@/lib/styles/sx'
import { useSubmitOnEnter } from '@/lib/utils/useSubmitOnEnter'
import DateInput from '../DateInput'

interface TaskDialogProps {
  open: boolean | Task
  setOpen: Dispatch<SetStateAction<boolean | Task>>
}

const createTaskBtnSx = { fontWeight: 700, mt: 5 }

export default function TaskDialog({ open, setOpen }: TaskDialogProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const valid = !!(state.name.value && (state.assigneeId.value || state.type.value === 'poll'))

  const trip = useContext(TripContext)
  const { user } = useContext(UserContext)

  function getTaskPayload() {
    const payload = {
      name: state.name.value,
      description: state.description.value,
      type: state.type.value,
      due_date: state.dueDate.value,
      assignee_id: state.type.value === 'poll' ? 'Everyone' : state.assigneeId.value,
      completed: false,
      trip_id: trip?.id,
      creator_id: user!.id,
      multiple: state.type.value === 'poll' ? false : undefined,
      poll_question: state.pollQuestion.value
    } as TaskPayload

    if (isTask(open)) {
      payload.id = open.id
    }

    return payload
  }

  function getPollOptionsPayload() {
    return state.type.value === 'poll'
      ? state.pollOptions.value.map((opt) => {
          return {
            ...opt,
            votes: 0
          }
        })
      : null
  }

  function saveTask() {
    if (!trip || !user) return

    const taskArgs = {
      userId: user.id,
      tripId: trip.id,
      data: {
        task: getTaskPayload(),
        poll_options: getPollOptionsPayload()
      }
    }

    if (isTask(open)) {
      updateTask(taskArgs)
        .catch((e) => console.error(`Error updating task`, e))
        .finally(() => setOpen(false))
    } else {
      createTask(taskArgs)
        .catch((e) => console.error(`Error creating task`, e))
        .finally(() => setOpen(false))
    }
  }

  const submitBtnRef = useRef<HTMLButtonElement>(null)

  useSubmitOnEnter(() => submitBtnRef.current!.click(), valid)

  useEffect(() => {
    dispatch({ type: 'set-task', value: isTask(open) ? open : undefined })
  }, [open])

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={dialogTitleSx}>{isTask(open) ? 'Edit' : 'Add new'} task</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField
          label="Task Name"
          required
          autoFocus={isTask(open) ? false : true}
          sx={mb2Sx}
          value={state.name.value}
          error={!state.name.valid}
          onChange={(e) => {
            dispatch({ type: 'name', value: e.target.value })
          }}
        />
        <FormControl fullWidth sx={mb2Sx}>
          <InputLabel>Task Type</InputLabel>
          <Select
            label="Task Type"
            required
            value={state.type.value}
            onChange={(e) => {
              dispatch({ type: 'type', value: e.target.value })
            }}>
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="poll">Poll</MenuItem>
          </Select>
        </FormControl>
        {state.type.value === 'poll' ? (
          <PollOptionsDialog
            question={state.pollQuestion.value}
            options={state.pollOptions.value}
            onChangeOptions={(value: PollTaskOption[]) => dispatch({ type: 'pollOptions', value })}
            onChangeQuestion={(value: string) => dispatch({ type: 'pollQuestion', value })}
          />
        ) : (
          <>
            <TextField
              label="Description"
              multiline
              rows={3}
              sx={mb2Sx}
              value={state.description.value}
              onChange={(e) => {
                dispatch({ type: 'description', value: e.target.value })
              }}
            />
            <FormControl required>
              <InputLabel>Assignee</InputLabel>
              <Select
                label="Assignee"
                value={state.assigneeId.value}
                sx={mb2Sx}
                error={!state.assigneeId.valid}
                onChange={(e) => {
                  dispatch({ type: 'assigneeId', value: e.target.value })
                }}>
                {Object.values(trip?.attendees || {}).map((a: CrewMember) => {
                  return (
                    <MenuItem value={a.attendeeId} key={a.attendeeId}>
                      {a.firstName} {a.lastName}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </>
        )}
        <DateInput
          className="w-3/5 mb-2"
          label="Due Date"
          variant="bordered"
          size="sm"
          value={state.dueDate.value ? (parseDate(state.dueDate.value) as CalendarDate) : undefined}
          isDateUnavailable={(date) => {
            return date < today(getLocalTimeZone())
          }}
          classNames={{
            label: 'group-data-[required=true]:after:text-inherit',
            inputWrapper: 'group-data-[invalid=true]:focus-within:border-danger',
            segment: 'data-[invalid=true]:data-[editable=true]:data-[placeholder=true]:text-danger'
          }}
          onChange={(e) => {
            if (!e) return

            dispatch({ type: 'dueDate', value: e.toString() })
          }}
        />
        <Button
          variant="contained"
          ref={submitBtnRef}
          sx={createTaskBtnSx}
          disabled={!valid}
          onClick={saveTask}>
          Save Task
        </Button>
      </form>
    </Dialog>
  )
}
