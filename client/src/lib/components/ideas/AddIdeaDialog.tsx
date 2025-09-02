import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
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
import { assignAppColor } from '@/lib/utils/colors/assignColor'
import { Idea } from '@/lib/types'

interface AddIdeaDialogProps {
  open: boolean | Idea
  setOpen: Dispatch<SetStateAction<boolean | Idea>>
}

export default function AddIdeaDialog({ open, setOpen }: AddIdeaDialogProps) {
  function onChangeCostType(e: ChangeEvent<HTMLInputElement>) {
    setCostType(e.target.value)

    if (costTypeError) {
      setCostTypeError('')
    }
  }

  function valuesAreUnchanged() {
    if (
      isIdea(open) &&
      open.name === nameRef.current?.value &&
      open.description === descriptionRef.current?.value &&
      open.url === urlRef.current?.value &&
      open.cost == costRef.current?.value &&
      open.costType === costType
    ) {
      return true
    }

    return false
  }

  function getPayload() {
    return {
      trip_id: trip?.id,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      color: isIdea(open) ? open.color : assignAppColor(),
      likes: isIdea(open) ? open.likes : 0,
      creator_id: user?.id,
      url: urlRef.current?.value,
      img: null, // TODO: get image from url
      cost: costRef.current?.value ? +costRef.current?.value : null,
      cost_type: costRef.current?.value ? costType : null
    } as Partial<Idea>
  }

  function saveIdea() {
    if (!nameRef.current?.value) return

    // if cost, must have costType
    if (costRef.current?.value && !costType) {
      setCostTypeError('Must select type of cost')
      return
    }

    if (valuesAreUnchanged()) {
      setOpen(false)
      return
    }

    const payload = getPayload()

    if (isIdea(open)) {
      payload.id = open.id
    }

    const requestUrl = isIdea(open)
      ? `http://localhost:8000/user/${user?.id}/trip/${trip?.id}/idea/update`
      : `http://localhost:8000/user/${user?.id}/trip/${trip?.id}/ideas/create`

    axios({
      method: isIdea(open) ? 'patch' : 'post',
      url: requestUrl,
      data: payload,
      withCredentials: true
    })
      .catch((e) => {
        console.error(`Error ${isIdea(open) ? 'editing' : 'adding'} idea`, e)
      })
      .finally(() => {
        setOpen(false)
      })
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const urlRef = useRef<HTMLInputElement | null>(null)
  const costRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)

  const [costType, setCostType] = useState<string | null>(null)
  const [costTypeError, setCostTypeError] = useState('')

  function isIdea(open: boolean | Idea): open is Idea {
    return typeof open !== 'boolean'
  }

  function getDefaultValue(prop: keyof Idea) {
    if (!isIdea(open)) return undefined

    return open[prop] ? open[prop] : undefined
  }

  useEffect(() => {
    const value = getDefaultValue('costType')
    setCostType(typeof value === 'string' ? value : null)
  }, [open])

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>{isIdea(open) ? 'Edit' : 'Add'} Idea</DialogTitle>
      <div className="flex flex-col m-10 mt-5">
        <TextField
          label="Name"
          required
          inputRef={nameRef}
          defaultValue={getDefaultValue('name')}
        />
        <TextField
          label="Link"
          sx={{ my: 2 }}
          size="small"
          inputRef={urlRef}
          defaultValue={getDefaultValue('url')}
        />
        <div className="inline-flex">
          <TextField
            label="Cost"
            size="small"
            inputRef={costRef}
            defaultValue={getDefaultValue('cost')}
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">$</InputAdornment> }
            }}
            sx={{ width: 100, mr: 2 }}
          />
          <FormControl error={!!costTypeError}>
            <RadioGroup row onChange={onChangeCostType} value={costType}>
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
          defaultValue={getDefaultValue('description')}
          multiline
          rows={3}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          sx={{ fontWeight: 700, mt: 5 }}
          type="submit"
          onClick={saveIdea}>
          Save Idea
        </Button>
      </div>
    </Dialog>
  )
}
