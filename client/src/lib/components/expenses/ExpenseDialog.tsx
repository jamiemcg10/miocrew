import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ChangeEvent,
  useEffect,
  useReducer,
  useRef
} from 'react'
import Dialog from '../Dialog'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import CrewAvatar from '../CrewAvatar'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import BoltIcon from '@mui/icons-material/Bolt'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import clsx from 'clsx'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { addExpense, ExpensePayload } from '@/db'
import { Expense, isExpense } from '@/lib/types'
import { CalendarDate, parseDate } from '@internationalized/date'
import { expenseReducer, initialExpenseState } from '@/lib/utils/reducers/expenseReducer'
import { dialogTitleSx, mb2Sx } from '@/lib/styles/sx'
import { useSubmitOnEnter } from '@/lib/utils/useSubmitOnEnter'
import DateInput from '../inputs/DateInput'
import NumberInput from '../inputs/NumberInput'
import { futureDatesUnavailable } from '@/lib/utils/isDateUnavailable'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

interface ExpenseDialogProps {
  open: boolean | Expense
  setOpen: Dispatch<SetStateAction<boolean | Expense>>
}

const boltIconSx = { ml: -1, mr: -0.5, color: 'goldenrod', '.dark &': { color: 'yellow' } }
const addExpenseBtnSx = { fontWeight: 700, mt: 2 }
const requestImmediatelySx = { ml: 0 }
const splitExpenseSx = { ml: 1.5, mt: 0.5 }
const checkboxSx = { padding: 0.75, '& .MuiSvgIcon-root': { fontSize: 16 } }

