import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction } from 'react'
import Dialog from '../Dialog'

interface CreateTaskDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddExpenseDialog({ open, setOpen }: CreateTaskDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Create new task</DialogTitle>
      <form className="flex flex-col m-10">
        <TextField label="Name" required sx={{ mb: 2 }} />
        <TextField label="Description" multiline rows={3} sx={{ mb: 2 }} />

        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }}>
          Create Expense
        </Button>
      </form>
    </Dialog>
  )
}
