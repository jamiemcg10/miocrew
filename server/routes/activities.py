from fastapi import Depends, APIRouter

from models.models import Events, Attendees

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session

from utils.flatten import flatten_event
from utils.get_user_db import get_user_db

router = APIRouter(tags=["activities"])
# TODO: Change events to activities

@router.get("/user/{user_id}/trip/{trip_id}/activities")
async def activities(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    activities = []

    stmt = select(Events).select_from(Events).join(Attendees, Events.trip_id == Attendees.trip_id).where(Events.trip_id == trip_id).where(Attendees.attendee_id == user_id)

    for activity in db.scalars(stmt):
        activities.append(flatten_event(activity))

    return {"activities": activities}