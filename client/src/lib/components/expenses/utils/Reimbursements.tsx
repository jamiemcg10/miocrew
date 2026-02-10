import { CrewMember, Expense } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext } from 'react'
import VerticalScrollShadow from '../../layout/VerticalScrollShadow'
import clsx from 'clsx'
import { TripContext } from '@/lib/utils/contexts/TripContext'

interface ReimbursementsProps {
  expenses: Expense[]
}

interface TotalOwed {
  total: number
  firstName: string
  lastName: string
}

function getCaculateReimbursementsAcc(attendees: CrewMember[]) {
  return attendees.reduce(
    (acc, c) => {
      acc[c.attendeeId] = { total: 0, firstName: c.firstName, lastName: c.lastName }
      return acc
    },
    {} as Record<string, TotalOwed>
  )
}

function calculateReimbursements(attendees: CrewMember[], expenses: Expense[]) {
  return expenses.reduce((acc, exp) => {
    Object.entries(exp.owe).forEach(([id, cost]) => {
      acc[id].total = acc[id].total + (!cost.paid ? cost.owes : 0)
    })

    return acc
  }, getCaculateReimbursementsAcc(attendees))
}

function formatReimbursements(reimbursements: Record<string, TotalOwed>, userId?: string) {
  return Object.entries(reimbursements).map(([id, amt]) => {
    return (
      <div key={id} className="text-sm">
        {id === userId ? 'You' : `${amt.firstName} ${amt.lastName.charAt(0)}.`}{' '}
        <span className={clsx(amt.total && 'text-red-700')}>
          {id === userId ? 'owe' : 'owes'} ${(+amt.total.toFixed(2)).toLocaleString('en-US')}
        </span>
      </div>
    )
  })
}

export default function Reimbursements({ expenses }: ReimbursementsProps) {
  const { user } = useContext(UserContext)
  const { trip } = useContext(TripContext)

  const attendees = Object.values(trip?.attendees || {})

  const reimbursements = calculateReimbursements(attendees, expenses)
  return (
    <div className="flex flex-col h-1/4 w-full">
      <div className="text-xl -mb-1 pl-2 sticky top-0">Who owes what</div>
      <VerticalScrollShadow>
        <>
          <div>{formatReimbursements(reimbursements, user?.id)}</div>
        </>
      </VerticalScrollShadow>
    </div>
  )
}
