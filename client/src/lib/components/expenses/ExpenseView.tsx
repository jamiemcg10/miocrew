import { Expense } from '@/lib/types'
import Popup from '../Popup'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import { TripContext } from '@/lib/utils/TripContext'
import { useContext } from 'react'
import { UserContext } from '@/lib/utils/UserContext'
import CrewAvatar from '../CrewAvatar'
import clsx from 'clsx'
import BoltIcon from '@mui/icons-material/Bolt'
import Tooltip from '@mui/material/Tooltip'
import { users } from '@/lib/utils/dummyData/users'

interface ExpenseViewProps {
  activeExpense: Expense | null
  onClose: () => void
}

export default function ExpenseView({ activeExpense, onClose }: ExpenseViewProps) {
  const user = useContext(UserContext)

  if (!activeExpense || !user) return

  return (
    <Popup open={!!activeExpense} onClose={() => onClose()}>
      <>
        <div className="flex text-2xl items-center space-x-2 font-bold">
          {activeExpense.due === 'immediate' ? (
            <Tooltip
              title="Pay now"
              slotProps={{
                popper: { modifiers: [{ name: 'offset', options: { offset: [12, -14] } }] }
              }}>
              <BoltIcon
                fontSize="large"
                sx={{ color: 'goldenrod', '.dark &': { color: 'yellow' }, ml: '-12px' }}
              />
            </Tooltip>
          ) : null}
          {activeExpense.name}
        </div>
        <div>{dateFormatter(activeExpense.date)}</div>
        <div>{activeExpense.notes}</div>
        <div className="mt-4 flex items-center">
          <span
            className="font-bold mr-1
          ">
            ${activeExpense.total.toLocaleString('en-US')}
          </span>
          <span className="mr-3">paid by</span>
          <CrewAvatar user={activeExpense.paidBy} size="xs" />
          <span className="ml-2">
            {activeExpense.paidBy.id === user.id
              ? 'you'
              : `${activeExpense.paidBy.firstName} ${activeExpense.paidBy.lastName}`}
          </span>
        </div>
        <div>{activeExpense?.split} split</div>

        <div
          className={clsx(
            activeExpense.settled ? 'mt-8 font-semibold text-lg italic tracking-wide' : 'hidden'
          )}>
          Settled
        </div>
        <div className={clsx(activeExpense.settled ? 'opacity-70' : 'mt-8')}>
          {Object.entries(activeExpense?.owe || {}).map(([id, owes]) => {
            return (
              <div key={id} className="flex items-center my-2">
                <CrewAvatar user={users[id]} size="xs" />
                <span className="ml-2 mr-1">
                  {id === user.id
                    ? 'You'
                    : `${users[id].firstName} ${users[id].lastName.charAt(0)}.`}
                </span>
                <span className={clsx(!owes.paid && 'text-red-700 font-semibold')}>
                  {owes.paid ? 'paid' : id === user.id ? 'owe' : 'owes'} $
                  {owes.owes.toLocaleString('en-US')}
                </span>
              </div>
            )
          })}
        </div>
      </>
    </Popup>
  )
}
