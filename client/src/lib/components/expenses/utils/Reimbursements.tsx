import { CrewMember, Expense } from '@/lib/types'
import { TripContext } from '@/lib/utils/TripContext'
import { UserContext } from '@/lib/utils/UserContext'
import { useContext } from 'react'

interface ReimbursementsProps {
  expenses: Expense[]
}

function calculateReimbursements(expenses: Expense[]) {
  // TODO: Simplify this
  return expenses.reduce((p, exp) => {
    Object.entries(exp.owe).forEach(([id, cost]) => {
      p[id] = (p[id] || 0) + (!cost.paid ? cost.owes : 0)
    })

    return p
  }, {} as Record<string, number>)
}

function formatReimbursements(
  reimbursements: Record<string, number>,
  attendees?: Record<string, CrewMember>,
  userId?: string
) {
  if (!attendees) return

  return Object.entries(reimbursements).map(([id, amt]) => {
    return (
      <div key={id}>
        {id === userId ? 'You' : `${attendees[id].firstName} ${attendees[id].lastName.charAt(0)}.`}{' '}
        <span className="text-red-700">
          {id === userId ? 'owe' : 'owes'} ${amt.toFixed(2)}
        </span>
      </div>
    )
  })
}

export default function Reimbursements({ expenses }: ReimbursementsProps) {
  const trip = useContext(TripContext)
  const user = useContext(UserContext)

  const reimbursements = calculateReimbursements(expenses)
  return (
    <div className="min-w-50 mb-8 border border-transparent border-l-(--foreground) pl-4 @max-[890px]:h-1/4 @max-[890px]:grow ">
      <div className="text-2xl mb-2">Who owes what</div>
      <div>{formatReimbursements(reimbursements, trip?.attendees, user?.id)}</div>
    </div>
  )
}
