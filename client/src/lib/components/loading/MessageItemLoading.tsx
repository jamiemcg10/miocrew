import { noShrinkSx } from '@/lib/styles/sx'
import Skeleton from '@mui/material/Skeleton'

export default function MessageItemLoading() {
  return (
    <div className="h-10 py-1 pl-2.5 pr-2 border-b-gray-300/20 border-b-1 flex items-center justify-between even:bg-black/10 even:dark:bg-white/10 odd:bg-black/5  odd:dark:bg-white/5">
      <div className="flex items-center space-x-2 max-w-2/3">
        <Skeleton width={14} height={14} variant="rounded" sx={noShrinkSx} />
        <Skeleton width={250} height={24} variant="rounded" />
      </div>

      <div className="flex space-x-1">
        <Skeleton width={28} height={28} variant="circular" />
        <Skeleton width={28} height={28} variant="circular" />
      </div>
    </div>
  )
}
