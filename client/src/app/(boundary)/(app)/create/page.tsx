'use client'
import '@/lib/styles/VerticalScroll.css'
import TripForm from './TripForm'

export default function CreatePage() {
  return (
    <div className="vertical-scroll flex flex-col space-y-4 px-8 py-16 sm:px-16 sm:pb-8 overflow-y-auto">
      <div className="mb-8 font-bold text-3xl text-(--foreground) dark:text-[#90caf9]">
        Create new trip
      </div>
      <TripForm />
    </div>
  )
}
