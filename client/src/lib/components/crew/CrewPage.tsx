import Crew from '@/lib/components/crew/Crew'
import { useState } from 'react'
import AddCrewDialog from './AddCrewDialog'

export default function CrewPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <>
      <Crew setOpenAddDialog={setAddDialogOpen} />
      <AddCrewDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
