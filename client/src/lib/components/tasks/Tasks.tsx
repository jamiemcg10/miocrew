import '../../styles/VerticalScroll.css'
import { Dispatch, SetStateAction, useState, useContext } from 'react'
import Button from '@mui/material/Button'
import TaskItem from './TaskItem'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded'
import Chip from '@mui/material/Chip'
import { tasks } from '@/lib/utils/dummyData'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import Avatar from '@mui/material/Avatar'
import { Task, User } from '@/lib/types'
import TaskView from './TaskView'
import { TripContext } from '@/lib/utils/TripContext'
import CrewAvatar from '../CrewAvatar'

interface TasksProps {
  setOpenCreateDialog: Dispatch<SetStateAction<boolean>>
}

export default function Tasks({ setOpenCreateDialog }: TasksProps) {
  function handleBasicFilterClick(value: string) {
    const updatedFilters = filters.includes(value)
      ? filters.filter((f) => f !== value)
      : [...filters, value]
    setFilters(updatedFilters)

    filterTasks({ updatedFilters })
  }

  function handleCrewFilterClick(value: string) {
    const updatedCrewFilter = crewFilter === value ? null : value
    setCrewFilter(updatedCrewFilter)

    filterTasks({ updatedCrewFilter })
  }

  function filterTasks({ updatedFilters = filters, updatedCrewFilter = crewFilter }) {
    const _filteredTasks = tasks
      .filter((task) => (updatedFilters.includes('Active') ? !task.completed : true))
      .filter((task) => (updatedFilters.includes('Completed') ? task.completed : true))
      .filter((task) => (updatedFilters.includes('Everyone') ? task.assignee === 'Everyone' : true))
      .filter((task) =>
        updatedCrewFilter
          ? task.assignee === 'Everyone' || task.assignee.id === updatedCrewFilter
          : true
      )

    setFilteredTasks(!updatedFilters.length && !updatedCrewFilter?.length ? tasks : _filteredTasks)
  }

  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [filters, setFilters] = useState<string[]>([])
  const [crewFilter, setCrewFilter] = useState<string | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const trip = useContext(TripContext)
  const attendees = Object.values(trip?.attendees || {})

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddTaskRoundedIcon />}
        sx={{
          mb: '24px',
          alignSelf: 'end',
          width: 'initial',
          fontWeight: 600
        }}
        onClick={() => setOpenCreateDialog(true)}>
        Create task
      </Button>
      <div className="flex flex-wrap mb-8 space-x-2! space-y-2! sm:space-x-1! sm:space-y-1!">
        <Chip
          label="Active"
          icon={<CheckBoxOutlineBlankRoundedIcon />}
          variant={filters.includes('Active') ? 'filled' : 'outlined'}
          onClick={() => handleBasicFilterClick('Active')}
        />
        <Chip
          label="Completed"
          icon={<CheckBoxRoundedIcon />}
          variant={filters.includes('Completed') ? 'filled' : 'outlined'}
          onClick={() => handleBasicFilterClick('Completed')}
        />
        <Chip
          label="Everyone"
          avatar={<Avatar alt="Everyone">E</Avatar>}
          variant={filters.includes('Everyone') ? 'filled' : 'outlined'}
          onClick={() => handleBasicFilterClick('Everyone')}
        />
        {attendees?.map((a: User, i) => {
          return (
            <Chip
              label={a.firstName}
              avatar={<CrewAvatar user={a} size="xs" baseClasses="-mr-1" />}
              key={i}
              variant={crewFilter === a.id ? 'filled' : 'outlined'}
              sx={{ pl: '8px' }}
              onClick={() => handleCrewFilterClick(a.id)}
            />
          )
        })}
      </div>
      <div>
        {filteredTasks.length ? (
          filteredTasks
            .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
            .map((task) => {
              return <TaskItem task={task} key={task.id} onClick={() => setActiveTask(task)} />
            })
        ) : (
          <div>There are no tasks or no tasks that match the current filters.</div>
        )}
      </div>
      <TaskView activeTask={activeTask} onClose={() => setActiveTask(null)} />
    </>
  )
}
