from typing import Mapping, List
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: Mapping[str, List[WebSocket]] = {}

    async def connect_to_trip(self, websocket: WebSocket, trip_id: str):
        await websocket.accept()

        if trip_id in self.active_connections:
            self.active_connections[trip_id].append(websocket)
        else:
            self.active_connections[trip_id] = [websocket]

    def trip_disconnect(self, websocket: WebSocket, trip_id: str):
        self.active_connections[trip_id].remove(websocket)

    async def send_user_message(self, user_id: str, message: str):
        await self.active_user_connections[user_id].send_text(message)

    async def broadcast(self, trip_id: str, endpoint: str):
        for connection in self.active_connections[trip_id]:
            await connection.send_text(f"{endpoint}")

manager = ConnectionManager()