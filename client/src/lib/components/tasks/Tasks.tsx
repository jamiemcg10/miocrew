import '../../styles/VerticalScroll.css'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '@mui/material/Button'
import TaskItem from './TaskItem'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded'
import Chip from '@mui/material/Chip'
import { trips } from '@/lib/utils/dummyData'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import Avatar from '@mui/material/Avatar'
import { CrewMember } from '@/lib/types'

interface TasksProps {
  setOpenCreateDialog: Dispatch<SetStateAction<boolean>>
}

const tasks = [
  {
    id: 'task1',
    name: 'Group dinner date',
    question: 'Which day should we do group dinner?',
    type: 'poll' as const,
    dueDate: new Date(),
    options: ['8/7', '8/8', '8/9'],
    assignee: 'Everyone' as const,
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Attendee'
    },
    completed: false
  },
  {
    id: 'task2',
    name: 'Make brunch reservation',
    description: '',
    type: 'general' as const,
    dueDate: new Date(),
    assignee: { id: '1', firstName: 'Jane', lastName: 'Fonda', color: 'purple', type: 'Owner' },
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Attendee'
    },
    completed: false
  },
  {
    id: 'task3',
    name: 'Send out B-list invites',
    description: '',
    type: 'general' as const,
    dueDate: new Date(),
    assignee: {
      id: '3',
      firstName: 'Jamie Lee',
      lastName: 'Curtis',
      color: 'turquoise',
      type: 'Attendee'
    },
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Attendee'
    },
    completed: true
  }
]

const attendees = trips[0].attendees

export default function Tasks({ setOpenCreateDialog }: TasksProps) {
  function handleBasicFilterClick(value?: any) {
    const updatedFilters = filters.includes(value)
      ? filters.filter((f) => f !== value)
      : [...filters, value]
    setFilters(updatedFilters)

    filterTasks({ updatedFilters })
  }

  function handleCrewFilterClick(value: any) {
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

  return (
    <div className="py-10 px-8 sm:px-20 sm:py-12 sm:pt-4 flex flex-col overflow-y-hidden font-bold space-y-4 grow">
      <Button
        variant="contained"
        startIcon={<AddTaskRoundedIcon />}
        sx={{
          margin: '12px 0 24px 0',
          alignSelf: 'end',
          width: 'initial',
          fontWeight: 600
        }}
        onClick={() => setOpenCreateDialog(true)}>
        Create task
      </Button>
      <div className="flex mb-8 space-x-1!">
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
        {attendees.map((a: CrewMember, i) => {
          return (
            <Chip
              label={a.firstName}
              avatar={
                <Avatar alt={a.firstName} sx={{ backgroundColor: a.color }}>
                  {a.firstName.charAt(0)}
                  {a.lastName.charAt(0)}
                </Avatar>
              }
              key={i}
              variant={crewFilter === a.id ? 'filled' : 'outlined'}
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
              return <TaskItem task={task} key={task.id} />
            })
        ) : (
          <div>There are no tasks or no tasks that match the current filters.</div>
        )}
      </div>
    </div>
  )
}
