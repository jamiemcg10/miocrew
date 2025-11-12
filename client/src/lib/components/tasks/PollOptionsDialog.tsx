import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { PollTaskOption } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

interface PollOptionsDialogProps {
  question: string
  setQuestion: Dispatch<SetStateAction<string>>
  options: PollTaskOption[]
  setOptions: Dispatch<SetStateAction<PollTaskOption[]>>
}

export default function PollOptionsDialog({
  question,
  setQuestion,
  options,
  setOptions
}: PollOptionsDialogProps) {
  function addOption() {
    setOptions([...options, { label: '' }])
  }

  return (
    <>
      <TextField
        label="Poll Question"
        size="small"
        sx={{ mb: 2 }}
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value)
        }}
      />
      <div className="flex flex-col space-y-2">
        {options.map((opt, i) => {
          return (
            <div className="flex items-center" key={i}>
              <TextField
                label={`Option ${i + 1}`}
                value={opt.label}
                size="small"
                sx={{ mr: 4 }}
                onChange={(e) => {
                  options[i].label = e.target.value
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
      <Button
        startIcon={<AddRoundedIcon />}
        sx={{ my: 2, width: 'fit-content' }}
        onClick={addOption}>
        Add Option
      </Button>
    </>
  )
}
