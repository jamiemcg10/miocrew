import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useState, ChangeEvent, useRef } from 'react'
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
import axios from 'axios'

interface AddExpenseDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddExpenseDialog({ open, setOpen }: AddExpenseDialogProps) {
  const trip = useContext(TripContext)
  const user = useContext(UserContext)

  function handleTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setTypeValue((e.target as HTMLInputElement).value)
  }

  function onChangeImmediate(e: ChangeEvent<HTMLInputElement>) {
    setImmediately(e.target.checked)
  }

  function getExpensesPayload() {
    const payload = {
      trip_id: trip?.id,
      name: nameRef.current?.value,
      paid_by_id: user?.id,
      total: total,
      split: typeValue,
      settled: false,
      due: immediately ? 'immediate' : 'end',
      date: dateRef.current?.value,
      notes: notesRef.current?.value
    }

    return payload
  }

  function getExpensesOwePayload() {
    if (typeValue === 'Evenly') {
      const involvedCrew = attendeesWithRefs.filter((a) => a.checked)
      return involvedCrew.map((a) => {
        return {
          // add id and expense_id on backend
          user_id: a.id,
          owes: total / involvedCrew.length,
          paid: user?.id === a.id
        }
      })
    } else {
      return attendeesWithRefs.map((a) => {
        return {
          // add id and expense_id on backend
          user_id: a.id,
          owes: a.amount,
          paid: false
        }
      })
    }
  }

  function saveExpense() {
    if (!nameRef.current?.value) {
      setNameInvalid(true)
    }

    if (!dateRef.current?.value) {
      setDateInvalid(true)
    }

    if (!nameRef.current?.value || !dateRef.current?.value) return

    // TODO: also return if no costs assigned
    if (
      (typeValue === 'Evenly' && total <= 0) ||
      (typeValue === 'Custom' && !attendeesWithRefs.some((a) => a.amount > 0))
    ) {
      return
    }

    const expensesPayload = getExpensesPayload()
    const expensesOwePayload = getExpensesOwePayload()

    const requestUrl = `http://localhost:8000/user/${user?.id}/trip/${trip?.id}/expenses/create`

    axios({
      method: 'post',
      url: requestUrl,
      data: { expense: expensesPayload, debtors: expensesOwePayload },
      withCredentials: true
    })
      .catch((e) => console.error(`Error adding expense`, e))
      .finally(() => {
        setOpen(false)
      })
  }

  const [nameInvalid, setNameInvalid] = useState(false)
  const [dateInvalid, setDateInvalid] = useState(false)
  const [typeValue, setTypeValue] = useState('Evenly')
  const [immediately, setImmediately] = useState(false)
  const [total, setTotal] = useState(0)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const notesRef = useRef<HTMLInputElement | null>(null)
  const dateRef = useRef<HTMLInputElement | null>(null)

  const attendeesWithRefs = Object.values(trip?.attendees || {}).map((a) => {
    const [checked, setChecked] = useState(true)
    const [amount, setAmount] = useState(0)

    return {
      ...a,
      checked,
      setChecked,
      amount,
      setAmount
    }
  })

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add expense</DialogTitle>
      <div className="flex flex-col m-10 mt-4">
        <TextField
          label="Name"
          required
          sx={{ mb: 2 }}
          size="small"
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
              isDisabled={typeValue === 'Custom'}
              onValueChange={(v) => setTotal(v)}
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
                    <Checkbox size="small" checked={a.checked} />
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
          Add Expense
        </Button>
      </div>
    </Dialog>
  )
}
