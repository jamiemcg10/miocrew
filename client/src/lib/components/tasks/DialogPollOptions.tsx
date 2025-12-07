import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { mb2Sx } from '@/lib/styles/sx'

const optTextFieldSx = { mr: 4 }
const addOptionBtnSx = { my: 2, width: 'fit-content' }

export default function DialogPollOptions() {
  function addOption() {
    setOptions([...options, ''])
  }

  const [options, setOptions] = useState<string[]>(['', ''])

  return (
    <>
      <TextField label="Poll Question" size="small" sx={mb2Sx} />
      <div className="flex flex-col space-y-2">
        {options.map((opt, i) => {
          return (
            <div className="flex items-center" key={i}>
              <TextField
                label={`Option ${i + 1}`}
                value={opt}
                size="small"
                sx={optTextFieldSx}
                onChange={(e) => {
                  options[i] = e.target.value
                  setOptions([...options])
                }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  const newOptions = options.filter((_, j) => {
                    return j !== i
                  })
                  setOptions(newOptions)
                }}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </div>
          )
        })}
      </div>
      <Button startIcon={<AddRoundedIcon />} sx={addOptionBtnSx} onClick={addOption}>
        Add Option
      </Button>
    </>
  )
}
