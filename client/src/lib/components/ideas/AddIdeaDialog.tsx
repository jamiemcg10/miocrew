import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { ChangeEvent, Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import Dialog from '../Dialog'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'
import { assignAppColor } from '@/lib/utils/assignAppColor'

interface AddIdeaDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddIdeaDialog({ open, setOpen }: AddIdeaDialogProps) {
  function onChangeCostType(e: ChangeEvent<HTMLInputElement>) {
    setCostType(e.target.value)

    if (costTypeError) {
      setCostTypeError('')
    }
  }

  function addIdea() {
    if (!nameRef.current?.value) return

    // if cost, must have costType
    if (costRef.current?.value && !costType) {
      setCostTypeError('Must select type of cost')
      return
    }

    const payload = {
      trip_id: trip?.id,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      color: assignAppColor(),
      likes: 0,
      creator_id: user?.id,
      url: linkRef.current?.value,
      img: null, // TODO: get image from link
      cost: costRef.current?.value ? +costRef.current.value : null,
      cost_type: costType
    }

    // TODO: Show new idea upon creation
    axios
      .post(`http://localhost:8000/user/${user?.id}/trip/${trip?.id}/create_idea`, payload, {
        withCredentials: true
      })
      .catch((e) => {
        console.error('Error adding idea', e.response.data.detail[0], e)
      })
      .finally(() => {
        setOpen(false)
      })
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const linkRef = useRef<HTMLInputElement | null>(null)
  const costRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)

  const [costType, setCostType] = useState('')
  const [costTypeError, setCostTypeError] = useState('')

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add Idea</DialogTitle>
      <div className="flex flex-col m-10 mt-5">
        <TextField label="Name" required inputRef={nameRef} />
        <TextField label="Link" sx={{ my: 2 }} size="small" inputRef={linkRef} />
        <div className="inline-flex">
          <TextField
            label="Cost"
            size="small"
            inputRef={costRef}
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">$</InputAdornment> }
            }}
            sx={{ width: 100, mr: 2 }}
          />
          <FormControl error={!!costTypeError}>
            <RadioGroup row onChange={onChangeCostType}>
              <FormControlLabel label="Each" value="each" control={<Radio size="small" />} />
              <FormControlLabel label="Total" value="total" control={<Radio size="small" />} />
            </RadioGroup>
            <FormHelperText sx={{ position: 'absolute', ml: 0, bottom: '-8px' }}>
              {costTypeError}
            </FormHelperText>
          </FormControl>
        </div>
        <TextField
          label="Description"
          inputRef={descriptionRef}
          multiline
          rows={3}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ fontWeight: 700, mt: 5 }} type="submit" onClick={addIdea}>
          Add Idea
        </Button>
      </div>
    </Dialog>
  )
}
