import { appColors } from './appColors'
import { activityColors } from './activityColors'

export function assignAppColor() {
  const index = Date.now() % appColors.length
  return appColors[index]
}

export function assignActivityColor() {
  const index = Date.now() % activityColors.length
  return activityColors[index]
}
