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
          <EditRoundedIcon sx={{ mr: 1 }} /> Compose
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

        <TextField
          multiline
          label="Message"
          required
          sx={{ ...textFieldSx, height: '100%' }}
          slotProps={{ input: { sx: { height: '100%', placeItems: 'self-start' } } }}
        />
        <Button
          variant="contained"
          startIcon={<SendRoundedIcon />}
          sx={{ ml: 'auto', mt: 'auto', fontWeight: 700 }}>
          Send
        </Button>
      </div>
    </Popup>
  )
}
