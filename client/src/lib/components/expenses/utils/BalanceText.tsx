import { Expense } from '@/lib/types'

interface BalanceTextProps {
  expense: Expense
  userId?: string
}

export default function BalanceText({ expense, userId }: BalanceTextProps) {
  const { owe, total, paidBy, settled } = expense
  const mutedCostStyles = 'text-zinc-800 dark:text-zinc-500 italic text-sm'

  if (settled) {
    return <div className={mutedCostStyles}>Settled</div>
  } else if (!userId || !owe[userId]) {
    return <div className={mutedCostStyles}>Not involved</div>
  } else if (paidBy !== userId) {
    return (
      <div>
        You <span className="text-red-700">owe ${owe[userId]}</span>
      </div>
    )
  } else {
    return (
      <div>
        You <span className="text-green-700">lent ${(total - owe[userId]).toFixed(2)}</span>
      </div>
    )
  }
}
