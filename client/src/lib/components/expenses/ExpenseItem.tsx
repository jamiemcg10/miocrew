import { Expense } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import BalanceText from './utils/BalanceText'
import BoltIcon from '@mui/icons-material/Bolt'
import CrewAvatar from '../CrewAvatar'
import { Dispatch, SetStateAction, useContext } from 'react'
import { UserContext } from '@/lib/utils/UserContext'
import TableRow from '../layout/TableRow'

interface ExpenseItemProps {
  expense: Expense
  setActiveExpense: Dispatch<SetStateAction<Expense | null>>
}

export default function ExpenseItem({ expense, setActiveExpense }: ExpenseItemProps) {
  function onClick() {
    setActiveExpense(expense)
  }

  const user = useContext(UserContext)

  if (!user) return

  return (
    <TableRow classes="py-1" onClick={onClick}>
      <div className="w-1/4 sm:w-1/5 text-sm shrink-0 mr-2">{dateFormatter(expense.date)}</div>
      <div className="flex flex-col sm:flex-row grow">
        <div className="flex items-center grow">
          <div className="pr-2 grow">
            {expense.name}
            {expense.due === 'immediate' ? (
              <BoltIcon
                sx={{
                  color: 'goldenrod',
                  '.dark &': { color: 'yellow' }
                }}
              />
            ) : null}
          </div>
          <div className="flex items-center w-1/3 shrink-0 justify-end sm:justify-start">
            <CrewAvatar user={expense.paidBy} size="xs" />
            <span className="mx-2 text-sm whitespace-nowrap">
              {expense.paidBy.firstName} {expense.paidBy.lastName.charAt(0)}.
            </span>
          </div>
        </div>
        <div className="w-1/4 shrink-0 whitespace-nowrap">
          <BalanceText expense={expense} userId={user?.id} />
        </div>
      </div>
    </TableRow>
  )
}
