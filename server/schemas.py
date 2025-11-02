from typing import Optional, TypedDict, List
from pydantic import BaseModel

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

class TaskBase(BaseModel):
    id: Optional[str] = None
    trip_id: str
    name: str
    description: Optional[str] = None
    type: str
    due_date: str
    multiple: bool
    assignee_id: str
    creator_id: str
    completed: bool
    notes: Optional[str] = None

class PollTaskOptionBase(BaseModel):
    id: Optional[str] = None
    task_id: Optional[str] = None
    label: str
    votes: int

class FullTaskBase(TypedDict):
    task: TaskBase
    poll_options: Optional[PollTaskOptionBase] = None