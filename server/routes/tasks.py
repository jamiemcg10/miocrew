
import uuid
from fastapi import APIRouter, Depends

from models.models import Tasks, Attendees, Poll_Task_Options

from schemas import FullTaskBase
from utils.is_valid_user import is_valid_user

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

from utils.flatten import flatten_task
from utils.get_user_db import get_user_db

router = APIRouter(tags=["tasks"])

def add_ids(option, task_id):
    option_dict = option.dict(exclude_unset=True)
    return {**option_dict, "task_id": task_id, "id": uuid.uuid4().hex[:4]}

@router.get("/user/{user_id}/trip/{trip_id}/tasks")
async def tasks(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    tasks = []

    stmt = select(Tasks).options(selectinload(Tasks.options)).select_from(Tasks).join(Attendees, Tasks.trip_id == Attendees.trip_id).where(Tasks.trip_id == trip_id).where(Attendees.attendee_id == user_id)

    for task in db.scalars(stmt):
        tasks.append(flatten_task(task))

    return {"tasks": tasks}

@router.post("/user/{user_id}/trip/{trip_id}/task/create")
async def create_task(user_id: str, trip_id: str, task: FullTaskBase, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return { "status": "Invalid request"}
    
    task_id = uuid.uuid4().hex[:8]

    task_dict = task['task'].dict(exclude_unset=True)
    task_with_id = { **task_dict, "id": task_id}

    task_insert_stmt = insert(Tasks).values(**task_with_id)

    db.execute(task_insert_stmt)

    if task['poll_options']:
    
        poll_options = list(map(lambda x: add_ids(x, task_id), task['poll_options']))

        options_insert_stmt = insert(Poll_Task_Options).values(poll_options)
        db.execute(options_insert_stmt)

    db.flush()

    return {"status": "created", "id": task_id}