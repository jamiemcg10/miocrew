import '../../styles/VerticalScroll.css'
import { Dispatch, SetStateAction, useState, useContext } from 'react'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { expenses } from '@/lib/utils/dummyData'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import Avatar from '@mui/material/Avatar'
import { Expense, User } from '@/lib/types'
import { TripContext } from '@/lib/utils/TripContext'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ExpenseView from './ExpenseView'
import { dateFormatter } from '@/lib/utils/dateFormatter'

interface TasksProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>
}

export default function Expenses({ setOpenAddDialog }: TasksProps) {
  const trip = useContext(TripContext)

  function handleBasicFilterClick(value: string) {
    const updatedFilters = filters.includes(value)
      ? filters.filter((f) => f !== value)
      : [...filters, value]
    setFilters(updatedFilters)

    filterExpenses({ updatedFilters })
  }

  function handleCrewFilterClick(value: string) {
    const updatedCrewFilter = crewFilter === value ? null : value
    setCrewFilter(updatedCrewFilter)

    filterExpenses({ updatedCrewFilter })
  }

  function filterExpenses({ updatedFilters = filters, updatedCrewFilter = crewFilter }) {
    const _filteredExpenses = expenses
      .filter((expense) => (updatedFilters.includes('Unsettled') ? !expense.settled : true))
      .filter((expense) => (updatedFilters.includes('Settled') ? expense.settled : true))

    setFilteredExpenses(
      !updatedFilters.length && !updatedCrewFilter?.length ? expenses : _filteredExpenses
    )
  }

  const [filteredExpenses, setFilteredExpenses] = useState(expenses)
  const [filters, setFilters] = useState<string[]>([])
  const [crewFilter, setCrewFilter] = useState<string | null>(null)
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null)

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AttachMoneyIcon />}
        sx={{
          mb: '24px',
          alignSelf: 'end',
          width: 'initial',
          fontWeight: 600
        }}
        onClick={() => setOpenAddDialog(true)}>
        Add Expense
      </Button>
      <div className="flex grow">
        <div className="grow">
          <div className="flex flex-wrap mb-8 space-x-2! space-y-2! sm:space-x-1! sm:space-y-1!">
            <Chip
              label="Paid"
              icon={<CheckBoxOutlineBlankRoundedIcon />}
              variant={filters.includes('Settled') ? 'filled' : 'outlined'}
              onClick={() => handleBasicFilterClick('Settled')}
            />
            <Chip
              label="Unpaid"
              icon={<CheckBoxRoundedIcon />}
              variant={filters.includes('Unsettled') ? 'filled' : 'outlined'}
              onClick={() => handleBasicFilterClick('Unsettled')}
            />
            {trip?.attendees?.map((a: User, i) => {
              return (
                <Chip
                  label={a.firstName}
                  avatar={
                    <Avatar alt={a.firstName} sx={{ backgroundColor: a.color }}>
                      {a.firstName.charAt(0)}
                      {a.lastName.charAt(0)}
                    </Avatar>
                  }
                  key={i}
                  variant={crewFilter === a.id ? 'filled' : 'outlined'}
                  onClick={() => handleCrewFilterClick(a.id)}
                />
              )
            })}
          </div>
          <div className="pr-4">
            {filteredExpenses.length ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="w-1/5">Date</td>
                    <td>Expense</td>
                    <td>Paid by</td>
                    <td className="w-1/3"></td>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => {
                    return (
                      <tr
                        key={expense.id}
                        className="h-[3.125rem] border border-transparent border-b-gray-300">
                        <td className="w-1/5">{dateFormatter(expense.date)}</td>
                        <td>{expense.name}</td>
                        <td>{expense.paidBy}</td>
                        <td className="w-1/3">You owe $</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div>There are no expenses or no expenses that match the current filters.</div>
            )}
          </div>
        </div>
        <div className="h-full min-w-50 border border-transparent border-l-(--foreground) pl-4">
          Who owes what
        </div>
      </div>
      <ExpenseView activeExpense={activeExpense} onClose={() => setActiveExpense(null)} />
    </>
  )
}
