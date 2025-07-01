import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useState } from 'react'
import DialogPollOptions from './DialogPollOptions'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useMediaQuery, useTheme } from '@mui/material'

interface CreateTaskDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

type TaskType = 'General' | 'Poll'

export default function CreateTaskDialog({ open, setOpen }: CreateTaskDialogProps) {
  const [type, setType] = useState<'General' | 'Poll' | ''>('')

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      slotProps={{
        paper: { sx: { '@media (min-width: 560px)': { width: '50%' } } }
      }}
      onClose={() => setOpen(false)}>
      <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => setOpen(false)}>
        <CloseRoundedIcon />
      </IconButton>
      <DialogTitle sx={{ fontWeight: 700 }}>Create new task</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField label="Task Name" required sx={{ mb: 2 }} />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Task Type</InputLabel>
          <Select
            label="Task Type"
            required
            value={type}
            onChange={(e) => {
              setType(e.target.value as TaskType)
            }}>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Poll">Poll</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Description" multiline rows={3} sx={{ mb: 5 }} />
        {type === 'Poll' ? <DialogPollOptions /> : null}
        <Button variant="contained" sx={{ fontWeight: 700 }}>
          Create Task
        </Button>
      </form>
    </Dialog>
  )
}
