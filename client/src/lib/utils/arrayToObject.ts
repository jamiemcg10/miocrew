interface BaseObject {
  id: string
  [K: string]: any
}

export function arrayToObject(acc: {}, c: BaseObject) {
  // is this needed?
  return {
    ...acc,
    [c.id]: c
  }
}
