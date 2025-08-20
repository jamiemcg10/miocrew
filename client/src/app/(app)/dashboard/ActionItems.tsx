import { Expense, Task } from '@/lib/types'
import { tasks } from '@/lib/utils/dummyData'
import { UserContext } from '@/lib/utils/UserContext'
import { useContext, useEffect, useState } from 'react'
import TaskView from '@/lib/components/tasks/TaskView'
import ExpenseView from '@/lib/components/expenses/ExpenseView'
import ActionItem from './ActionItem'
import axios from 'axios'

export default function ActionItems() {
  async function getItems() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/action_items`)
      .then((response) => {
        console.log({ response })
        if (response.data.expenses) {
          setExpenses(response.data.expenses)
        }
      })
      .catch(console.error)
  }

  function formatActionItems() {
    setActionItems([
      ...tasks.filter((t) => {
        return (t.assignee === 'Everyone' || t.assignee.id === user?.id) && !t.completed
      }),
      ...expenses.filter((e) => {
        return e.due === 'immediate' && e.owe.find((u) => u.id === user?.id)?.paid == false
      })
    ])
  }
  const user = useContext(UserContext)

  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [actionItems, setActionItems] = useState<(Expense | Task)[]>([])

  function onCloseTaskView() {
    setActiveTask(null)
  }

  function onCloseExpenseView() {
    setActiveExpense(null)
  }

  if (!user) return

  useEffect(() => {
    getItems()
  }, [])

  useEffect(formatActionItems, [expenses, tasks])

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
