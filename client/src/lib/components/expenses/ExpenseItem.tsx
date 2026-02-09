import { Expense } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import BalanceText from './utils/BalanceText'
import BoltIcon from '@mui/icons-material/Bolt'
import CrewAvatar from '../CrewAvatar'
import { Dispatch, SetStateAction, useContext } from 'react'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import TableRow from '../layout/TableRow'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded'

interface ExpenseItemProps {
  expense: Expense
  setActiveExpense: Dispatch<SetStateAction<Expense | null>>
  isActionItem?: boolean
}

const boltIconSx = {
  color: 'goldenrod',
  '.dark &': { color: 'yellow' }
}

const moneyIconSx = { mr: 1 }

export default function ExpenseItem({ expense, setActiveExpense, isActionItem }: ExpenseItemProps) {
  function PaidBy() {
    return (
      <>
        {' '}
        <CrewAvatar user={expense.paidBy} size="xs" />
        <div className="mx-2 text-sm whitespace-nowrap">
          {expense.paidBy.firstName} {expense.paidBy.lastName.charAt(0)}.
        </div>
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
      <div
        className={
          'w-1/4 sm:w-1/5 min-w-13 text-sm shrink-0 mr-6 @xs:mr-4 ' +
          (isActionItem ? ' hidden' : '')
        }>
        {dateFormatter(expense.date)}
      </div>
      <div className={'flex grow flex-wrap gap-y-1.5 ' + (isActionItem ? 'flex-row' : 'flex-col')}>
        <div className="flex flex-col @xs:flex-row items-center grow shrink-0 flex-wrap gap-y-1">
          <div className="self-start pr-2 grow shrink-0">
            {isActionItem && <MonetizationOnRoundedIcon sx={moneyIconSx} />}
            {expense.name}
            {expense.due === 'immediate' ? <BoltIcon sx={boltIconSx} /> : null}
          </div>
          {!isActionItem && (
            <div className="flex items-center grow shrink-0 self-start @xs:justify-end">
              <PaidBy />
            </div>
          )}
        </div>
        <div
          className={
            'flex items-center shrink-0 grow whitespace-nowrap' +
            (isActionItem ? ' text-end justify-end' : '')
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
