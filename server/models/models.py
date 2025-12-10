from sqlalchemy.orm import DeclarativeBase, Mapped, relationship, column_property, mapped_column
from sqlalchemy import ForeignKey, String, Integer, Float, select, func
from typing import Optional, List

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
    user: Mapped["Debtors"] = relationship(back_populates="debtor")
    user: Mapped["Expenses"] = relationship(back_populates="paid_by")  
    assigned_tasks: Mapped[List["Tasks"]] = relationship("Tasks", foreign_keys="Tasks.assignee_id", back_populates="assignee")
    created_tasks: Mapped[List["Tasks"]] = relationship("Tasks", foreign_keys="Tasks.creator_id", back_populates="creator")
    message_sender: Mapped["Messages"] = relationship("Messages", foreign_keys="Messages.sender_id", back_populates="sender")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, firstName={self.first_name!r})"

class Trips(Base):
    __tablename__ = "trips"

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    attendees: Mapped[List["Attendees"]] = relationship()
    location: Mapped[str] = mapped_column(String(256))
    description: Mapped[str] = mapped_column(String(512))
    start_date: Mapped[str] = mapped_column(String(20))
    end_date: Mapped[Optional[str]] = mapped_column(String(20))

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
    sender_id: Mapped[str] = mapped_column(String(8), ForeignKey("users.id"))
    sender: Mapped['Users'] = relationship(lazy="joined")
    message_recipients: Mapped[List["Message_Recipients"]] = relationship() 

class Message_Recipients(Base):
    __tablename__ = 'message_recipients'

    id: Mapped[str] = mapped_column(primary_key=True)
    message_id: Mapped[str] = mapped_column(String, ForeignKey("messages.id"))
    recipient_id: Mapped[str] = mapped_column(String)
    read: Mapped[int] = mapped_column(Integer)
    message: Mapped["Messages"] = relationship(back_populates="message_recipients")

class Idea_Likes(Base):
    __tablename__ = "idea_likes"

    id: Mapped[str] = mapped_column(primary_key=True)
    idea_id: Mapped[str] = mapped_column(String)
    attendee_id: Mapped[str] = mapped_column(String)
    like: Mapped[bool] = mapped_column(Integer)

class Ideas(Base):
    __tablename__ = 'ideas'

    id: Mapped[str] = mapped_column(primary_key=True)
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    color: Mapped[str] = mapped_column(String)
    likes = column_property(select(func.count(Idea_Likes.like)).where(Idea_Likes.idea_id == id).where(Idea_Likes.like == 1).correlate_except(Idea_Likes)
        .scalar_subquery())
    creator_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    url: Mapped[Optional[str]] = mapped_column(String)
    img: Mapped[Optional[str]] = mapped_column(String)
    cost: Mapped[Optional[int]] = mapped_column(Integer)
    cost_type: Mapped[Optional[str]] = mapped_column(String(5))

class Expenses(Base):
    __tablename__ = "expenses"

    id: Mapped[str] = mapped_column(primary_key=True)
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    name: Mapped[str] = mapped_column(String) 
    paid_by_id: Mapped[str] = mapped_column(String, ForeignKey("users.id")) 
    paid_by: Mapped["Users"] = relationship(lazy="joined")
    total: Mapped[int] = mapped_column(Integer) 
    split: Mapped[str] = mapped_column(String(6)) 
    settled: Mapped[bool] = mapped_column(Integer)
    owe: Mapped[List[any]] = relationship("Debtors", back_populates="expense")
    due: Mapped[str] = mapped_column(String(9)) 
    date: Mapped[str] = mapped_column(String(20)) 
    notes: Mapped[Optional[str]] = mapped_column(String)

class Debtors(Base): # go back to singular
    __tablename__ = "debtors"

    id: Mapped[str] = mapped_column(primary_key=True)
    expense_id: Mapped[str] = mapped_column(String, ForeignKey("expenses.id"))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    debtor: Mapped["Users"] = relationship(lazy="joined")
    owes: Mapped[float] = mapped_column(Float)
    paid: Mapped[bool] = mapped_column(Integer)
    expense = relationship("Expenses", back_populates="owe")

class Tasks(Base):
    __tablename__ = "tasks"
    id: Mapped[str] = mapped_column(primary_key=True)
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String(7))
    due_date: Mapped[str] = mapped_column(String(20))
    multiple: Mapped[int] = mapped_column(Integer)
    assignee_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    assignee: Mapped["Users"] = relationship("Users", foreign_keys=[assignee_id], back_populates="assigned_tasks", lazy="joined")
    creator_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    creator: Mapped["Users"] = relationship("Users", foreign_keys=[creator_id], back_populates="created_tasks", lazy="joined")
    completed: Mapped[int] = mapped_column(Integer)
    notes: Mapped[str] = mapped_column(String)
    poll_question: Mapped[str] = mapped_column(String)
    options: Mapped[List[str]] = relationship("Poll_Task_Options", back_populates="task")

class Poll_Task_Options(Base):
    __tablename__ = "poll_task_options"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    task_id: Mapped[str] = mapped_column(String, ForeignKey("tasks.id"))
    label: Mapped[str] = mapped_column(String)
    votes: Mapped[int] = mapped_column(Integer)
    task: Mapped["Tasks"] = relationship("Tasks", back_populates="options")

class Activities(Base):
    __tablename__ = "activities"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    trip_id: Mapped[str] = mapped_column(String, ForeignKey("trips.id"))
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    location: Mapped[str] = mapped_column(String)    
    start_time: Mapped[str] = mapped_column(String(20))    
    end_time: Mapped[str] = mapped_column(String(20))
    color: Mapped[str] = mapped_column(String)
