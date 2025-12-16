from typing import List, Any
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        # self.active_connections: List[WebSocket] = []
        self.active_connections: Any = {}

    async def connect(self, websocket: WebSocket, trip_id: str):
        await websocket.accept()
        # self.active_connections.append(websocket)
        if trip_id in self.active_connections:
            self.active_connections[trip_id].append(websocket)
        else:
            self.active_connections[trip_id] = [websocket]

    def disconnect(self, websocket: WebSocket, trip_id: str):
        self.active_connections[trip_id].remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, trip_id: str, endpoint: str):
        print('active_connections', self.active_connections)
        print('broadcasting', str(trip_id), endpoint)
        print('sockets', self.active_connections[str(trip_id)])
        for connection in self.active_connections[trip_id]:
            await connection.send_text(f"{endpoint}")

manager = ConnectionManager()