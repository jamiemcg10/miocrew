from fastapi import Depends, APIRouter

from models.models import Trips, Attendees, Ideas
from schemas import IdeasBase
from utils.flatten import flatten_idea
from utils.get_user_db import get_user_db

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

import uuid

router = APIRouter(tags=["ideas"])

BASE_DB = "miocrew.db"
user_dbs: dict[str, Session] = {}

def is_valid_user(user_id: str, trip_id: str, db: Session):
    # Check that user belongs to trip
    valid_request_stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id).where(Trips.id == trip_id)
    valid_request = db.scalar(valid_request_stmt)

    return valid_request


@router.get("/user/{user_id}/trip/{trip_id}/ideas/")
async def ideas(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    ideas = []

    stmt = select(Ideas, Attendees).select_from(Ideas).join(Trips).join(Attendees).where(Ideas.trip_id == Trips.id).where(trip_id == Ideas.trip_id).where(Attendees.attendee_id == user_id)

    results = db.execute(stmt).all()

    for idea, attendee in results: 
        flattened_idea = flatten_idea(idea, attendee)
        ideas.append(flattened_idea)

    return {"ideas": ideas}

@router.post("/user/{user_id}/trip/{trip_id}/ideas/create")
async def create_idea(user_id: str, trip_id: str, idea: IdeasBase, db: Session = Depends(get_user_db)):
    id = uuid.uuid4().hex[:8]
    idea_dict= idea.dict(exclude_unset=True)
    ideas_with_id = { **idea_dict, "id": id}

    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}


    # write
    insert_stmt = insert(Ideas).values(**ideas_with_id)
    db.execute(insert_stmt)
    db.flush()

    return {"status": "created", "id": id}

@router.patch("/user/{user_id}/trip/{trip_id}/idea/update")
async def update_idea(user_id: str, trip_id: str, idea: IdeasBase, db: Session = Depends(get_user_db)):
    
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    print(idea.dict())
    
    # write
    update_stmt = update(Ideas).where(Ideas.id == idea.id).values(idea.dict())
    db.execute(update_stmt)
    db.flush()

    return {"status": "updated", "id": idea.id}

@router.delete("/user/{user_id}/trip/{trip_id}/idea/{idea_id}/delete")
async def delete_idea(user_id: str, trip_id: str, idea_id: str, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    # write
    delete_stmt = delete(Ideas).where(Ideas.id == idea_id)
    db.execute(delete_stmt)
    db.flush()

    return {"status": "deleted", "id": idea_id}