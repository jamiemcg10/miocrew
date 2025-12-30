from fastapi import FastAPI, Request, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from models.models import Tasks, Users, Expenses, Debtors
import routes.ideas as ideas
import routes.activities as activities
import routes.expenses as expenses
import routes.tasks as tasks
import routes.messages as messages
import routes.trip as trip
from utils.flatten import flatten_expense, flatten_task, flatten_user
from utils.get_user_db import user_dbs, make_scratch_session, get_user_db
from websocket.connection_manager import manager

from sqlalchemy import select, or_
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

import uuid

app = FastAPI()


# Allow React dev server to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_origin_regex=r"^https://miocrew.*\.jamiemcg10s-projects\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ideas.router)
app.include_router(activities.router)
app.include_router(expenses.router)
app.include_router(tasks.router)
app.include_router(messages.router)
app.include_router(trip.router)

@app.middleware("http")
async def get_session(request: Request, call_next):
    session_id = request.cookies.get("session_id")

    if not session_id:
        session_id = str(uuid.uuid4())

    # Ensure DB session exists
    if session_id not in user_dbs:
        user_dbs[session_id] = make_scratch_session()

    response = await call_next(request)

    # Set cookie if it wasn’t already set
    if "session_id" not in request.cookies:
        response.set_cookie(key="session_id", value=session_id, samesite="lax", httponly=True)

    return response


@app.get("/api/ping")
async def ping():
    return { "data": "pong"}


@app.websocket("/ws/trip/{trip_id}")
async def websocket_endpoint(websocket: WebSocket, trip_id: str):
    await manager.connect_to_trip(websocket, trip_id)

    print(f"{trip_id} connected!")
    await manager.broadcast(trip_id, "trip connected!")

    try:
        while True:
            # TODO: look for a better empty try block
            data = await websocket.receive_text()
            print(data)
    except WebSocketDisconnect:
        manager.trip_disconnect(websocket, trip_id)


@app.get("/user/{user_id}/")
async def trip(user_id: str, db: Session = Depends(get_user_db)):
    stmt = select(Users).where(Users.id == user_id)

    user = db.scalar(stmt)

    return { "user": flatten_user(user) }


@app.get("/users/") # needs to be narrowed to friends & trip members eventually
async def users(db: Session = Depends(get_user_db)):
    users = []

    stmt = select(Users)

    for user in db.scalars(stmt):
        users.append(flatten_user(user))

    return {"users": users}

@app.get("/user/{user_id}/action_items")
async def action_items(user_id: str, db: Session = Depends(get_user_db)):
    expenses = []
    tasks = []

    exp_stmt = select(Expenses, Debtors).options(selectinload(Expenses.owe)).join(Debtors).where(Debtors.user_id == user_id)

    for expense in db.scalars(exp_stmt):
        flattened_expense = flatten_expense(expense)
        expenses.append(flattened_expense)

    tsk_stmt = select(Tasks).options(selectinload(Tasks.options)).where(or_(Tasks.assignee_id == user_id, Tasks.assignee_id == 'Everyone'))

    for task in db.scalars(tsk_stmt):
        tasks.append(flatten_task(task))

    return {"expenses": expenses, "tasks": tasks}
