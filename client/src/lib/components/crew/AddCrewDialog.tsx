import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction } from 'react'
import Dialog from '../Dialog'
import { users } from '@/lib/utils/dummyData'
import Autocomplete from '@mui/material/Autocomplete'

interface AddCrewDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const userEmails = Object.values(users).map((u) => u.email)

export default function AddCrewDialog({ open, setOpen }: AddCrewDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Crew Members</DialogTitle>
      <form className="flex flex-col m-10 mt-5">
        <div>
          <Autocomplete
            id="add-crew"
            options={userEmails}
            multiple
            freeSolo
            sx={{
              '.MuiInputBase-root': { alignItems: 'flex-start' }
            }}
            filterOptions={(emails, params) => {
              const filtered = emails.filter((email) =>
                email.toLowerCase().includes(params.inputValue.toLowerCase())
              )
              if (
                params.inputValue !== '' &&
                !emails.some((email) => email === params.inputValue)
              ) {
                filtered.push(params.inputValue)
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
