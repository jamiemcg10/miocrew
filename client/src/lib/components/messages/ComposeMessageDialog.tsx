import Button from '@mui/material/Button'
import Popup from '../Popup'
import TextField from '@mui/material/TextField'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import Autocomplete from '@mui/material/Autocomplete'
import { useContext, useEffect, useState, useReducer } from 'react'
import { Trip, User, RecipientOption } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { getUsers } from '@/db/users'
import { getTrips, createMessage } from '@/db'
import { messageReducer, initialMessageState } from './utils/messageReducer'

interface ComposeMessageDialogProps {
  open: boolean
  onClose: () => void
}

const textFieldSx = {
  my: 1
}

const sendBtnSx = { ml: 'auto', mt: 'auto', fontWeight: 700 }
const msgFieldSx = { ...textFieldSx, height: '100%' }
const editIconSx = { mr: 1 }
const msgSlotProps = { input: { sx: { height: '100%', placeItems: 'self-start' } } }

export default function ComposeMessageDialog({ open, onClose }: ComposeMessageDialogProps) {
  function getOptionLabel(option: RecipientOption) {
    return option.name
  }

  const user = useContext(UserContext)

  const [users, setUsers] = useState<User[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [combinedRecipientOptions, setCombinedRecipientOptions] = useState<RecipientOption[]>([])

  const [state, dispatch] = useReducer(messageReducer, initialMessageState)

  useEffect(() => {
    if (!user) return

    getTrips({ userId: user.id })
      .then((response) => {
        if (response.data.trips) {
          setTrips(response.data.trips)
        }
      })
      .catch((e) => console.error('Error fetching trips', e))

    getUsers()
      .then((response) => {
        if (response.data.users) {
          setUsers(response.data.users)
        }
      })
      .catch((e) => console.error('Error fetching users', e))
  }, [user])

  useEffect(() => {
    const tripOptions = trips.map((t) => {
      return { name: t.name, id: t.id, type: 'trip' }
    })

    const userOptions = Object.values(users).map((u) => {
      return { name: `${u.firstName} ${u.lastName}`, id: u.id, type: 'user' }
    })
    setCombinedRecipientOptions([...tripOptions, ...userOptions])
  }, [users, trips])

  function saveMessage() {
    if (!user) return

    createMessage({ userId: user.id, data: state }).then().catch()
    dispatch({ type: 'reset-message' })

    onClose()
  }

  function setRecipients(_e: any, value: (string | RecipientOption)[]) {
    dispatch({ type: 'recipients', value })
  }

  if (!user) return

  return (
    <Popup open={open} onClose={onClose}>
      <div className="h-full flex flex-col space-y-4">
        <div className="font-bold text-2xl flex items-center">
          <EditRoundedIcon sx={editIconSx} /> Compose
        </div>
        <TextField
          label="Subject"
          required
          sx={textFieldSx}
          value={state.subject}
          onChange={(e) => dispatch({ type: 'subject', value: e.target.value })}
        />
        <Autocomplete
          id="add-recipients"
          options={combinedRecipientOptions}
          getOptionLabel={getOptionLabel}
          multiple
          value={state.recipients}
          onChange={setRecipients}
          filterOptions={(options, params) => {
            const filtered = options.filter((option) =>
              option.name?.toLowerCase().includes(params.inputValue.toLowerCase())
            )
            return filtered
          }}
          renderInput={(params) => <TextField {...params} label="To" required sx={textFieldSx} />}
        />

        <TextField
          multiline
          label="Message"
          required
          value={state.body}
          onChange={(e) => dispatch({ type: 'body', value: e.target.value })}
          sx={msgFieldSx}
          slotProps={msgSlotProps}
        />
        <Button
          variant="contained"
          startIcon={<SendRoundedIcon />}
          onClick={saveMessage}
          sx={sendBtnSx}></Button>
      </div>
    </Popup>
  )
}
