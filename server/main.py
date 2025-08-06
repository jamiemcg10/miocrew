from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.models import Trip, Message_Recipient, Attendee
from utils.flatten import flatten_trip, flatten_message

from sqlalchemy import create_engine
from sqlalchemy import select
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

@app.get("/api/hello")
async def hello():
    return { "message": "Hello from FastAPI server!"}

@app.get("/users/{user_id}/trips/{trip_id}")
async def trip(user_id, trip_id):
    stmt = select(Trip).options(selectinload(Trip.attendees)).join(Attendee).where(Attendee.attendee_id == user_id).where(Trip.id == trip_id)

    trip = session.scalar(stmt)

    return { "trip": flatten_trip(trip) }

@app.get("/users/{user_id}/trips/")
async def trips():
    # need table to attach trips to users
    stmt = select(Trip).options(selectinload(Trip.attendees))
    trips = []


    for trip in session.scalars(stmt):
        flattened_trip = flatten_trip(trip)

        trips.append(flattened_trip)

    return {'trips': trips}

@app.get("/users/{user_id}/messages/")
async def messages(user_id: str):
    messages = []

    stmt = select(Message_Recipient).where(Message_Recipient.recipient == user_id)

    for msg in session.scalars(stmt):
        flattened_msg = flatten_message(msg)

        messages.append(flattened_msg)

    return {"messages": messages}