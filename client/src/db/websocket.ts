let websocket: WebSocket

export function openWebSocket(id: string) {
  websocket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL}/ws/${id}`)

  websocket.addEventListener('error', (e) => console.error('Websocket error', e))
  websocket.addEventListener('message', (message) => console.log({ message }))
}
