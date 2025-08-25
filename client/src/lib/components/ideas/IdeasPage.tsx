import Ideas from '@/lib/components/ideas/Ideas'
import { useContext, useEffect, useState } from 'react'
import AddIdeaDialog from './AddIdeaDialog'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { Idea } from '@/lib/types'

export default function IdeasPage() {
  function getIdeas() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/trip/${trip!.id}/ideas/`)
      .then((response) => {
        if (response.data.ideas?.length) {
          setIdeas(response.data.ideas)
          LocalStorage.set('ideas', response.data.ideas)
        }
      })
      .catch((e) => console.error('Error fetching ideas', e))
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [ideas, setIdeas] = useState<Idea[]>([])

  useEffect(() => {
    const storedIdeas = LocalStorage.get<Idea[]>('ideas')
    if (storedIdeas) {
      setIdeas(storedIdeas)
    }
    getIdeas()
  }, [])

  return (
    <>
      <Ideas ideas={ideas} setOpenAddDialog={setAddDialogOpen} />
      <AddIdeaDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
