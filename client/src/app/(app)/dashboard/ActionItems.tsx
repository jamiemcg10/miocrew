import { Expense, Task } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { useContext, useEffect, useState } from 'react'
import TaskView from '@/lib/components/tasks/TaskView'
import ExpenseView from '@/lib/components/expenses/ExpenseView'
import ActionItem from './ActionItem'
import { getActionItems } from '@/db'
import TaskDialog from '@/lib/components/tasks/TaskDialog'
import ExpenseDialog from '@/lib/components/expenses/ExpenseDialog'
import { LocalStorage } from '@/lib/utils/LocalStorage'

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

  function fetchActionItems() {
    getActionItems({ userId: user!.id })
      .then((response) => {
        if (response.data.expenses) {
          setExpenses(response.data.expenses)
          LocalStorage.set('action-items:expenses', response.data.expenses)
        }
        if (response.data.tasks) {
          setTasks(response.data.tasks)
          LocalStorage.set('action-items:tasks', response.data.tasks)
        }
      })
      .catch((e) => console.error('Error fetching action items', e))
  }

  const user = useContext(UserContext)

  const storedActionItemsTasks = LocalStorage.get<Task[]>('action-items:tasks')
  const storedActionItemsExpenses = LocalStorage.get<Expense[]>('action-items:expenses')

  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>(storedActionItemsExpenses || [])
  const [tasks, setTasks] = useState<Task[]>(storedActionItemsTasks || [])
  const [actionItems, setActionItems] = useState<(Expense | Task)[]>([])

  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState<boolean | Expense>(false)
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState<boolean | Task>(false)

  function onCloseTaskView() {
    setActiveTask(null)
  }

  function onCloseExpenseView() {
    setActiveExpense(null)
  }

  useEffect(formatActionItems, [expenses, tasks])

  useEffect(() => {
    if (!user) return

    fetchActionItems()

    const actionItemsRefreshInterval = setInterval(fetchActionItems, 30000)

    return () => clearInterval(actionItemsRefreshInterval)
  }, [])

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

      <TaskDialog open={createTaskDialogOpen} setOpen={setCreateTaskDialogOpen} />
      <ExpenseDialog open={addExpenseDialogOpen} setOpen={setAddExpenseDialogOpen} />
    </>
  )
}
