import Button from '@mui/material/Button'
import Image from 'next/image'

const startBtnSx = { width: '100%', mt: 8 }

export default function Home() {
  return (
    <div className="p-4 text-center flex flex-col py-18 not-sm:py-36 items-center">
      <div className="flex items-center justify-center h-64 w-64 -mb-2">
        <Image src="/goose.svg" height="256" width="256" alt="traveling goose" />
      </div>
      <div>
        <span className="text-9xl font-bold text-blue-400">Mio</span>
        <span
          className="text-gray-400 text-4xl font-bold
      ">
          Crew
        </span>
      </div>
      <div>Get your plans out of the group chat</div>
      <div className="w-full sm:w-1/2">
        <Button variant="contained" href="/login" sx={startBtnSx}>
          Get started!
        </Button>
      </div>
    </div>
  )
}
