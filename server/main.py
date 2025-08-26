from fastapi import FastAPI, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware

from models.models import Trips, Tasks, Message_Recipients, Attendees, Ideas, Expenses, Expenses_Owe, Users, Events
from utils.flatten import flatten_trip, flatten_message, flatten_idea, flatten_expense, flatten_task, flatten_event, flatten_user

from sqlalchemy import create_engine, select, or_
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.orm import selectinload

import sqlite3, uuid

# engine = create_engine("sqlite:///miocrew.db", echo=True)
# session = Session(engine)

app = FastAPI()

# Allow React dev server to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DB = "miocrew.db"
user_dbs: dict[str, Session] = {}

def make_scratch_session() -> Session:
    dest = sqlite3.connect(":memory:", check_same_thread=False)

    # copy db into memory
    src = sqlite3.connect(BASE_DB)
    src.backup(dest)
    src.close()

    # Build SQLAlchhemy engine bound to this connection
    engine = create_engine("sqlite://", creator=lambda: dest, future=True, echo=True)
    SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
    return SessionLocal()

def get_user_db(request: Request, response: Response) -> Session:
    # Give each visitor their own scratch copy of the DB
    session_id = request.cookies.get("session.id")
    if not session_id:
        session_id = str(uuid.uuid4())
        response.set_cookie("session_id", session_id)

    if session_id not in user_dbs:
        user_dbs[session_id] = make_scratch_session()

    return user_dbs[session_id]

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

@app.get("/user/{user_id}/trip/{trip_id}/ideas/")
async def ideas(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    ideas = []

    stmt = select(Ideas, Attendees).select_from(Ideas).join(Trips).join(Attendees).where(Ideas.trip_id == Trips.id).where(trip_id == Ideas.trip_id).where(Attendees.attendee_id == user_id)

    results = db.execute(stmt).all()

    for idea, attendee in results: 
        flattened_idea = flatten_idea(idea, attendee)
        ideas.append(flattened_idea)

    return {"ideas": ideas}

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