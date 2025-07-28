import { Expense, Task } from '@/lib/types'
import { expenses, tasks } from '@/lib/utils/dummyData'
import { UserContext } from '@/lib/utils/UserContext'
import { useContext, useState } from 'react'
import TaskView from '@/lib/components/tasks/TaskView'
import ExpenseView from '@/lib/components/expenses/ExpenseView'
import ActionItem from './ActionItem'

export default function ActionItems() {
  const user = useContext(UserContext)

  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null)

  function onCloseTaskView() {
    setActiveTask(null)
  }

  function onCloseExpenseView() {
    setActiveExpense(null)
  }

  if (!user) return

  const actionItems = [
    ...tasks.filter((t) => {
      return (t.assignee === 'Everyone' || t.assignee.id === user.id) && !t.completed
    }),
    ...expenses.filter((e) => {
      return e.due === 'immediate' && e.owe[user.id] && !e.owe[user.id].paid
    })
  ]

  return (
    <>
      <div className="text-xl font-bold my-4">Action items</div>
      {actionItems ? (
        <div>
          {actionItems.map((item) => {
            return (
              <ActionItem
                item={item}
                key={item.id}
                setActiveTask={setActiveTask}
                setActiveExpense={setActiveExpense}
                userId={user.id}
              />
            )
          })}
        </div>
      ) : (
        <div>You have no action items right now</div>
      )}
      <TaskView activeTask={activeTask} onClose={onCloseTaskView} />
      <ExpenseView activeExpense={activeExpense} onClose={onCloseExpenseView} />
    </>
  )
}
