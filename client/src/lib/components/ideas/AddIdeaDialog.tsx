import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction } from 'react'
import Dialog from '../Dialog'

interface AddIdeaDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddIdeaDialog({ open, setOpen }: AddIdeaDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Idea</DialogTitle>
      <form className="flex flex-col m-10 mt-5">
        <TextField label="Name" required />
        <TextField label="Link" sx={{ my: 2 }} />
        <TextField label="Description" multiline rows={3} />
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }}>
          Add Idea
        </Button>
      </form>
    </Dialog>
  )
}
