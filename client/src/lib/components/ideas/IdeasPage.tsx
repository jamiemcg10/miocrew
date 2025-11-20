import Ideas from '@/lib/components/ideas/Ideas'
import { useContext, useEffect, useState } from 'react'
import AddIdeaDialog from './AddIdeaDialog'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { Idea } from '@/lib/types'
import { getIdeas } from '@/db'

export default function IdeasPage() {
  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [addDialogOpen, setAddDialogOpen] = useState<boolean | Idea>(false)

  const storedIdeas = LocalStorage.get<Idea[]>(`${trip?.id}:ideas`)
  const [ideas, setIdeas] = useState<Idea[]>(storedIdeas || [])

  useEffect(() => {
    if (!user || !trip) return

    getIdeas({ userId: user.id, tripId: trip.id })
      .then((response) => {
        if (response.data.ideas?.length) {
          setIdeas(response.data.ideas)
          LocalStorage.set(`${trip.id}:ideas`, response.data.ideas)
        }
      })
      .catch((e) => console.error('Error fetching ideas', e))
  }, [])

  return (
    <>
      <Ideas ideas={ideas} setOpenAddDialog={setAddDialogOpen} />
      <AddIdeaDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
