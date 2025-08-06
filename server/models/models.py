from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Integer
from typing import Optional
from typing import List

class Base(DeclarativeBase):
    pass

class Users(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(30))
    last_name: Mapped[str] = mapped_column(String(30))
    color: Mapped[str] = mapped_column(String(30))
    avatar: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(75))
    attendees: Mapped[List["Attendees"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, firstName={self.name!r})"

class Trips(Base):
    __tablename__ = "trips"

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    attendees: Mapped[List["Attendees"]] = relationship()
    start_date: Mapped[str] = mapped_column(String(20))
    end_date: Mapped[Optional[str]]

class Attendees(Base):
    __tablename__ = 'trip_attendees'

    id: Mapped[str] = mapped_column(primary_key=True)
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    type: Mapped[str] = mapped_column(String(7))
    attendee_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    trip: Mapped["Trips"] = relationship(back_populates="attendees")
    user: Mapped["Users"] = relationship(back_populates="attendees", lazy="joined")

class Messages(Base):
    __tablename__ = 'messages'

    id: Mapped[str] = mapped_column(primary_key=True)
    subject: Mapped[str] = mapped_column(String)
    body: Mapped[str] = mapped_column(String)
    sender: Mapped[str] = mapped_column(String(8))
    message_recipients: Mapped[List["Message_Recipients"]] = relationship() # Mapped[List["Message_Recipient"]] = relationship(back_populates="message", lazy="joined")

class Message_Recipients(Base):
    __tablename__ = 'message_recipients'

    id: Mapped[str] = mapped_column(primary_key=True)
    message_id: Mapped[str] = mapped_column(String, ForeignKey("messages.id"))
    recipient: Mapped[str] = mapped_column(String)
    read: Mapped[bool] = mapped_column(Integer)
    message: Mapped["Messages"] = relationship(back_populates="message_recipients")

class Ideas(Base):
    __tablename__ = 'ideas'

    id: Mapped[str] = mapped_column(primary_key=True)
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    color: Mapped[str] = mapped_column(String)
    likes: Mapped[int] = mapped_column(Integer)
    creator_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    url: Mapped[Optional[str]] = mapped_column(String)
    img: Mapped[Optional[str]] = mapped_column(String)
    cost: Mapped[Optional[int]] = mapped_column(Integer)
    cost_type: Mapped[Optional[str]] = mapped_column(String(5))