import dayjs from 'dayjs'

export function dateFormatter(date: Date | undefined) {
  return dayjs(date).format('MMM D, YYYY')
}
