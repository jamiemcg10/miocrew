import Button from '@mui/material/Button'
import Popup from '../Popup'
import TextField from '@mui/material/TextField'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { dummyEmails } from '@/lib/utils/dummyData'

interface ComposeMessageDialogProps {
  open: boolean
  onClose: () => void
}

const textFieldSx = {
  my: 1
}

export default function ComposeMessageDialog({ open, onClose }: ComposeMessageDialogProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="h-full flex flex-col space-y-4">
        <div className="font-bold text-2xl flex items-center">
          <EditRoundedIcon sx={{ mr: 1 }} /> Compose
        </div>
        <TextField label="Subject" required sx={textFieldSx} />
        <TextField label="To" required sx={textFieldSx} />
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
