import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useRef } from 'react'
import Dialog from '../Dialog'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { assignAppColor } from '@/lib/utils/colors/assignColor'
import { Idea, isIdea } from '@/lib/types'
import { createIdea, updateIdea } from '@/db'
import { ideaReducer, initialIdeaState } from '@/lib/utils/reducers/ideaReducer'
import { dialogTitleSx } from '@/lib/styles/sx'
import { useSubmitOnEnter } from '@/lib/utils/useSubmitOnEnter'
import NumberInput from '../inputs/NumberInput'

interface IdeaDialogProps {
  open: boolean | Idea
  setOpen: Dispatch<SetStateAction<boolean | Idea>>
}

const linkInputSx = { my: 2 }
const descInputSx = { mt: 2 }
const addIdeaBtnSx = { fontWeight: 700, mt: 5 }
const costTypeHelperSx = { position: 'absolute', ml: 0, bottom: '-8px' }

export default function IdeaDialog({ open, setOpen }: IdeaDialogProps) {
  function valuesAreUnchanged() {
    // TODO: create this function for other pages
    if (
      isIdea(open) &&
      open.name === state.name.value &&
      open.description === state.description.value &&
      open.url === state.url.value &&
      open.cost == state.cost.value &&
      open.costType === state.costType.value
    ) {
      return true
    }

    return false
  }

  function getPayload() {
    const payload = {
      trip_id: trip?.id,
      name: state.name.value,
      description: state.description.value,
      color: isIdea(open) ? open.color : assignAppColor(),
      creator_id: user?.id,
      url: state.url.value,
      img: null, // TODO: get image from url
      cost: state.cost.value ? +state.cost.value : null,
      cost_type: state.costType.value || null
    } as Partial<Idea> // TODO: this type is incorrect

    if (isIdea(open)) {
      payload.id = open.id
    }

    return payload
  }

  function saveIdea() {
    if (!user || !trip) return

    // if cost, must have costType
    if (state.cost.value && !state.costType.value) {
      dispatch({ type: 'costType-invalid' })
      return
    }

    if (valuesAreUnchanged()) {
      setOpen(false)
      return
    }

    const taskArgs = {
      userId: user.id,
      tripId: trip?.id,
      data: getPayload()
    }

    if (isIdea(open)) {
      updateIdea(taskArgs)
        .catch((e) => console.error(`Error updating task`, e))
        .finally(() => setOpen(false))
    } else {
      createIdea(taskArgs)
        .catch((e) => console.error(`Error creating task`, e))
        .finally(() => setOpen(false))
    }
  }

  const { user } = useContext(UserContext)
  const trip = useContext(TripContext)

  const [state, dispatch] = useReducer(ideaReducer, initialIdeaState)
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const valid = !!state.name.value

  useSubmitOnEnter(() => submitBtnRef.current!.click(), valid)

  useEffect(() => {
    dispatch({ type: 'set-idea', value: isIdea(open) ? open : undefined })
  }, [open])

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={dialogTitleSx}>{isIdea(open) ? 'Edit' : 'Add new'} Idea</DialogTitle>
      <div className="flex flex-col m-10 mt-5">
        <TextField
          label="Name"
          required
          autoFocus={isIdea(open) ? false : true}
          value={state.name.value}
          error={!state.name.valid}
          onChange={(e) => dispatch({ type: 'name', value: e.target.value })}
        />
        <TextField
          label="Link"
          sx={linkInputSx}
          size="small"
          value={state.url.value}
          onChange={(e) => dispatch({ type: 'url', value: e.target.value })}
        />
        <div className="inline-flex items-center">
          <NumberInput
            label="Cost"
            size="sm"
            hideStepper
            variant="bordered"
            value={state.cost.value}
            startContent={<InputAdornment position="start">$</InputAdornment>}
            minValue={0}
            classNames={{ base: 'w-25 mr-4' }}
            formatOptions={{
              maximumFractionDigits: 2
            }}
            onValueChange={(value) => {
              dispatch({ type: 'cost', value })
            }}
          />
          <FormControl error={!state.costType.valid}>
            <RadioGroup
              row
              onChange={(e) => dispatch({ type: 'costType', value: e.target.value })}
              value={state.costType.value}>
              <FormControlLabel label="Each" value="each" control={<Radio size="small" />} />
              <FormControlLabel label="Total" value="total" control={<Radio size="small" />} />
            </RadioGroup>
            <FormHelperText sx={costTypeHelperSx}>
              {!state.costType.valid && 'Must select type of cost'}
            </FormHelperText>
          </FormControl>
        </div>
        <TextField
          label="Description"
          value={state.description.value}
          onChange={(e) => dispatch({ type: 'description', value: e.target.value })}
          multiline
          rows={3}
          sx={descInputSx}
        />
        <Button
          variant="contained"
          ref={submitBtnRef}
          sx={addIdeaBtnSx}
          id="submit-idea"
          type="submit"
          disabled={!valid}
          onClick={saveIdea}>
          Save Idea
        </Button>
      </div>
    </Dialog>
  )
}
