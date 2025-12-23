import '@/lib/styles/VerticalScroll.css'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { dummyEmails } from '@/lib/utils/dummyData'
import DateInput from '@/lib/components/DateInput'

const fieldStyles = {
  width: '100%',
  '.MuiInputBase-root.Mui-focused:hover fieldset': { borderColor: '#1976d2' },
  '.MuiInputBase-root:hover fieldset': { borderColor: 'rgba(0,0,0,0.49)' },
  '.dark & .MuiInputBase-root:hover fieldset': { borderColor: 'rgba(255,255,255,1)' },
  '.dark & .MuiInputBase-root.Mui-focused:hover fieldset': {
    borderColor: 'var(--lt-blue)'
  }
}

const createTripButtonSx = {
  marginTop: '3rem',
  padding: '12px',
  fontWeight: 600,
  width: '100%',
  alignSelf: 'end',
  '@media (min-width: 640px)': {
    marginTop: '2rem',
    width: 'auto'
  }
}

export default function TripForm() {
  return (
    <>
      <div>
        <TextField variant="outlined" label="Trip name" sx={fieldStyles} required />
      </div>
      <div>
        <TextField variant="outlined" label="Trip location" sx={fieldStyles} />
      </div>
      <div className="flex justify-between">
        <DateInput className="w-2/5" label="Start date" variant="bordered" size="sm" />
        <span className="self-center italic text-gray-500">to</span>
        <DateInput className="w-2/5" label="End date" variant="bordered" size="sm" />
      </div>
      <div>
        <TextField variant="outlined" label="Description" multiline rows={4} sx={fieldStyles} />
      </div>
      <div>
        <Autocomplete
          id="add-crew"
          options={dummyEmails}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.email)}
          multiple
          freeSolo
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
              minRows={2}
              maxRows={3}
              sx={fieldStyles}
            />
          )}
        />
      </div>
      <Button variant="contained" sx={createTripButtonSx}>
        Create trip
      </Button>
    </>
  )
}
