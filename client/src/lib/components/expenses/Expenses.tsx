import '../../styles/VerticalScroll.css'
import { Dispatch, SetStateAction, useState, useContext } from 'react'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { expenses } from '@/lib/utils/dummyData'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import { Expense, User } from '@/lib/types'
import { TripContext } from '@/lib/utils/TripContext'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ExpenseView from './ExpenseView'
import { UserContext } from '@/lib/utils/UserContext'
import CrewAvatar from '../CrewAvatar'
import Reimbursements from './utils/Reimbursements'
import ExpenseItem from './ExpenseItem'

interface TasksProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>
}

export default function Expenses({ setOpenAddDialog }: TasksProps) {
  const trip = useContext(TripContext)
  const user = useContext(UserContext)
  const attendees = trip?.attendees

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
    const _filteredExpenses = tripExpenses
      .filter((expense) =>
        updatedFilters.includes('Unsettled') ? !expense.owe[user!.id]?.paid : true
      )
      .filter((expense) =>
        updatedFilters.includes('Settled')
          ? expense.settled || (expense.owe[user!.id]?.paid && expense.paidBy.id !== user!.id)
          : true
      )
      .filter((expense) => (updatedCrewFilter ? expense.paidBy.id === updatedCrewFilter : true))

    setFilteredExpenses(
      !updatedFilters.length && !updatedCrewFilter?.length ? tripExpenses : _filteredExpenses
    )
  }

  const tripExpenses = expenses.filter((expense) => expense.tripId === trip?.id)
  const [filteredExpenses, setFilteredExpenses] = useState(tripExpenses)
  const [filters, setFilters] = useState<string[]>([])
  const [crewFilter, setCrewFilter] = useState<string | null>(null)
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null)

  if (!attendees || !user) return

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
      <div className="@container flex grow flex-wrap-reverse overflow-hidden">
        <div className="grow w-[654px] flex flex-col h-full relative @max-[890px]:h-2/3">
          <div className="w-full h-2 absolute bottom-0  bg-linear-to-t from-(--background) to-transparent"></div>
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
            {Object.values(attendees)?.map((a: User, i) => {
              return (
                <Chip
                  label={`${a.firstName} ${a.lastName.charAt(0)}.`}
                  avatar={<CrewAvatar user={a} size="xs" baseClasses="-mr-1" />}
                  key={i}
                  variant={crewFilter === a.id ? 'filled' : 'outlined'}
                  sx={{ pl: '8px' }}
                  onClick={() => handleCrewFilterClick(a.id)}
                />
              )
            })}
          </div>
          <div className="pr-0 sm:pr-4 overflow-y-scroll">
            {filteredExpenses.length ? (
              <div className="w-full">
                <div className="h-10 sticky -top-1 z-1 py-1 bg-linear-to-b from-(--background) from-80% to-transparent">
                  <div className="flex">
                    <div className="w-1/4 sm:w-1/5">Date</div>
                    <div className="flex flex-col sm:flex-row grow">
                      <div className="flex grow">
                        <div className="grow px-2">Expense</div>
                        <div className="w-1/3 justify-end sm:justify-start text-right sm:text-left">
                          Paid by
                        </div>
                      </div>
                      <div className="w-0 sm:w-1/4"></div>
                    </div>
                  </div>
                </div>
                <div>
                  {filteredExpenses.map((expense) => {
                    return (
                      <ExpenseItem
                        expense={expense}
                        setActiveExpense={setActiveExpense}
                        key={expense.id}
                      />
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>There are no expenses or no expenses that match the current filters.</div>
            )}
          </div>
        </div>
        <Reimbursements expenses={tripExpenses} />
      </div>
      <ExpenseView activeExpense={activeExpense} onClose={() => setActiveExpense(null)} />
    </>
  )
}
