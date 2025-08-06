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