import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useContext, useEffect, useReducer, useState } from 'react'
import { getUsers } from '@/db/users'
import { User } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { initialTripState, tripReducer } from '@/lib/utils/reducers/tripReducer'
import { CalendarDate, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { createTrip, CreateTripProps } from '@/db'
import { useRouter } from 'next/navigation'
import Snackbar from '@mui/material/Snackbar'
import DateInput from '@/lib/components/inputs/DateInput'
import CardTravelRoundedIcon from '@mui/icons-material/CardTravelRounded'

const fieldStyles = { width: '100%' }
const autocompleteSx = {
  '.MuiInputBase-root': { alignItems: 'flex-start' }
}
const crewFieldSx = { ...fieldStyles, placeItems: 'flex-start', alignItems: 'flex-start!important' }
const createTripBtnSx = {
  marginTop: '3rem',
  padding: '12px',
  fontWeight: 600,
  width: '100%',
  alignSelf: 'end',
  '@media (min-width: 640px)': {
    marginTop: '2rem',
    width: 'auto'
  }
}

export default function TripForm() {
  const { user } = useContext(UserContext)
  const [tripState, dispatch] = useReducer(tripReducer, initialTripState)

  const [users, setUsers] = useState<User[]>([])

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const router = useRouter()

  function getCrewOptionLabel(option: User | string) {
    return typeof option === 'string' ? option : `${option.firstName} ${option.lastName}`
  }

  function getPayload() {
    return {
      name: tripState.name.value,
      location: tripState.location.value,
      description: tripState.description.value,
      start_date: tripState.startDate.value,
      end_date: tripState.endDate.value || tripState.startDate.value,
      ids: tripState.crewMembers.value.map((u) => u.id)
    } as CreateTripProps['data']
  }

  function saveTrip() {
    if (!user) return
    setSaving(true)

    // TODO: invite emails
    createTrip({
      userId: user.id,
      data: getPayload()
    })
      .then(() => {
        setSaved(true)
        router.push('/dashboard')
      })
      .catch((e) => console.error('Error creating trip', e))
  }

  useEffect(() => {
    getUsers()
      .then((response) => {
        const users = Object.values(response.data.users as User[])
        const usersNoSelf = users.filter((u) => u.id !== user?.id)

        setUsers(usersNoSelf)
      })
      .catch((e) => console.error('Error getting users', e))
  }, [])

  return (
    <>
      <div>
        <TextField
          variant="outlined"
          label="Trip name"
          value={tripState.name.value}
          onChange={(e) => dispatch({ type: 'name', value: e.target.value })}
          error={!tripState.name.valid}
          sx={fieldStyles}
          disabled={saving}
          required
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Trip location"
          value={tripState.location.value}
          error={!tripState.location.valid}
          onChange={(e) => dispatch({ type: 'location', value: e.target.value })}
          sx={fieldStyles}
          disabled={saving}
          required
        />
      </div>
      <div className="flex justify-between">
        <DateInput
          className="w-2/5"
          label="Start date"
          variant="bordered"
          size="sm"
          isRequired
          isInvalid={!tripState.startDate.valid}
          isDisabled={saving}
          value={
            tripState.startDate.value
              ? (parseDate(tripState.startDate.value) as CalendarDate)
              : null
          }
          onChange={(e) => {
            dispatch({
              type: 'startDate',
              value:
                e &&
                e.year >= today(getLocalTimeZone()).year &&
                e.year <= today(getLocalTimeZone()).year + 50
                  ? e.toString()
                  : ''
            })
          }}
        />
        <span className="self-center italic text-gray-500">to</span>
        <DateInput
          className="w-2/5"
          label="End date"
          variant="bordered"
          size="sm"
          isInvalid={!tripState.endDate.valid}
          isDisabled={saving}
          value={
            tripState.endDate.value ? (parseDate(tripState.endDate.value) as CalendarDate) : null
          }
          onChange={(e) => {
            dispatch({
              type: 'endDate',
              value:
                e &&
                e.year >= today(getLocalTimeZone()).year &&
                e.year <= today(getLocalTimeZone()).year + 50 &&
                tripState.startDate.value &&
                e >= parseDate(tripState.startDate.value)
                  ? e.toString()
                  : ''
            })
          }}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Description"
          multiline
          rows={4}
          value={tripState.description.value}
          error={!tripState.description.valid}
          onChange={(e) => dispatch({ type: 'description', value: e.target.value })}
          required
          disabled={saving}
          sx={fieldStyles}
        />
      </div>
      <div>
        <Autocomplete
          id="add-crew"
          options={users}
          getOptionLabel={getCrewOptionLabel}
          multiple
          freeSolo
          clearText="Clear"
          sx={autocompleteSx}
          onChange={(_e, value) => {
            dispatch({ type: 'crewMembers', value: value as User[] })
          }}
          filterOptions={(users, params) => {
            const filtered = users.filter((user) =>
              [user.email, user.firstName, user.lastName].some((v) => {
                return v.toLowerCase().includes(params.inputValue.toLowerCase())
              })
            )

            if (
              params.inputValue !== '' &&
              !users.some((user) =>
                [user.email, user.firstName, user.lastName].some((v) =>
                  v.toLowerCase().includes(params.inputValue.toLowerCase())
                )
              )
            ) {
              filtered.push({
                email: params.inputValue,
                firstName: '',
                lastName: '',
                color: 'purple',
                id: ''
              })
            }

            return filtered
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Crew"
              multiline
              minRows={2}
              maxRows={3}
              required
              disabled={saving}
              error={!tripState.crewMembers.valid}
              sx={crewFieldSx}
            />
          )}
        />
      </div>
      <Button
        variant="contained"
        disabled={Object.values(tripState).some((v) => !v.valid) || saving}
        startIcon={<CardTravelRoundedIcon />}
        onClick={saveTrip}
        sx={createTripBtnSx}>
        Create trip
      </Button>
      <Snackbar
        open={saved}
        message="Trip created!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{
          content: { sx: { bgcolor: 'background.paper', color: 'primary.main', fontWeight: 600 } }
        }}></Snackbar>
    </>
  )
}
