import { appColors } from './colors/appColors'
import { eventColors } from './colors/eventColors'

export function assignAppColor() {
  const index = Date.now() % appColors.length
  return appColors[index]
}

export function assignEventColor() {
  const index = Date.now() % eventColors.length
  return eventColors[index]
}
