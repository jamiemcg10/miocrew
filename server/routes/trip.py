from typing import List
from fastapi import Depends, APIRouter
from sqlalchemy import select, insert, delete
from sqlalchemy.orm import Session, selectinload

from models.models import Trips, Attendees

from utils.get_user_db import get_user_db
from utils.is_valid_user import is_valid_user
from utils.flatten import flatten_trip

import uuid

router = APIRouter(tags=["trip"])

@router.get("/user/{user_id}/trip/{trip_id}/")
async def trip(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id).where(Trips.id == trip_id)

    trip = db.scalar(stmt)

    return { "trip": flatten_trip(trip) }

@router.post("/user/{user_id}/trip/{trip_id}/crew/add")
async def add_crew(user_id: str, trip_id: str, new_crew: List[str], db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}
    
    print(new_crew)

    mapped_new_crew = list(map(lambda x: {"id": uuid.uuid4().hex[:8],"trip_id": trip_id, "attendee_id": x, "type": "Crew"}, new_crew)) 

    print('mapped_new_crew', mapped_new_crew)

    # id, trip_id, attendee_id, type
    add_crew_stmt = insert(Attendees).values(mapped_new_crew)

    db.execute(add_crew_stmt)
    db.flush()
    
    return {"status": "crew added"}

@router.delete("/user/{user_id}/trip/{trip_id}/crew/remove/{attendee_id}")
async def remove_crew(user_id: str, trip_id: str, attendee_id: str, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    delete_crew_stmt = delete(Attendees).where(Attendees.trip_id == trip_id).where(Attendees.attendee_id == attendee_id)

    db.execute(delete_crew_stmt)
    db.flush()
    
    return {"status": "crew removed"}