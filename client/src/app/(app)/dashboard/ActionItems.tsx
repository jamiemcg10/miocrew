import { Expense, Task } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext, useEffect, useState } from 'react'
import TaskView from '@/lib/components/tasks/TaskView'
import ExpenseView from '@/lib/components/expenses/ExpenseView'
import ActionItem from './ActionItem'
import { getActionItems } from '@/db'
import CreateTaskDialog from '@/lib/components/tasks/CreateTaskDialog'
import AddExpenseDialog from '@/lib/components/expenses/AddExpenseDialog'

export default function ActionItems() {
  function formatActionItems() {
    setActionItems([
      ...tasks.filter((t) => {
        return (t.assigneeId === 'Everyone' || t.assigneeId === user?.id) && !t.completed
      }),
      ...expenses.filter((e) => {
        return e.due === 'immediate' && user?.id && e.owe[user.id]?.paid === false
      })
    ])
  }
  const user = useContext(UserContext)

  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [actionItems, setActionItems] = useState<(Expense | Task)[]>([])

  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState<boolean | Expense>(false)
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState<boolean | Task>(false)

  function onCloseTaskView() {
    setActiveTask(null)
  }

  function onCloseExpenseView() {
    setActiveExpense(null)
  }

  useEffect(() => {
    if (!user) return

    getActionItems({ userId: user.id })
      .then((response) => {
        if (response.data.expenses) {
          setExpenses(response.data.expenses)
        }
        if (response.data.tasks) {
          setTasks(response.data.tasks)
        }
      })
      .catch((e) => console.error('Error fetching action items', e))
  }, [])

  useEffect(formatActionItems, [expenses, tasks])

  if (!user) return

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
      <TaskView
        activeTask={activeTask}
        onClose={onCloseTaskView}
        onEdit={() => {
          if (!activeTask) return
          setCreateTaskDialogOpen(activeTask)
          setActiveTask(null)
        }}
      />
      <ExpenseView
        activeExpense={activeExpense}
        onClose={onCloseExpenseView}
        onEdit={() => {
          if (!activeExpense) return

          setAddExpenseDialogOpen(activeExpense)
          setActiveExpense(null)
        }}
      />

      <CreateTaskDialog open={createTaskDialogOpen} setOpen={setCreateTaskDialogOpen} />
      <AddExpenseDialog open={addExpenseDialogOpen} setOpen={setAddExpenseDialogOpen} />
    </>
  )
}
