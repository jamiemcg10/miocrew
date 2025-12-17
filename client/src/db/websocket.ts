export let websocket: WebSocket

const callbackFns: Record<string, Function> = {
  trip: () => {},
  activities: () => {},
  tasks: () => {},
  ideas: () => {},
  expenses: () => {}
}

export function openWebSocket(tripId: string) {
  websocket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL}/ws/trip/${tripId}`)

  websocket.addEventListener('error', (e) => console.error('Websocket error', e))
  websocket.addEventListener('message', ({ data }) => {
    console.log({ data })

    if (data === 'trip') {
      callbackFns.trip()
    } else if (data === 'activities') {
      callbackFns.activities()
    } else if (data === 'tasks') {
      callbackFns.tasks()
    } else if (data === 'ideas') {
      callbackFns.ideas()
    } else if (data === 'expenses') {
      callbackFns.expenses()
    }
  })
}

export function addMessageListener(path: keyof typeof callbackFns, fn: Function) {
  callbackFns[path] = fn
}
