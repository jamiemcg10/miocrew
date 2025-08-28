import { appColors } from './appColors'

export function assignAppColor() {
  const index = Date.now() % 20
  return appColors[index]
}
