import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useReducer, useEffect, useRef } from 'react'
import Dialog from '../Dialog'
import { assignActivityColor } from '@/lib/utils/colors/assignColor'
import { Activity, isActivity } from '@/lib/types'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { createActivity, updateActivity } from '@/db'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { CalendarDate, parseDate, parseTime, Time } from '@internationalized/date'
import { activityReducer, initialActivityState } from '@/lib/utils/reducers/activityReducer'
import { dialogTitleSx, mb2Sx } from '@/lib/styles/sx'
import { useSubmitOnEnter } from '@/lib/utils/useSubmitOnEnter'
import DateInput from '../inputs/DateInput'
import TimeInput from '../inputs/TimeInput'

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

  const { trip } = useContext(TripContext)
  const { user } = useContext(UserContext)

  const [state, dispatch] = useReducer(activityReducer, initialActivityState)
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const valid = !!(state.name.value && state.startDate.value && state.startTime.value)

  useSubmitOnEnter(() => submitBtnRef.current!.click(), valid)

  useEffect(() => {
    dispatch({ type: 'set-activity', value: isActivity(open) ? open : undefined })
  }, [open])

  if (!trip) return

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={dialogTitleSx}>{isActivity(open) ? 'Edit' : 'Add new'} activity</DialogTitle>
      <div className="flex flex-col m-10">
        <TextField
          label="Activity Name"
          required
          autoFocus={isActivity(open) ? false : true}
          value={state.name.value}
          error={!state.name.valid}
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
          <DateInput
            className="w-3/5"
            label="Start date"
            variant="bordered"
            size="sm"
            isRequired
            showMonthAndYearPickers
            value={
              state.startDate.value ? (parseDate(state.startDate.value) as CalendarDate) : null
            }
            isInvalid={
              !state.startDate.valid ||
              !!(
                state.startDate.value &&
                (parseDate(state.startDate.value) < parseDate(trip.startDate) ||
                  parseDate(state.startDate.value) > parseDate(trip.endDate))
              )
            }
            onChange={(e) => {
              if (!e) return

              dispatch({ type: 'startDate', value: e.toString() })
            }}
            isDateUnavailable={(date) => {
              return !!(
                date < parseDate(trip.startDate) ||
                (trip.endDate && date > parseDate(trip.endDate))
              )
            }}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="Start time"
            size="sm"
            variant="bordered"
            isRequired
            isInvalid={!state.startTime.valid}
            value={state.startTime.value ? (parseTime(state.startTime.value) as Time) : null}
            onChange={(e) => {
              if (!e) return

              dispatch({ type: 'startTime', value: e.toString() })
            }}
          />
        </div>
        <div className="flex">
          <DateInput
            className="w-3/5"
            label="End date"
            variant="bordered"
            size="sm"
            showMonthAndYearPickers
            value={state.endDate.value ? (parseDate(state.endDate.value) as CalendarDate) : null}
            isInvalid={
              !state.endDate.valid ||
              !!(
                state.endDate.value &&
                (parseDate(state.endDate.value) < parseDate(trip.startDate) ||
                  parseDate(state.endDate.value) > parseDate(trip.endDate))
              )
            }
            isDateUnavailable={(date) => {
              return !!(
                date < parseDate(trip.startDate) ||
                date > parseDate(trip.endDate) ||
                (state.startDate.value && date < parseDate(state.startDate.value))
              )
            }}
            onChange={(e) => {
              if (!e) return

              dispatch({ type: 'endDate', value: e.toString() })
            }}
          />
          <TimeInput
            className="w-2/5 ml-2"
            label="End time"
            variant="bordered"
            size="sm"
            isInvalid={!state.endTime.valid}
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
