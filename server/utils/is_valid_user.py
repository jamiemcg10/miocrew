from models.models import Trips, Attendees
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

def is_valid_user(user_id: str, trip_id: str, db: Session):
    # Check that user belongs to trip
    valid_request_stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id).where(Trips.id == trip_id)
    valid_request = db.scalar(valid_request_stmt)

    return valid_request