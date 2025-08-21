from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.models import Trips, Tasks, Message_Recipients, Attendees, Ideas, Expenses, Expenses_Owe, Users
from utils.flatten import flatten_trip, flatten_message, flatten_idea, flatten_expense, flatten_task

from sqlalchemy import create_engine, select, or_
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

engine = create_engine("sqlite:///miocrew.db", echo=True)
session = Session(engine)

app = FastAPI()

# Allow React dev server to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/ping")
async def ping():
    return { "data": "pong"}

@app.get("/user/{user_id}/trip/{trip_id}/")
async def trip(user_id, trip_id):
    stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id).where(Trips.id == trip_id)

    trip = session.scalar(stmt)

    return { "trip": flatten_trip(trip) }

@app.get("/user/{user_id}/trips/")
async def trips():
    # need table to attach trips to users
    stmt = select(Trips).options(selectinload(Trips.attendees))
    trips = []


    for trip in session.scalars(stmt):
        flattened_trip = flatten_trip(trip)

        trips.append(flattened_trip)

    return {'trips': trips}

@app.get("/user/{user_id}/messages/")
async def messages(user_id: str):
    messages = []

    stmt = select(Message_Recipients).where(Message_Recipients.recipient == user_id)

    for msg in session.scalars(stmt):
        flattened_msg = flatten_message(msg)

        messages.append(flattened_msg)

    return {"messages": messages}

@app.get("/user/{user_id}/trip/{trip_id}/ideas/")
async def ideas(user_id: str, trip_id):
    ideas = []

    stmt = select(Ideas, Attendees).select_from(Ideas).join(Trips).join(Attendees).where(Ideas.trip_id == Trips.id).where(trip_id == Ideas.trip_id).where(Attendees.attendee_id == user_id)

    results = session.execute(stmt).all()

    for idea, attendee in results: 
        flattened_idea = flatten_idea(idea, attendee)
        ideas.append(flattened_idea)

    return {"ideas": ideas}

@app.get("/user/{user_id}/action_items")
async def action_items(user_id):
    expenses = []
    tasks = []

    exp_stmt = select(Expenses, Expenses_Owe).options(selectinload(Expenses.owe)).join(Expenses_Owe).where(Expenses_Owe.user_id == user_id)

    for expense in session.scalars(exp_stmt):
        flattened_expense = flatten_expense(expense)
        expenses.append(flattened_expense)

    tsk_stmt = select(Tasks).options(selectinload(Tasks.options)).where(or_(Tasks.assignee_id == user_id, Tasks.assignee_id == 'Everyone'))

    for task in session.scalars(tsk_stmt):
        tasks.append(flatten_task(task))

    return {"expenses": expenses, "tasks": tasks}

@app.get("/user/{user_id}/trip/{trip_id}/expenses") 
async def trip_expenses(user_id, trip_id):
    expenses = []

    stmt = select(Expenses, Attendees).options(selectinload(Expenses.owe)).select_from(Expenses).join(Trips).join(Attendees).join(Users).where(Expenses.trip_id == trip_id).where(Attendees.attendee_id == user_id) # is users needed?

    for expense in session.scalars(stmt):
        flattened_expense = flatten_expense(expense)

        expenses.append(flattened_expense)

    return {"expenses": expenses}

@app.get("/user/{user_id}/trip/{trip_id}/tasks")
async def action_items(user_id, trip_id):
    tasks = []

    stmt = select(Tasks).options(selectinload(Tasks.options)).select_from(Tasks).join(Attendees, Tasks.trip_id == Attendees.trip_id).where(Tasks.trip_id == trip_id).where(Attendees.attendee_id == user_id)

    for task in session.scalars(stmt):
        tasks.append(flatten_task(task))

    return {"tasks": tasks}