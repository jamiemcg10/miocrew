import { Dispatch, SetStateAction, useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import { Expense, User } from '@/lib/types'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ExpenseView from './ExpenseView'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import CrewAvatar from '../CrewAvatar'
import Reimbursements from './utils/Reimbursements'
import ExpenseItem from './ExpenseItem'

interface ExpensesProps {
  expenses: Expense[]
  setAddDialogOpen: Dispatch<SetStateAction<boolean | Expense>>
}

const addExpenseBtnSx = {
  mb: '24px',
  alignSelf: 'end',
  width: 'initial',
  fontWeight: 600
}

const chipSx = { pl: '8px' }

export default function Expenses({ expenses, setAddDialogOpen }: ExpensesProps) {
  const trip = useContext(TripContext)
  const { user } = useContext(UserContext)
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
    const _filteredExpenses = expenses
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
      !updatedFilters.length && !updatedCrewFilter?.length ? expenses : _filteredExpenses
    )
  }

  function onClickAddButton() {
    setAddDialogOpen(true)
  }

  const [filteredExpenses, setFilteredExpenses] = useState(expenses)
  const [filters, setFilters] = useState<string[]>([])
  const [crewFilter, setCrewFilter] = useState<string | null>(null)
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null)

  if (!attendees || !user) return

  useEffect(() => {
    setFilteredExpenses(expenses)
  }, [expenses])

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AttachMoneyIcon />}
        sx={addExpenseBtnSx}
        onClick={onClickAddButton}>
        Add Expense
      </Button>
      <div className="@container flex grow flex-wrap-reverse items-end mt-auto overflow-hidden">
        <div className="grow w-[654px] flex flex-col h-full relative @max-[890px]:h-2/3">
          <div className="w-full h-2 absolute bottom-0  bg-linear-to-t from-(--background) to-transparent"></div>
          <div className="flex flex-wrap mb-8 font-semibold space-x-2! space-y-2! sm:space-x-1! sm:space-y-1!">
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
                  sx={chipSx}
                  onClick={() => handleCrewFilterClick(a.id)}
                />
              )
            })}
          </div>
          <div className="vertical-scroll pr-0 sm:pr-4 overflow-y-scroll">
            {filteredExpenses.length ? (
              <div className="w-full">
                <div className="h-10 sticky -top-1 z-1 py-1 bg-linear-to-b from-(--background) from-80% to-transparent">
                  <div className="flex font-semibold tracking-wide">
                    <div className="w-1/4 sm:w-1/5 pl-2">Date</div>
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
        <Reimbursements expenses={expenses} />
      </div>
      <ExpenseView
        activeExpense={activeExpense}
        onClose={() => setActiveExpense(null)}
        onEdit={() => {
          if (!activeExpense) return

          setAddDialogOpen(activeExpense)
          setActiveExpense(null)
        }}
      />
    </>
  )
}
