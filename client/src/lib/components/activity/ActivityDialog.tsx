import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useReducer, useEffect, useRef } from 'react'
import Dialog from '../Dialog'
import { DatePicker } from '@heroui/date-picker'
import { TimeInput } from '@heroui/date-input'
import { assignActivityColor } from '@/lib/utils/colors/assignColor'
import { Activity, isActivity } from '@/lib/types'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { createActivity, updateActivity } from '@/db'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { CalendarDate, parseDate, parseTime, Time } from '@internationalized/date'
import { activityReducer, initialActivityState } from '@/lib/utils/reducers/activityReducer'
import { dialogTitleSx, mb2Sx } from '@/lib/styles/sx'
import { useSubmitOnEnter } from '@/lib/utils/useSubmitOnEnter'

interface ActivityDialogProps {
  open: boolean | Activity
  setOpen: Dispatch<SetStateAction<boolean | Activity>>
}

const saveActivityBtnSx = { fontWeight: 700, mt: 5 }

export default function ActivityDialog({ open, setOpen }: ActivityDialogProps) {
  function getPayload() {
    const payload = {
      trip_id: trip?.id,
      name: state.name.value,
      description: state.description.value,
      location: state.location.value,
      start_time: `${state.startDate.value}T${state.startTime.value || ''}`,
      end_time: state.endDate.value
        ? `${state.endDate.value}` + (state.endTime.value ? `T${state.endTime.value}` : '')
        : null,
      color: isActivity(open) ? open.color : assignActivityColor()
    } as Partial<Activity>

    if (isActivity(open)) {
      payload.id = open.id
    }

    return payload
  }

  function saveActivity() {
    // TODO: Make sure end time and date is after start time and date
    if (!user || !trip) return

    const args = { userId: user.id, tripId: trip?.id, data: getPayload() }

    if (isActivity(open)) {
      updateActivity(args)
        .catch((e) => {
          console.error(`Error updating activity`, e)
        })
        .finally(() => {
          setOpen(false)
        })
    } else {
      createActivity(args)
        .catch((e) => {
          console.error(`Error creating activity`, e)
        })
        .finally(() => {
          setOpen(false)
        })
    }
  }

  const trip = useContext(TripContext)
  const { user } = useContext(UserContext)

  const [state, dispatch] = useReducer(activityReducer, initialActivityState)
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const valid = !!(state.name.value && state.startDate.value && state.startTime.value)

  useSubmitOnEnter(() => submitBtnRef.current!.click(), valid)

  useEffect(() => {
    dispatch({ type: 'set-activity', value: isActivity(open) ? open : undefined })
  }, [open])

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={dialogTitleSx}>{isActivity(open) ? 'Edit' : 'Add new'}Activity</DialogTitle>
      <div className="flex flex-col m-10">
        <TextField
          label="Activity Name"
          required
          autoFocus={isActivity(open) ? false : true}
          value={state.name.value}
          onChange={(e) => dispatch({ type: 'name', value: e.target.value })}
          sx={mb2Sx}
        />
        <TextField
          label="Activity Description"
          multiline
          rows={3}
          value={state.description.value}
          onChange={(e) => dispatch({ type: 'description', value: e.target.value })}
          sx={mb2Sx}
        />
        <TextField
          label="Location"
          value={state.location.value}
          onChange={(e) => dispatch({ type: 'location', value: e.target.value })}
          sx={mb2Sx}
        />
        <div className="flex mb-2">
          <DatePicker
            className="w-3/5"
            label="Start date"
            variant="bordered"
            size="sm"
            isRequired
            value={
              state.startDate.value ? (parseDate(state.startDate.value) as CalendarDate) : null
            }
            onChange={(e) => {
              if (!e) return

              dispatch({ type: 'startDate', value: e.toString() })
            }}
            classNames={{
              label: 'group-data-[required=true]:after:text-inherit'
            }}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="Start time"
            variant="bordered"
            isRequired
            value={state.startTime.value ? (parseTime(state.startTime.value) as Time) : null}
            onChange={(e) => {
              if (!e) return

              dispatch({ type: 'startTime', value: e.toString() })
            }}
            classNames={{
              label: 'group-data-[required=true]:after:text-inherit'
            }}
          />
        </div>
        <div className="flex">
          <DatePicker
            className="w-3/5"
            label="End date"
            variant="bordered"
            size="sm"
            value={state.endDate.value ? (parseDate(state.endDate.value) as CalendarDate) : null}
            onChange={(e) => {
              if (!e) return

              dispatch({ type: 'endDate', value: e.toString() })
            }}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="End time"
            variant="bordered"
            value={state.endTime.value ? (parseTime(state.endTime.value) as Time) : null}
            onChange={(e) => {
              if (!e) return

              dispatch({ type: 'endTime', value: e.toString() })
            }}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          ref={submitBtnRef}
          sx={saveActivityBtnSx}
          disabled={!state.name.value || !state.startDate.value || !state.startTime.value}
          onClick={saveActivity}>
          Save Activity
        </Button>
      </div>
    </Dialog>
  )
}
