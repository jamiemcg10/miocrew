import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import Dialog from '../Dialog'
import Autocomplete, { AutocompleteChangeDetails } from '@mui/material/Autocomplete'
import { User } from '@/lib/types'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { getUsers } from '@/db/users'
import { SyntheticEvent } from 'react'
import { addCrew } from '@/db'
import { UserContext } from '@/lib/utils/contexts/UserContext'

interface AddCrewDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface CrewSelectOption {
  email: string
  id: string
}

const dialogTitleSx = { fontWeight: 700 }
const autocompleteSx = {
  '.MuiInputBase-root': { alignItems: 'flex-start' }
}
const textFieldSx = {
  width: '100%',
  placeItems: 'flex-start',
  alignItems: 'flex-start!important'
}
const addCrewBtnSx = { fontWeight: 700, mt: 5 }

export default function AddCrewDialog({ open, setOpen }: AddCrewDialogProps) {
  const trip = useContext(TripContext)
  const user = useContext(UserContext)

  const [userDetails, setUserDetails] = useState<CrewSelectOption[]>([])
  const [invitedCrew, setInvitedCrew] = useState<CrewSelectOption[]>([])

  function onChangeInvitedCrew(
    _e: SyntheticEvent,
    value: Array<CrewSelectOption | string>,
    reason: string,
    _details?: AutocompleteChangeDetails<CrewSelectOption>
  ): void {
    if (reason === 'createOption') {
      value[value.length - 1] = { email: value[value.length - 1] as string, id: '' }
    }

    setInvitedCrew(value as CrewSelectOption[])
  }

  function getOptionLabel(option: CrewSelectOption | string) {
    return typeof option === 'string' ? option : option.email
  }

  function saveCrew() {
    if (!user || !trip) return

    // add friends/app users to trip
    // verify others as valid email addresses, do nothing for now

    const idsToAdd = invitedCrew.filter((crew) => !!crew.id).map((crew) => crew.id)

    addCrew({ userId: user.id, tripId: trip.id, ids: idsToAdd }).catch((e) =>
      console.error('Error adding crew members', e)
    )

    setOpen(false)
  }

  useEffect(() => {
    getUsers()
      .then((response) => {
        const userEmails = Object.values(response.data.users as User[])
          .filter((u) => !trip?.attendees[u.id])
          .map((u: User) => {
            return { email: u.email, id: u.id }
          })

        setUserDetails(userEmails)
      })
      .catch((e) => console.error('Error fetching users', e))
  }, [])

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={dialogTitleSx}>Add Crew Members</DialogTitle>
      <form className="flex flex-col m-10 mt-5">
        <div>
          <Autocomplete
            id="add-crew"
            options={userDetails}
            getOptionLabel={getOptionLabel}
            onChange={onChangeInvitedCrew}
            value={invitedCrew}
            multiple
            freeSolo
            clearText="Clear"
            sx={autocompleteSx}
            filterOptions={(users, params) => {
              const filtered = users.filter(
                (user) =>
                  user.email.toLowerCase().includes(params.inputValue.toLowerCase()) &&
                  !invitedCrew.find((u) => u.email === user.email)
              )

              if (params.inputValue !== '' && !users.some((u) => u.email === params.inputValue)) {
                filtered.push({ email: params.inputValue, id: '' })
              }

              return filtered
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Crew"
                multiline
                minRows={8}
                maxRows={10}
                sx={textFieldSx}
              />
            )}
          />
        </div>
        <Button variant="contained" onClick={saveCrew} sx={addCrewBtnSx}>
          Add Crew Members
        </Button>
      </form>
    </Dialog>
  )
}
