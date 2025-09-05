import { Expense } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext } from 'react'

interface ReimbursementsProps {
  expenses: Expense[]
}

interface TotalOwed {
  total: number
  firstName: string
  lastName: string
}

function calculateReimbursements(expenses: Expense[]) {
  // TODO: Simplify this
  return expenses.reduce((p, exp) => {
    Object.entries(exp.owe).forEach(([id, cost]) => {
      p[id] = {
        total: (p[id]?.total || 0) + (!cost.paid ? cost.owes : 0),
        firstName: cost.firstName,
        lastName: cost.lastName
      }
    })

    return p
  }, {} as Record<string, TotalOwed>)
}

function formatReimbursements(reimbursements: Record<string, TotalOwed>, userId?: string) {
  return Object.entries(reimbursements).map(([id, amt]) => {
    return (
      <div key={id}>
        {id === userId ? 'You' : `${amt.firstName} ${amt.lastName.charAt(0)}.`}{' '}
        <span className="text-red-700">
          {id === userId ? 'owe' : 'owes'} ${(+amt.total.toFixed(2)).toLocaleString('en-US')}
        </span>
      </div>
    )
  })
}

export default function Reimbursements({ expenses }: ReimbursementsProps) {
  const user = useContext(UserContext)

  const reimbursements = calculateReimbursements(expenses)
  return (
    <div className="relative  @max-[890px]:h-1/4 @max-[890px]:grow">
      <div className="min-w-50 h-full mb-8 border border-transparent border-l-(--foreground) pl-4 overflow-y-scroll">
        <div className="text-2xl mb-2 sticky top-0  bg-linear-to-b from-(--background) from-80% to-transparent">
          Who owes what
        </div>
        <div>{formatReimbursements(reimbursements, user?.id)}</div>
      </div>
      <div className="h-2 absolute bottom-0 w-full bg-linear-to-t from-(--background) to-transparent"></div>
    </div>
  )
}
