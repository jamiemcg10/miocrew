interface BaseObject {
  id: string
  [K: string]: any
}

export function arrayToObject(acc: {}, c: BaseObject) {
  return {
    ...acc,
    [c.id]: c
  }
}
