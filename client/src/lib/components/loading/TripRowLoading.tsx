import Skeleton from '@mui/material/Skeleton'
import TableRow from '../layout/TableRow'

export default function TripRowLoading() {
  return (
    <TableRow>
      <div className="flex grow flex-col sm:flex-row mr-6 justify-between">
        <Skeleton width={220} height={24} variant="rounded" />
        <Skeleton width={195} height={24} variant="rounded" />
      </div>

      <div className="flex basis-1/4 sm:basis-1/5 justify-end -space-x-2">
        <Skeleton width={95} height={24} variant="rounded" />
      </div>
    </TableRow>
  )
}
