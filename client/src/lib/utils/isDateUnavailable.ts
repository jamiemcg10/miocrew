import { DateValue, getLocalTimeZone, today } from '@internationalized/date'

export function pastDatesUnavailable(date: DateValue) {
  return date < today(getLocalTimeZone())
}

export function futureDatesUnavailable(date: DateValue) {
  return date > today(getLocalTimeZone())
}
