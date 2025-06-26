'use client'

import '@/lib/styles/VerticalScroll.css'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Autocomplete from '@mui/material/Autocomplete'

const fieldStyles = { width: '100%' }

export default function TripForm() {
  const dummyOptions = [
    { id: '1', email: 'johnny.appleseed@gmail.com' },
    { id: '2', email: 'johnny.walker@gmail.com' },
    { id: '3', email: 'daniel.radcliffe@gmail.com' },
    { id: '4', email: 'emma.watson@gmail.com' },
    { id: '5', email: 'robin.hood@gmail.com' },
    { id: '6', email: 'katniss.everdeen@gmail.com' },
    { id: '7', email: 'cole.sprouse@gmail.com' }
  ]
  return (
    <>
      <div>
        <TextField variant="outlined" label="Trip name" sx={fieldStyles} />
      </div>
      <div>
        <TextField variant="outlined" label="Trip location" sx={fieldStyles} />
      </div>
      <div className="flex justify-between">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Start date" sx={{ width: '40%' }} />
        </LocalizationProvider>
        <span className="self-center italic text-gray-500">to</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="End date" sx={{ width: '40%' }} />
        </LocalizationProvider>
      </div>
      <div>
        <TextField variant="outlined" label="Description" multiline rows={4} sx={fieldStyles} />
      </div>
      <div>
        <Autocomplete
          id="add-crew"
          options={dummyOptions}
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
              filtered.push({ id: '', email: params.inputValue })
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
      <Button
        variant="contained"
        sx={{
          marginTop: '3rem',
          padding: '12px',
          fontWeight: 600,
          width: '100%',
          alignSelf: 'end',
          '@media (min-width: 640px)': {
            marginTop: '2rem',
            width: 'auto'
          }
        }}>
        Create trip
      </Button>
    </>
  )
}
