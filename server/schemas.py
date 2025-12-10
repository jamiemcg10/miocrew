from typing import Optional, TypedDict, List
from pydantic import BaseModel

class TripBase(BaseModel):
    name: str
    location: str
    description: str
    start_date: str
    end_date: Optional[str] = None
    ids: List[str]

class RecipientBase(BaseModel):
    name: str
    id: str
    type: str

    model_config = {
        "from_attributes": True
    }

class MessageBase(BaseModel):
    id: Optional[str] = None
    recipients: List[RecipientBase]
    subject: str
    body: str
    sender_id: Optional[str] = None

    model_config = {
        "from_attributes": True
    }

class StatusUpdateBase(BaseModel):
    read_status: bool

class IdeasBase(BaseModel):
    id: Optional[str] = None
    trip_id: str
    name: str
    cost: Optional[float]
    cost_type: Optional[str]
    url: Optional[str]
    img: Optional[str]
    description: Optional[str]
    color: str
    likes: int
    creator_id: str

    model_config = {
        "from_attributes": True 
    }

class IdeaLikesBase(BaseModel):
    id: Optional[str] = None 
    attendee_id: str
    idea_id: str
    like: bool

class ActivitiesBase(BaseModel):
    id: Optional[str] = None
    trip_id: str
    name: str
    description: Optional[str]
    location: Optional[str]
    start_time: str
    end_time: Optional[str]
    color: str

    model_config = {
        "from_attributes": True 
    }

class ExpensesBase(BaseModel):
    id: Optional[str] = None
    trip_id: str
    name: str
    paid_by_id: str
    total: float
    split: str
    settled: bool
    due: str
    date: str
    notes: str

    model_config = {
        "from_attributes": True
    }

class DebtorsBase(BaseModel):
    id: Optional[str] = None
    expense_id: Optional[str] = None
    user_id: str
    owes: float
    paid: bool

class FullExpense(TypedDict): # TODO: make Base
    expense: ExpensesBase
    debtors: List[DebtorsBase]

class PollTaskOptionBase(BaseModel):
    id: Optional[str] = None
    task_id: Optional[str] = None
    label: str
    votes: int

class TaskBase(BaseModel):
    id: Optional[str] = None
    trip_id: str
    name: str
    description: Optional[str] = None
    type: str
    due_date: Optional[str] = None
    assignee_id: str
    creator_id: str
    completed: bool
    notes: Optional[str] = None
    multiple: Optional[bool] = None
    poll_question: Optional[str] = None

class TaskUpdate(BaseModel):
    id: str
    trip_id: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    due_date: Optional[str] = None
    assignee_id: Optional[str] = None
    creator_id: Optional[str] = None
    completed: Optional[bool] = None
    notes: Optional[str] = None
    multiple: Optional[bool] = None
    poll_question: Optional[str] = None


class FullTaskBase(TypedDict):
    task: TaskBase
    poll_options: Optional[List[PollTaskOptionBase]] = None

class FullTaskUpdate(TypedDict):
    task: TaskUpdate
    poll_options: Optional[List[PollTaskOptionBase]] = None