export let websocket: WebSocket
export let ws = new EventTarget()

const callbackFns: Record<string, Function> = {
  expenses: () => {}
}

export function openWebSocket(tripId: string) {
  websocket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL}/ws/${tripId}`)

  websocket.addEventListener('error', (e) => console.error('Websocket error', e))
  websocket.addEventListener('message', (message) => {
    console.log({ message })
    if (message.data === `expenses`) {
      callbackFns.expenses()
    }
  })
}

export function addMessageListener(path: keyof typeof callbackFns, fn: Function) {
  callbackFns[path] = fn
}
