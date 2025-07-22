import { Expense } from '@/lib/types'
import clsx from 'clsx'

interface BalanceTextProps {
  expense: Expense
  userId?: string
}

export default function BalanceText({ expense, userId }: BalanceTextProps) {
  const { owe, paidBy, settled } = expense

  const mutedCostStyles = 'text-zinc-800 dark:text-zinc-500 italic text-sm'
  const paid = userId && owe[userId]?.paid

  const amountLent = Object.values(owe).reduce((p, owes) => {
    p += !owes.paid ? owes.owes : 0
    return p
  }, 0)

  if (settled) {
    return <div className={mutedCostStyles}>Settled</div>
  } else if (!userId || !owe[userId]) {
    return <div className={mutedCostStyles}>Not involved</div>
  } else if (paidBy !== userId) {
    return (
      <div>
        You{' '}
        <span className={clsx(!paid && 'text-red-700')}>
          owe ${paid ? 0 : owe[userId].owes.toLocaleString('en-US')}
        </span>
      </div>
    )
  } else {
    return (
      <div>
        You{' '}
        <span className="text-green-700">
          lent ${(+amountLent.toFixed(2)).toLocaleString('en-US')}
        </span>
      </div>
    )
  }
}
