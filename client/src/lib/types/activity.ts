export interface Activity {
  id: string
  tripId: string
  name: string
  description?: string
  location: string
  startTime: string
  endTime?: string
  color: string
}

export function isActivity(open: boolean | string | Activity | undefined): open is Activity {
  return typeof open !== 'boolean' && typeof open !== 'string' && typeof open !== 'undefined'
}
