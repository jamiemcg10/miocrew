import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import Dialog from '../Dialog'
import { TripContext } from '@/lib/utils/TripContext'
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

interface AddExpenseDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddExpenseDialog({ open, setOpen }: AddExpenseDialogProps) {
  const trip = useContext(TripContext)

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTypeValue((e.target as HTMLInputElement).value)
  }

  const [typeValue, setTypeValue] = useState('Evenly')

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTitle sx={{ fontWeight: 700 }}>Add expense</DialogTitle>
      <form className="flex flex-col m-10 mt-8">
        <TextField label="Name" required sx={{ mb: 2 }} size="small" />
        <TextField label="Description" multiline rows={1} sx={{ mb: 2 }} size="small" />
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
            <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
        <table className="my-4">
          <tbody>
            {trip
              ? Object.values(trip.attendees).map((a) => {
                  return (
                    <tr key={a.id} className="items-center border-y-6 border-transparent">
                      <td
                        className={clsx(
                          'w-4 transform-opacity',
                          typeValue === 'Custom' ? 'opacity-0' : 'opacity-100'
                        )}>
                        <Checkbox size="small" />
                      </td>
                      <td className="w-8">
                        <CrewAvatar user={a} extraClasses="w-6 h-6" size="sm" />
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
                          size="sm"
                          hideStepper
                          placeholder="0.00"
                          formatOptions={{
                            style: 'currency',
                            currency: 'USD'
                          }}
                          classNames={{ base: 'w-20', inputWrapper: 'h-9' }}
                        />
                      </td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
        <FormControlLabel
          label={
            <div>
              <BoltIcon sx={{ ml: -1, mr: -0.5, color: 'yellow' }} />{' '}
              <span>Request immediately</span>
            </div>
          }
          control={<Checkbox />}
        />
        <Button variant="contained" startIcon={<AttachMoneyIcon />} sx={{ fontWeight: 700, mt: 5 }}>
          Add Expense
        </Button>
      </form>
    </Dialog>
  )
}
