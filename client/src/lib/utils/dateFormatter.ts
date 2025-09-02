import dayjs from 'dayjs'

export function dateFormatter(date: string | undefined) {
  return dayjs(date).format('MMM D, YYYY')
}

export function timeFormatter(date: string | undefined) {
  return dayjs(date).format('h:mm A')
}
