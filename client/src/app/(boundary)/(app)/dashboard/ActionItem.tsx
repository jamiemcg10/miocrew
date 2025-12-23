import TableRow from '@/lib/components/layout/TableRow'
import { getImage } from '@/lib/components/tasks/TaskItem'
import { Expense, Task } from '@/lib/types'
import { dateFormatter } from '@/lib/utils/dateFormatter'
import BoltIcon from '@mui/icons-material/Bolt'
import BalanceText from '@/lib/components/expenses/utils/BalanceText'
import CrewAvatar from '@/lib/components/CrewAvatar'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded'
import { SetStateAction, Dispatch } from 'react'

interface ActionItemProps {
  item: Expense | Task
  userId: string
  setActiveTask: Dispatch<SetStateAction<Task | null>>
  setActiveExpense: Dispatch<SetStateAction<Expense | null>>
}

function isTask(item: Task | Expense): item is Task {
  return item.hasOwnProperty('type')
}

const boltIconSx = {
  color: 'goldenrod',
  '.dark &': { color: 'yellow' }
}

export default function ActionItem({
  item,
  userId,
  setActiveTask,
  setActiveExpense
}: ActionItemProps) {
  function onClick() {
    if (isTask(item) && item.type) {
      setActiveTask(item)
    } else {
      setActiveExpense(item)
    }
  }

  const paidByUser = !isTask(item) ? item.paidBy : undefined

  return (
    <TableRow classes="px-2" onClick={onClick}>
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
            <BoltIcon sx={boltIconSx} />
          </div>
          <div className="flex items-center font-semibold h-[3.125rem] flex-wrap">
            <BalanceText expense={item} userId={userId} />
            <span className="ml-2">{' to '}</span>
            <div className="flex items-center w-1/5 shrink-0 grow justify-end ml-2">
              <CrewAvatar user={paidByUser} size="xs" />
              <span className="mx-2 text-sm whitespace-nowrap">
                {paidByUser?.firstName} {paidByUser?.lastName.charAt(0)}.
              </span>
            </div>
          </div>
        </>
      )}
    </TableRow>
  )
}
