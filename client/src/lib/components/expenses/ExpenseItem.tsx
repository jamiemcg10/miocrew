import { Expense } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import BalanceText from './utils/BalanceText'
import BoltIcon from '@mui/icons-material/Bolt'
import CrewAvatar from '../CrewAvatar'
import { Dispatch, SetStateAction, useContext } from 'react'
import { UserContext } from '@/lib/utils/UserContext'

interface ExpenseItemProps {
  expense: Expense
  setActiveExpense: Dispatch<SetStateAction<Expense | null>>
}

export default function ExpenseItem({ expense, setActiveExpense }: ExpenseItemProps) {
  const user = useContext(UserContext)

  if (!user) return

  return (
    <div
      className="flex justify-between items-center h-[3.125rem] cursor-pointer border border-transparent border-b-gray-300 transition-colors hover:bg-black/10 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/5"
      onClick={() => setActiveExpense(expense)}>
      <div className="w-1/5 text-sm shrink-0">{dateFormatter(expense.date)}</div>
      <div className="px-2 grow">
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
      <div className="flex items-center h-[3.125rem] w-1/5 shrink-0">
        <CrewAvatar user={expense.paidBy} size="xs" />
        <span className="mx-2 text-sm whitespace-nowrap">
          {expense.paidBy.firstName} {expense.paidBy.lastName.charAt(0)}.
        </span>
      </div>
      <div className="w-1/4 shrink-0">
        <BalanceText expense={expense} userId={user?.id} />
      </div>
    </div>
  )
}
