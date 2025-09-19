import uuid
from fastapi import Depends, APIRouter

from models.models import Activities, Attendees
from schemas import ActivitiesBase
from utils.is_valid_user import is_valid_user

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session

from utils.flatten import flatten_activity
from utils.get_user_db import get_user_db

router = APIRouter(tags=["activities"])

@router.get("/user/{user_id}/trip/{trip_id}/activities")
async def activities(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    activities = []

    stmt = select(Activities).select_from(Activities).join(Attendees, Activities.trip_id == Attendees.trip_id).where(Activities.trip_id == trip_id).where(Attendees.attendee_id == user_id)

    for activity in db.scalars(stmt):
        activities.append(flatten_activity(activity))

    return {"activities": activities}

@router.post("/user/{user_id}/trip/{trip_id}/activities/create")
async def create_activity(user_id: str, trip_id: str, activity: ActivitiesBase, db: Session = Depends(get_user_db)):
    id = uuid.uuid4().hex[:8]
    activity_dict= activity.dict(exclude_unset=True)
    activity_with_id = { **activity_dict, "id": id}

    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}


    # write
    insert_stmt = insert(Activities).values(**activity_with_id)
    db.execute(insert_stmt)
    db.flush()

    return {"status": "created", "id": id}

@router.patch("/user/{user_id}/trip/{trip_id}/activity/update")
async def update_activity(user_id: str, trip_id: str, activity: ActivitiesBase, db: Session = Depends(get_user_db)):
    
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    # write
    update_stmt = update(Activities).where(Activities.id == activity.id).values(activity.dict())
    db.execute(update_stmt)
    db.flush()

    return {"status": "updated", "id": activity.id}

@router.delete("/user/{user_id}/trip/{trip_id}/activity/{activity_id}/delete")
async def delete_activity(user_id: str, trip_id: str, activity_id: str, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    # write
    delete_stmt = delete(Activities).where(Activities.id == activity_id)
    db.execute(delete_stmt)
    db.flush()

    return {"status": "deleted", "id": activity_id}

