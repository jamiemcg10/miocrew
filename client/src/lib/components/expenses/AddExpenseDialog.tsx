import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ChangeEvent,
  useRef,
  useEffect
} from 'react'
import Dialog from '../Dialog'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import CrewAvatar from '../CrewAvatar'
import { NumberInput } from '@heroui/number-input'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import BoltIcon from '@mui/icons-material/Bolt'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import clsx from 'clsx'
import { DatePicker } from '@heroui/date-picker'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { addExpense, ExpensePayload } from '@/db'
import { Expense, isExpense } from '@/lib/types'
import { CalendarDate, parseDate } from '@internationalized/date'

interface AddExpenseDialogProps {
  open: boolean | Expense
  setOpen: Dispatch<SetStateAction<boolean | Expense>>
}

export default function AddExpenseDialog({ open, setOpen }: AddExpenseDialogProps) {
  const trip = useContext(TripContext)
  const user = useContext(UserContext)

  function handleTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setTypeValue((e.target as HTMLInputElement).value as Expense['split'])
  }

  function onChangeImmediate(e: ChangeEvent<HTMLInputElement>) {
    setImmediately(e.target.checked)
  }

  function getDefaultValue(prop: keyof Expense) {
    if (!isExpense(open)) return undefined

    if (prop === 'date') {
      const [date, _time] = open['date'].split('T')
      return date ? parseDate(date) : undefined
    }

    return open[prop]
  }

  function getExpensePayload() {
    const payload = {
      trip_id: trip?.id,
      name: nameRef.current?.value,
      paid_by_id: user?.id,
      total:
        typeValue === 'Evenly'
          ? total
          : attendeesWithRefs.reduce((acc, c) => {
              acc += c.amount
              return acc
            }, 0),
      split: typeValue,
      settled: false,
      due: immediately ? 'immediate' : 'end',
      date: dateRef.current?.value,
      notes: notesRef.current?.value
    } as ExpensePayload

    if (isExpense(open)) {
      payload.id = open.id
    }

    return payload
  }

  function getDebtorsPayload() {
    if (typeValue === 'Evenly') {
      const involvedCrew = attendeesWithRefs.filter((a) => a.checked)
      return involvedCrew.map((a) => {
        return {
          user_id: a.id,
          owes: total / involvedCrew.length,
          paid: user?.id === a.id
        }
      })
    } else {
      return attendeesWithRefs.map((a) => {
        return {
          user_id: a.id,
          owes: a.amount,
          paid: user?.id === a.id
        }
      })
    }
  }

  async function saveExpense() {
    if (!nameRef.current?.value) {
      setNameInvalid(true)
    }

    if (!dateRef.current?.value) {
      setDateInvalid(true)
    }

    if (typeValue === 'Evenly' && total <= 0) {
      setTotalInvalid(true)
    }

    if (!nameRef.current?.value || !dateRef.current?.value) return

    // TODO: also return if no costs assigned
    if (
      (typeValue === 'Evenly' && total <= 0) ||
      (typeValue === 'Custom' && !attendeesWithRefs.some((a) => a.amount > 0))
    ) {
      return
    }

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

  const [nameInvalid, setNameInvalid] = useState(false)
  const [dateInvalid, setDateInvalid] = useState(false)
  const [totalInvalid, setTotalInvalid] = useState(false)

  const [typeValue, setTypeValue] = useState((isExpense(open) && open['split']) || 'Evenly')
  const [immediately, setImmediately] = useState(
    (isExpense(open) && open['due'] === 'immediate') || false
  )
  const [total, setTotal] = useState(isExpense(open) ? open.total : 0)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const notesRef = useRef<HTMLInputElement | null>(null)
  const dateRef = useRef<HTMLInputElement | null>(null)

  const attendeesWithRefs = Object.values(trip?.attendees || {}).map((a) => {
    const aOpen = isExpense(open) ? open['owe'][a.id] : undefined

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

  useEffect(() => {
    setTotal(isExpense(open) ? open.total : 0)
  }, [open])

  return (
    <Dialog open={!!open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>{isExpense(open) ? 'Edit' : 'Add'} expense</DialogTitle>
      <div className="flex flex-col m-10 mt-4">
        <TextField
          label="Name"
          required
          sx={{ mb: 2 }}
          size="small"
          defaultValue={getDefaultValue('name')}
          inputRef={nameRef}
          error={nameInvalid}
          onChange={(e) => {
            if (nameInvalid && e.target.value) {
              setNameInvalid(false)
            }
          }}
        />
        <TextField
          label="Notes"
          multiline
          rows={1}
          sx={{ mb: 2 }}
          size="small"
          defaultValue={getDefaultValue('notes')}
          inputRef={notesRef}
        />
        <DatePicker
          className="w-3/5 mb-2"
          label="Date"
          variant="bordered"
          size="sm"
          inputRef={dateRef}
          isRequired
          isInvalid={dateInvalid}
          defaultValue={getDefaultValue('date') as CalendarDate}
          classNames={{
            label: 'group-data-[required=true]:after:text-inherit',
            inputWrapper: 'group-data-[invalid=true]:focus-within:border-danger',
            segment: 'data-[invalid=true]:data-[editable=true]:data-[placeholder=true]:text-danger'
          }}
          errorMessage={(value) => {
            if (value.isInvalid) {
              return 'Please enter a valid date.'
            }
          }}
          onChange={() => {
            setDateInvalid(false)
          }}
        />
        <FormControl>
          <FormLabel id="expense-split-type-label">Split expense</FormLabel>
          <RadioGroup
            row
            aria-labelledby="expense-split-type-label"
            value={typeValue}
            onChange={handleTypeChange}
            defaultValue="Evenly"
            name="radio-buttons-group">
            <FormControlLabel value="Evenly" control={<Radio />} label="Evenly" />
            <NumberInput
              aria-label="total-cost"
              size="sm"
              hideStepper
              placeholder="$0.00"
              formatOptions={{
                style: 'currency',
                currency: 'USD'
              }}
              defaultValue={isExpense(open) ? open.total : undefined}
              isDisabled={typeValue === 'Custom'}
              isInvalid={totalInvalid}
              onValueChange={(v) => {
                if (totalInvalid) {
                  setTotalInvalid(false)
                }

                setTotal(v)
              }}
              classNames={{
                base: clsx('w-20 place-self-center -ml-3 mr-4'),
                inputWrapper: 'h-9'
              }}
            />
            <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
        <table className="my-4">
          <tbody>
            {attendeesWithRefs.map((a) => {
              return (
                <tr key={a.id} className="items-center border-y-6 border-transparent">
                  <td
                    className={clsx(
                      'w-4 transform-opacity',
                      typeValue === 'Custom' ? 'opacity-0' : 'opacity-100'
                    )}>
                    <Checkbox
                      size="small"
                      checked={a.checked}
                      onClick={() => {
                        a.setChecked(!a.checked)
                      }}
                    />
                  </td>
                  <td className="w-8">
                    <CrewAvatar user={a} size="sm" />
                  </td>
                  <td className="w-50">
                    <div>
                      {a.firstName} {a.lastName}
                    </div>
                  </td>
                  <td
                    className={clsx(
                      'transform-opacity',
                      typeValue === 'Evenly' ? 'opacity-0' : 'opacity-100'
                    )}>
                    <NumberInput
                      aria-label={`${a.firstName}-share`}
                      size="sm"
                      hideStepper
                      placeholder="$0.00"
                      formatOptions={{
                        style: 'currency',
                        currency: 'USD'
                      }}
                      classNames={{ base: 'w-20', inputWrapper: 'h-9' }}
                      onValueChange={(v) => a.setAmount(v)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <FormControlLabel
          label={
            <div>
              <BoltIcon
                sx={{ ml: -1, mr: -0.5, color: 'goldenrod', '.dark &': { color: 'yellow' } }}
              />{' '}
              <span>Request immediately</span>
            </div>
          }
          control={<Checkbox checked={immediately} onChange={onChangeImmediate} />}
        />
        <Button
          variant="contained"
          startIcon={<AttachMoneyIcon />}
          onClick={saveExpense}
          sx={{ fontWeight: 700, mt: 5 }}>
          Save Expense
        </Button>
      </div>
    </Dialog>
  )
}
