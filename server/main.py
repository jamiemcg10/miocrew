from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from typing import List
from sqlalchemy import create_engine
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import select
from sqlalchemy import join
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Session
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import selectinload

#### move this later
class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(30))
    last_name: Mapped[str] = mapped_column(String(30))
    color: Mapped[str] = mapped_column(String(30))
    avatar: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(75))
    attendees: Mapped[List["Attendee"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, firstName={self.name!r})"

class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    attendees: Mapped[List["Attendee"]] = relationship()
    start_date: Mapped[str] = mapped_column(String(20))
    end_date: Mapped[Optional[str]]

class Attendee(Base):
    __tablename__ = 'trip_attendees'

    id: Mapped[str] = mapped_column(primary_key=True)
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    type: Mapped[str] = mapped_column(String(7))
    attendee_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    trip: Mapped["Trip"] = relationship(back_populates="attendees")
    user: Mapped["User"] = relationship(back_populates="attendees", lazy="joined")

class Message(Base):
    __tablename__ = 'messages'

    id: Mapped[str] = mapped_column(primary_key=True)
    subject: Mapped[str] = mapped_column(String)
    body: Mapped[str] = mapped_column(String)
    sender: Mapped[str] = mapped_column(String(8))
    message_recipients: Mapped[List["Message_Recipient"]] = relationship() # Mapped[List["Message_Recipient"]] = relationship(back_populates="message", lazy="joined")

class Message_Recipient(Base):
    __tablename__ = 'message_recipients'

    id: Mapped[str] = mapped_column(primary_key=True)
    message_id: Mapped[str] = mapped_column(String, ForeignKey("messages.id"))
    recipient: Mapped[str] = mapped_column(String)
    read: Mapped[bool] = mapped_column(Integer)
    message: Mapped["Message"] = relationship(back_populates="message_recipients")
####

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


@app.get("/users/{user_id}/trips/")
async def trips():
    def flatten_attendee(attendee):
        return {
            "id": attendee.id,
            "attendee_id": attendee.attendee_id,
            "type": attendee.type,
            "trip_id": attendee.trip_id,
            "color": attendee.user.color,
            "email": attendee.user.email,
            "lastName": attendee.user.last_name,
            "firstName": attendee.user.first_name,
            "avatar": attendee.user.avatar
        }



    # need table to attach trips to users
    stmt = select(Trip).options(selectinload(Trip.attendees))
    trips = []


    for trip in session.scalars(stmt):
        flattened_trip = {
            "id": trip.id,
            "name": trip.name,
            "attendees": [flatten_attendee(a) for a in trip.attendees],
            "startDate": trip.start_date,
            "endDate": trip.end_date
        }

        trips.append(flattened_trip)

    return {'trips': trips}

@app.get("/users/{user_id}/messages/")
async def messages(user_id: str):
    messages = []

    stmt = select(Message_Recipient).where(Message_Recipient.recipient == user_id)

    for msg in session.scalars(stmt):
        flattened_msg = {
            "recipientId": "2",
            "read": msg.read,
            "senderId": msg.message.sender,
            "id": msg.message.id,
            "subject": msg.message.subject,
            "body": msg.message.body
        }

        messages.append(flattened_msg)

    return {"messages": messages}