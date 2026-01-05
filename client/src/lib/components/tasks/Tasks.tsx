import { Dispatch, SetStateAction, useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import TaskItem from './TaskItem'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded'
import Chip from '@mui/material/Chip'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import Avatar from '@mui/material/Avatar'
import { Task, User } from '@/lib/types'
import TaskView from './TaskView'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import CrewAvatar from '../CrewAvatar'
import { TasksContext } from '@/app/(boundary)/(app)/trip/[tripid]/TripWrapper'
import VerticalScrollShadow from '../layout/VerticalScrollShadow'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { accordionSummarySx, accordionSx } from '@/lib/styles/sx'

interface TasksProps {
  setOpenCreateDialog: Dispatch<SetStateAction<boolean | Task>>
}

const createTaskBtnSx = {
  mb: '24px',
  alignSelf: 'end',
  width: 'initial',
  fontWeight: 600
}

const chipSx = { pl: '8px' }

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
      .filter((task) =>
        updatedFilters.includes('Everyone') ? task.assigneeId === 'Everyone' : true
      )
      .filter((task) =>
        updatedCrewFilter
          ? task.assigneeId === 'Everyone' || task.assigneeId === updatedCrewFilter
          : true
      )

    setFilteredTasks(!updatedFilters.length && !updatedCrewFilter?.length ? tasks : _filteredTasks)
  }

  function onEditTask() {
    if (!activeTask) return
    setOpenCreateDialog(activeTask)
    setActiveTask(null)
  }

  const trip = useContext(TripContext)
  const tasks = useContext(TasksContext)

  const attendees = Object.values(trip?.attendees || {})

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)
  const [filters, setFilters] = useState<string[]>([])
  const [crewFilter, setCrewFilter] = useState<string | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  useEffect(() => {
    filterTasks({})
  })

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddTaskRoundedIcon />}
        sx={createTaskBtnSx}
        onClick={() => setOpenCreateDialog(true)}>
        Create task
      </Button>
      <Accordion disableGutters={true} sx={accordionSx}>
        <AccordionSummary sx={accordionSummarySx} expandIcon={<ArrowDropDownIcon />}>
          Filters
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap font-semibold mb-2 space-x-2! space-y-2! sm:space-x-1! sm:space-y-1!">
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
                  sx={chipSx}
                  onClick={() => handleCrewFilterClick(a.id)}
                />
              )
            })}
          </div>
        </AccordionDetails>
      </Accordion>
      <VerticalScrollShadow>
        {filteredTasks.length ? (
          <div className="w-full">
            {filteredTasks
              .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
              .map((task) => {
                return <TaskItem task={task} key={task.id} setActiveTask={setActiveTask} />
              })}
          </div>
        ) : (
          <div>There are no tasks or no tasks that match the current filters.</div>
        )}
      </VerticalScrollShadow>
      <TaskView activeTask={activeTask} onEdit={onEditTask} onClose={() => setActiveTask(null)} />
    </>
  )
}
