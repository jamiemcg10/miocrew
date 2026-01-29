import { Expense } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext } from 'react'
import VerticalScrollShadow from '../../layout/VerticalScrollShadow'

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
  return expenses.reduce(
    (p, exp) => {
      Object.entries(exp.owe).forEach(([id, cost]) => {
        p[id] = {
          total: (p[id]?.total || 0) + (!cost.paid ? cost.owes : 0),
          firstName: cost.firstName,
          lastName: cost.lastName
        }
      })

      return p
    },
    {} as Record<string, TotalOwed>
  )
}

function formatReimbursements(reimbursements: Record<string, TotalOwed>, userId?: string) {
  return Object.entries(reimbursements).map(([id, amt]) => {
    return (
      <div key={id} className="text-sm">
        {id === userId ? 'You' : `${amt.firstName} ${amt.lastName.charAt(0)}.`}{' '}
        <span className="text-red-700">
          {id === userId ? 'owe' : 'owes'} ${(+amt.total.toFixed(2)).toLocaleString('en-US')}
        </span>
      </div>
    )
  })
}

export default function Reimbursements({ expenses }: ReimbursementsProps) {
  const { user } = useContext(UserContext)

  const reimbursements = calculateReimbursements(expenses)
  return (
    <div className="flex flex-col @max-[890px]:h-1/4 @max-[890px]:grow">
      <div className="text-xl -mb-1 pl-2 sticky top-0">Who owes what</div>
      <VerticalScrollShadow>
        <>
          <div>{formatReimbursements(reimbursements, user?.id)}</div>
        </>
      </VerticalScrollShadow>
    </div>
  )
}
