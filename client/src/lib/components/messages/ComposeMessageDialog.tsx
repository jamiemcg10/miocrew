import Button from '@mui/material/Button'
import Popup from '../Popup'
import TextField from '@mui/material/TextField'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { dummyEmails, trips } from '@/lib/utils/dummyData'
import Autocomplete from '@mui/material/Autocomplete'

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
  function getOptionLabel(
    option:
      | string
      | {
          email: string
          id: string
          type: string
        }
  ) {
    return typeof option === 'string' ? option : option.email
  }

  const tripOptions = trips.map((t) => {
    return { email: t.name, id: t.id, type: 'trip' }
  })
  const combinedRecipientOptions = [...tripOptions, ...dummyEmails]

  return (
    <Popup open={open} onClose={onClose}>
      <div className="h-full flex flex-col space-y-4">
        <div className="font-bold text-2xl flex items-center">
          <EditRoundedIcon sx={editIconSx} /> Compose
        </div>
        <TextField label="Subject" required sx={textFieldSx} />
        <Autocomplete
          id="add-recipients"
          options={combinedRecipientOptions}
          getOptionLabel={getOptionLabel}
          multiple
          freeSolo
          filterOptions={(options, params) => {
            const filtered = options.filter((option) =>
              option.email?.toLowerCase().includes(params.inputValue.toLowerCase())
            )
            if (
              params.inputValue !== '' &&
              !options.some((opt) => opt.email === params.inputValue)
            ) {
              filtered.push({ id: '', email: params.inputValue, type: 'user' })
            }
            return filtered
          }}
          renderInput={(params) => <TextField {...params} label="To" required sx={textFieldSx} />}
        />

        <TextField multiline label="Message" required sx={msgFieldSx} slotProps={msgSlotProps} />
        <Button variant="contained" startIcon={<SendRoundedIcon />} sx={sendBtnSx}>
          Send
        </Button>
      </div>
    </Popup>
  )
}
