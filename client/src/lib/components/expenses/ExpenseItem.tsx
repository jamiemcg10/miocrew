import { Expense } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import BalanceText from './utils/BalanceText'
import BoltIcon from '@mui/icons-material/Bolt'
import CrewAvatar from '../CrewAvatar'
import { Dispatch, SetStateAction, useContext } from 'react'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import TableRow from '../layout/TableRow'

interface ExpenseItemProps {
  expense: Expense
  setActiveExpense: Dispatch<SetStateAction<Expense | null>>
  isActionItem?: boolean
}

const boltIconSx = {
  color: 'goldenrod',
  '.dark &': { color: 'yellow' }
}

export default function ExpenseItem({ expense, setActiveExpense, isActionItem }: ExpenseItemProps) {
  function PaidBy() {
    return (
      <>
        {' '}
        <CrewAvatar user={expense.paidBy} size="xs" />
        <span className="mx-2 text-sm whitespace-nowrap">
          {expense.paidBy.firstName} {expense.paidBy.lastName.charAt(0)}.
        </span>
      </>
    )
  }

  function onClick() {
    setActiveExpense(expense)
  }

  const { user } = useContext(UserContext)

  if (!user) return

  return (
    <TableRow onClick={onClick}>
      <div className={'w-1/4 sm:w-1/5 text-sm shrink-0 mr-2' + (isActionItem && ' hidden')}>
        {dateFormatter(expense.date)}
      </div>
      <div className="flex flex-col sm:flex-row grow">
        <div className="flex items-center grow">
          <div className="pr-2 grow">
            {expense.name}
            {expense.due === 'immediate' ? <BoltIcon sx={boltIconSx} /> : null}
          </div>
          {!isActionItem && (
            <div className="flex items-center w-1/3 shrink-0 justify-end sm:justify-start">
              <PaidBy />
            </div>
          )}
        </div>
        <div
          className={
            'flex items-center w-1/4 shrink-0 whitespace-nowrap mr-4' +
            (isActionItem && ' text-end')
          }>
          <BalanceText expense={expense} userId={user?.id} />{' '}
          {isActionItem && (
            <>
              <span className="ml-1 mr-2">to</span> <PaidBy />
            </>
          )}
        </div>
      </div>
    </TableRow>
  )
}
