from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware

from models.models import Trips, Tasks, Message_Recipients, Attendees, Expenses, Expenses_Owe, Users, Events
import routes.ideas as ideas
from utils.flatten import flatten_trip, flatten_message, flatten_expense, flatten_task, flatten_event, flatten_user
from utils.get_user_db import user_dbs, make_scratch_session, get_user_db

from sqlalchemy import select, or_
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

import uuid

app = FastAPI()

# Allow React dev server to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ideas.router)

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
        users.append(user)

    return {"users": users}

@app.get("/user/{user_id}/trip/{trip_id}/")
async def trip(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id).where(Trips.id == trip_id)

    trip = db.scalar(stmt)

    return { "trip": flatten_trip(trip) }

@app.get("/user/{user_id}/trips/")
async def trips(user_id: str, db: Session = Depends(get_user_db)):
    # need table to attach trips to users - done, make sure it works
    stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id)
    trips = []


    for trip in db.scalars(stmt):
        flattened_trip = flatten_trip(trip)

        trips.append(flattened_trip)

    return {'trips': trips}

@app.get("/user/{user_id}/messages/")
async def messages(user_id: str, db: Session = Depends(get_user_db)):
    messages = []

    stmt = select(Message_Recipients).where(Message_Recipients.recipient == user_id)

    for msg in db.scalars(stmt):
        flattened_msg = flatten_message(msg)

        messages.append(flattened_msg)

    return {"messages": messages}

@app.get("/user/{user_id}/action_items")
async def action_items(user_id: str, db: Session = Depends(get_user_db)):
    expenses = []
    tasks = []

    exp_stmt = select(Expenses, Expenses_Owe).options(selectinload(Expenses.owe)).join(Expenses_Owe).where(Expenses_Owe.user_id == user_id)

    for expense in db.scalars(exp_stmt):
        flattened_expense = flatten_expense(expense)
        expenses.append(flattened_expense)

    tsk_stmt = select(Tasks).options(selectinload(Tasks.options)).where(or_(Tasks.assignee_id == user_id, Tasks.assignee_id == 'Everyone'))

    for task in db.scalars(tsk_stmt):
        tasks.append(flatten_task(task))

    return {"expenses": expenses, "tasks": tasks}

@app.get("/user/{user_id}/trip/{trip_id}/expenses") 
async def trip_expenses(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    expenses = []

    stmt = select(Expenses, Attendees).options(selectinload(Expenses.owe)).select_from(Expenses).join(Trips).join(Attendees).join(Users).where(Expenses.trip_id == trip_id).where(Attendees.attendee_id == user_id) # is users needed?

    for expense in db.scalars(stmt):
        flattened_expense = flatten_expense(expense)

        expenses.append(flattened_expense)

    return {"expenses": expenses}

@app.get("/user/{user_id}/trip/{trip_id}/tasks")
async def tasks(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    tasks = []

    stmt = select(Tasks).options(selectinload(Tasks.options)).select_from(Tasks).join(Attendees, Tasks.trip_id == Attendees.trip_id).where(Tasks.trip_id == trip_id).where(Attendees.attendee_id == user_id)

    for task in db.scalars(stmt):
        tasks.append(flatten_task(task))

    return {"tasks": tasks}

@app.get("/user/{user_id}/trip/{trip_id}/events")
async def events(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    events = []

    stmt = select(Events).select_from(Events).join(Attendees, Events.trip_id == Attendees.trip_id).where(Events.trip_id == trip_id).where(Attendees.attendee_id == user_id)

    for event in db.scalars(stmt):
        events.append(flatten_event(event))

    return {"events": events}