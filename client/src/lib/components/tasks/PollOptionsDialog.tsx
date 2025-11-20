import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { PollTaskOption } from '@/lib/types'

interface PollOptionsDialogProps {
  question: string
  options: PollTaskOption[]
  onChangeQuestion: (v: string) => void
  onChangeOptions: (v: PollTaskOption[]) => void
}

export default function PollOptionsDialog({
  question,
  options,
  onChangeQuestion,
  onChangeOptions
}: PollOptionsDialogProps) {
  function addOption() {
    onChangeOptions([...options, { label: '' }])
  }

  return (
    <>
      <TextField
        label="Poll Question"
        size="small"
        sx={{ mb: 2 }}
        value={question}
        required
        onChange={(e) => {
          onChangeQuestion(e.target.value)
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
                  onChangeOptions([...options])
                }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  const newOptions = options.filter((_, j) => {
                    return j !== i
                  })
                  onChangeOptions(newOptions)
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
