import { getImage } from '@/lib/components/tasks/TaskItem'
import { Expense, Task } from '@/lib/types'
import { expenses, tasks } from '@/lib/utils/dummyData'
import { UserContext } from '@/lib/utils/UserContext'
import { useContext } from 'react'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import BoltIcon from '@mui/icons-material/Bolt'
import BalanceText from '@/lib/components/expenses/utils/BalanceText'
import CrewAvatar from '@/lib/components/CrewAvatar'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded'
import TableRow from '@/lib/components/layout/TableRow'

export default function ActionItems() {
  const user = useContext(UserContext)

  if (!user) return

  function isTask(item: Task | Expense): item is Task {
    return item.hasOwnProperty('type')
  }

  function getItem(item: Expense | Task) {
    return (
      <TableRow classes="justify-between px-2 flex items-center " key={item.id} onClick={() => {}}>
        {isTask(item) && item.type ? (
          <>
            <span className="pr-4 inline-flex items-center text-lg font-semibold gap-2 basis-2/3">
              {getImage(item.type)}
              {item.name}
            </span>
            <span className="shrink-0">
              Due <span className="font-semibold">{dateFormatter(item.dueDate)}</span>
            </span>
          </>
        ) : (
          <>
            <div className="text-lg font-semibold inline-flex gap-2 basis-2/3">
              <MonetizationOnRoundedIcon />
              {item.name}
              <BoltIcon
                sx={{
                  color: 'goldenrod',
                  '.dark &': { color: 'yellow' }
                }}
              />
            </div>
            <div className="flex items-center font-semibold h-[3.125rem] flex-wrap">
              <BalanceText expense={item} userId={user?.id} />
              <span className="ml-2">{' to '}</span>
              <div className="flex items-center w-1/5 shrink-0 grow justify-end ml-2">
                <CrewAvatar user={item.paidBy} size="xs" />
                <span className="mx-2 text-sm whitespace-nowrap">
                  {item.paidBy.firstName} {item.paidBy.lastName.charAt(0)}.
                </span>
              </div>
            </div>
          </>
        )}
      </TableRow>
    )
  }

  const actionItems = [
    ...tasks.filter((t) => {
      return (t.assignee === 'Everyone' || t.assignee.id === user.id) && !t.completed
    }),
    ...expenses.filter((e) => {
      return e.due === 'immediate' && e.owe[user.id] && !e.owe[user.id].paid
    })
  ]

  console.log({ actionItems })

  return (
    <>
      <div className="text-xl font-bold mb-4">Action items</div>
      {actionItems ? (
        <div>
          {actionItems.map((item) => {
            return getItem(item)
          })}
        </div>
      ) : (
        <div>You have no action items right now</div>
      )}
    </>
  )
}
