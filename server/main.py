from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.models import Trips, Message_Recipients, Attendees, Ideas
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

    stmt = select(Ideas).join(Trips).join(Attendees).where(Ideas.trip_id == Trips.id).where(trip_id == Ideas.trip_id).where(Attendees.attendee_id == user_id)

    for idea in session.scalars(stmt):
        ideas.append(idea)

    return {"ideas": ideas}