export default function ExpenseDialog({ open, setOpen }: ExpenseDialogProps) {
  const trip = useContext(TripContext)
  const { user } = useContext(UserContext)

  function handleSplitChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'split', value: e.target.value })
  }

  function onChangeImmediately(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'immediately', value: e.target.checked })
  }

  function getExpensePayload() {
    const payload = {
      trip_id: trip?.id,
      name: state.name.value,
      paid_by_id: user?.id,
      total:
        state.split.value === 'Evenly'
          ? state.total.value
          : attendeesWithRefs.reduce((acc, c) => {
              acc += c.amount
              return acc
            }, 0),
      split: state.split.value,
      settled: false,
      due: state.immediately.value ? 'immediate' : 'end',
      date: state.date.value,
      notes: state.notes.value
    } as ExpensePayload

    if (isExpense(open)) {
      payload.id = open.id
    }

    return payload
  }

  function getDebtorsPayload() {
    if (state.split.value === 'Evenly') {
      const involvedCrew = attendeesWithRefs.filter((a) => a.checked)
      return involvedCrew.map((a) => {
        return {
          user_id: a.attendeeId,
          owes: state.total.value / involvedCrew.length,
          paid: user?.id === a.attendeeId
        }
      })
    } else {
      return attendeesWithRefs.map((a) => {
        return {
          user_id: a.id,
          owes: a.amount,
          paid: user?.id === a.attendeeId
        }
      })
    }
  }

  async function saveExpense() {
    if (!user || !trip) return

    const expensesPayload = getExpensePayload()
    const debtorsPayload = getDebtorsPayload()

    addExpense({
      userId: user.id,
      tripId: trip.id,
      data: { expense: expensesPayload, debtors: debtorsPayload }
    })
      .catch((e) => console.error(`Error ${isExpense(open) ? 'editing' : 'adding'} expense`, e))
      .finally(() => {
        setOpen(false)
      })
  }

  function handleBulkToggle() {
    if (!atLeastSomeChecked) {
      attendeesWithRefs.forEach((a) => a.setChecked(true))
    } else {
      attendeesWithRefs.forEach((a) => a.setChecked(false))
    }
  }

  const [state, dispatch] = useReducer(expenseReducer, initialExpenseState)
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const attendeesWithRefs = Object.values(trip?.attendees || {}).map((a) => {
    const aOpen = isExpense(open) ? open['owe'][a.attendeeId] : undefined

    const [checked, setChecked] = useState(isExpense(open) ? !!aOpen?.owes : true)
    const [amount, setAmount] = useState(aOpen?.owes || 0)

    return {
      ...a,
      checked,
      setChecked,
      amount,
      setAmount
    }
  })

  const atLeastSomeChecked = attendeesWithRefs.some((a) => a.checked)
  const allChecked = attendeesWithRefs.every((a) => a.checked)

  const valid = !!(
    state.name.value &&
    state.date.value &&
    ((state.split.value === 'Evenly' &&
      atLeastSomeChecked &&
      state.total.value &&
      state.total.valid) ||
      (state.split.value === 'Custom' && attendeesWithRefs.some((a) => a.amount > 0)))
  )

  useSubmitOnEnter(() => submitBtnRef.current!.click(), valid)

  useEffect(() => {
    if (!trip || !user) return

    dispatch({ type: 'set-expense', value: isExpense(open) ? open : undefined })
  }, [open])

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={dialogTitleSx}>{isExpense(open) ? 'Edit' : 'Add new'} expense</DialogTitle>
      <div className="flex flex-col m-10 mt-4 pt-1 overflow-y-hidden">
        <TextField
          label="Name"
          required
          autoFocus={isExpense(open) ? false : true}
          sx={mb2Sx}
          size="small"
          value={state.name.value}
          error={!state.name.valid}
          onChange={(e) => {
            dispatch({ type: 'name', value: e.target.value })
          }}
        />
        <TextField
          label="Notes"
          multiline
          rows={1}
          sx={mb2Sx}
          size="small"
          value={state.notes.value}
          onChange={(e) => {
            dispatch({ type: 'notes', value: e.target.value })
          }}
        />
        <DateInput
          className="w-3/5 mb-2"
          label="Date"
          variant="bordered"
          size="sm"
          value={state.date.value ? (parseDate(state.date.value) as CalendarDate) : null}
          isRequired
          isInvalid={!state.date.valid}
          showMonthAndYearPickers
          isDateUnavailable={futureDatesUnavailable}
          onChange={(e) => {
            if (!e) return

            dispatch({ type: 'date', value: e.toString() })
          }}
          errorMessage={(value) => {
            if (value.isInvalid) {
              return 'Please enter a valid date.'
            }
          }}
        />
        <FormControl sx={splitExpenseSx}>
          <FormLabel id="expense-split-label">Split expense</FormLabel>
          <RadioGroup
            row
            aria-labelledby="expense-split-label"
            value={state.split.value}
            onChange={handleSplitChange}
            defaultValue="Evenly"
            name="radio-buttons-group">
            <FormControlLabel value="Evenly" control={<Radio size="small" />} label="Evenly" />
            <NumberInput
              ariaLabel="total-cost"
              size="sm"
              hideStepper
              placeholder="$0.00"
              formatOptions={{
                style: 'currency',
                currency: 'USD'
              }}
              defaultValue={isExpense(open) ? open.total : undefined}
              isDisabled={state.split.value === 'Custom'}
              isInvalid={state.split.value === 'Evenly' && !state.total.valid}
              onValueChange={(v) => {
                dispatch({ type: 'total', value: v })
              }}
              classNames={{
                base: clsx('w-20 place-self-center -ml-2 mr-4'),
                inputWrapper: 'h-9'
              }}
            />
            <FormControlLabel value="Custom" control={<Radio size="small" />} label="Custom" />
          </RadioGroup>
        </FormControl>
        {state.split.value === 'Evenly' ? (
          <div className="-mb-6 w-fit border-b-1 border-b-foreground-500">
            <Checkbox
              id="bulk-toggle"
              size="small"
              sx={checkboxSx}
              checked={atLeastSomeChecked}
              checkedIcon={allChecked ? <CheckBoxIcon /> : <IndeterminateCheckBoxOutlinedIcon />}
              onClick={handleBulkToggle}
            />
          </div>
        ) : null}
        <table className="vertical-scroll flex my-4 overflow-y-scroll">
          <tbody>
            {attendeesWithRefs.map((a) => {
              return (
                <tr key={a.id} className="items-center border-y-4 border-transparent">
                  <td
                    className={clsx(
                      'w-4 transform-opacity',
                      state.split.value === 'Custom'
                        ? 'opacity-0 pointer-events-none'
                        : 'opacity-100'
                    )}>
                    <Checkbox
                      id={a.id}
                      size="small"
                      sx={checkboxSx}
                      checked={a.checked}
                      onClick={() => {
                        a.setChecked(!a.checked)
                      }}
                    />
                  </td>
                  <td className="w-6 pl-1">
                    <CrewAvatar user={a} size="xs" baseClasses="mr-2 ml-1.75" />
                  </td>
                  <td className="w-45">
                    <div className="text-sm">
                      {a.firstName} {a.lastName}
                    </div>
                  </td>
                  <td
                    className={clsx(
                      'transform-opacity',
                      state.split.value === 'Evenly' ? 'opacity-0' : 'opacity-100'
                    )}>
                    <NumberInput
                      ariaLabel={`${a.firstName}-share`}
                      size="sm"
                      hideStepper
                      placeholder="$0.00"
                      formatOptions={{
                        style: 'currency',
                        currency: 'USD'
                      }}
                      classNames={{ base: 'w-20', inputWrapper: 'h-9 py-2' }}
                      onValueChange={(v) => a.setAmount(v)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <FormControlLabel
          sx={requestImmediatelySx}
          label={
            <div>
              <BoltIcon sx={boltIconSx} /> <span>Request immediately</span>
            </div>
          }
          control={
            <Checkbox
              size="small"
              checked={state.immediately.value}
              onChange={onChangeImmediately}
            />
          }
        />
        <Button
          variant="contained"
          startIcon={<AttachMoneyIcon />}
          ref={submitBtnRef}
          onClick={saveExpense}
          disabled={!valid}
          sx={addExpenseBtnSx}>
          Save Expense
        </Button>
      </div>
    </Dialog>
  )
}
