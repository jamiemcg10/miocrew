import { Activity, Expense, Idea, Task } from '@/lib/types'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getActivities, getExpenses, getIdeas, getTasks } from '@/db'
import { addMessageListener } from '@/db/websocket'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'

interface TripProps {
  tripId: string
  children: ReactNode
}

// Rry to move all db and ws logic here so the functions dont have to
// rerun every time tabs are switched

export const ActivitiesContext = createContext<Activity[]>([])
export const TasksContext = createContext<Task[]>([])
export const IdeasContext = createContext<Idea[]>([])
export const ExpensesContext = createContext<Expense[]>([])

export default function TripWrapper({ tripId, children }: TripProps) {
  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const storedActivities = LocalStorage.get<Activity[]>(`${trip?.id}:activities`)
  const storedTasks = LocalStorage.get<Task[]>(`${trip?.id}:tasks`)
  const storedIdeas = LocalStorage.get<Idea[]>(`${tripId}:ideas`)
  const storedExpenses = LocalStorage.get<Expense[]>(`${tripId}:expenses`)

  const [activities, setActivities] = useState<Activity[]>(storedActivities || [])
  const [tasks, setTasks] = useState<Task[]>(storedTasks || [])
  const [ideas, setIdeas] = useState<Idea[]>(storedIdeas || [])
  const [expenses, setExpenses] = useState<Expense[]>(storedExpenses || [])

  function fetchActivities() {
    getActivities({ userId: user!.id, tripId: tripId })
      .then((response) => {
        if (response.data.activities) {
          setActivities(response.data.activities)
          LocalStorage.set(`${trip!.id}:activities`, response.data.activities)
        }
      })
      .catch((e) => console.error('Error fetching scheduled activities', e))
  }

  function fetchTasks() {
    getTasks({ userId: user!.id, tripId: tripId })
      .then((response) => {
        if (response.data.tasks) {
          setTasks(response.data.tasks)
          LocalStorage.set(`${trip?.id}:tasks`, response.data.tasks)
        }
      })
      .catch((e) => console.error('Error fetching tasks', e))
  }

  function fetchIdeas() {
    getIdeas({ userId: user!.id, tripId: tripId })
      .then((response) => {
        if (response.data.ideas?.length) {
          setIdeas(response.data.ideas)
          LocalStorage.set(`${trip!.id}:ideas`, response.data.ideas)
        }
      })
      .catch((e) => console.error('Error fetching ideas', e))
  }

  function fetchExpenses() {
    getExpenses({ userId: user!.id, tripId: tripId })
      .then((response) => {
        if (response.data.expenses) {
          setExpenses(response.data.expenses)
          LocalStorage.set(`${trip!.id}:expenses`, response.data.expenses)
        }
      })
      .catch((e) => console.error('Error fetching expenses', e))
  }

  useEffect(() => {
    if (!user) return

    fetchActivities()
    fetchTasks()
    fetchIdeas()
    fetchExpenses()

    addMessageListener('activities', fetchActivities)
    addMessageListener('tasks', fetchTasks)
    addMessageListener('ideas', fetchIdeas)
    addMessageListener('expenses', fetchExpenses)
  }, [])

  return (
    <>
      <ActivitiesContext value={activities}>
        <TasksContext value={tasks}>
          <IdeasContext value={ideas}>
            <ExpensesContext value={expenses}>{children}</ExpensesContext>
          </IdeasContext>
        </TasksContext>
      </ActivitiesContext>
    </>
  )
}
