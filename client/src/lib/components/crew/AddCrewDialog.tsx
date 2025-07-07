import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction } from 'react'
import Dialog from '../Dialog'
import { dummyEmails } from '@/lib/utils/dummyData'
import Autocomplete from '@mui/material/Autocomplete'

interface AddCrewDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddCrewDialog({ open, setOpen }: AddCrewDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Crew Members</DialogTitle>
      <form className="flex flex-col m-10 mt-5">
        <div>
          <Autocomplete
            id="add-crew"
            options={dummyEmails}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.email)}
            multiple
            freeSolo
            sx={{
              '.MuiInputBase-root': { alignItems: 'flex-start' }
            }}
            filterOptions={(options, params) => {
              const filtered = options.filter((option) =>
                option.email.toLowerCase().includes(params.inputValue.toLowerCase())
              )
              if (
                params.inputValue !== '' &&
                !options.some((option) => option.email === params.inputValue)
              ) {
                filtered.push({ id: '', email: params.inputValue, type: 'user' })
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
                sx={{
                  width: '100%',
                  placeItems: 'flex-start',
                  alignItems: 'flex-start!important'
                }}
              />
            )}
          />
        </div>
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }}>
          Add Crew Members
        </Button>
      </form>
    </Dialog>
  )
}
