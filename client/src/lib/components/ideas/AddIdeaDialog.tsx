import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction } from 'react'
import Dialog from '../Dialog'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import InputAdornment from '@mui/material/InputAdornment'
import { dialogTitleSx } from '@/lib/styles/sx'

interface AddIdeaDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const costInputSx = { width: 100, mr: 2 }
const linkInputSx = { my: 2 }
const costInputSlotProps = {
  input: { startAdornment: <InputAdornment position="start">$</InputAdornment> }
}
const descInputSx = { mt: 2 }
const addIdeaBtnSx = { fontWeight: 700, mt: 5 }

export default function AddIdeaDialog({ open, setOpen }: AddIdeaDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={dialogTitleSx}>Add Idea</DialogTitle>
      <form className="flex flex-col m-10 mt-5">
        <TextField label="Name" required />
        <TextField label="Link" sx={linkInputSx} size="small" />
        <div className="inline-flex">
          <TextField label="Cost" slotProps={costInputSlotProps} sx={costInputSx} size="small" />
          <RadioGroup row>
            <FormControlLabel label="Each" value="each" control={<Radio size="small" />} />
            <FormControlLabel label="Total" value="total" control={<Radio size="small" />} />
          </RadioGroup>
        </div>
        <TextField label="Description" multiline rows={3} sx={descInputSx} />
        <Button variant="contained" sx={addIdeaBtnSx}>
          Add Idea
        </Button>
      </form>
    </Dialog>
  )
}
