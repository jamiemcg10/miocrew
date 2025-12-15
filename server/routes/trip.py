from typing import List, Literal
from fastapi import Depends, APIRouter
from schemas import TripBase
from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session, selectinload

from models.models import Trips, Attendees

from utils.get_user_db import get_user_db
from utils.is_valid_user import is_valid_user
from utils.flatten import flatten_trip

import uuid

router = APIRouter(tags=["trip"])

def map_id_to_attendee(id: str, trip_id: str, type: Literal["Crew", "Admin", "Owner"]):
    return { "id": uuid.uuid4().hex[:8],
            "trip_id": trip_id, 
            "attendee_id": id, 
            "type": type }

@router.get("/user/{user_id}/trips/")
async def trips(user_id: str, db: Session = Depends(get_user_db)):
    # need table to attach trips to users - done, make sure it works
    stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id)
    trips = []


    for trip in db.scalars(stmt):
        flattened_trip = flatten_trip(trip)

        trips.append(flattened_trip)

    return {'trips': trips}

@router.get("/user/{user_id}/trip/{trip_id}/")
async def trip(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    stmt = select(Trips).options(selectinload(Trips.attendees)).join(Attendees).where(Attendees.attendee_id == user_id).where(Trips.id == trip_id)

    trip = db.scalar(stmt)

    return { "trip": flatten_trip(trip) }


@router.post("/user/{user_id}/trip/create")
async def create_trip(user_id: str, trip: TripBase, db: Session = Depends(get_user_db)):
    id = uuid.uuid4().hex[:8]

    trip_values = { "id": id, 
                   "name": trip.name, 
                   "location": trip.location, 
                   "description": trip.description,
                   "start_date": trip.start_date,
                   "end_date": trip.end_date}
    
    mapped_new_crew = list(map(lambda x: map_id_to_attendee(x, id, "Crew"), trip.ids)) 
    mapped_new_crew.append(map_id_to_attendee(user_id, id, "Owner"))
 
    trip_stmt = insert(Trips).values(trip_values)
    add_crew_stmt = insert(Attendees).values(mapped_new_crew)

    db.execute(trip_stmt)
    db.execute(add_crew_stmt)
   
    db.flush()

    return {"status": "trip created"}

@router.post("/user/{user_id}/trip/{trip_id}/crew/add")
async def add_crew(user_id: str, trip_id: str, new_crew: List[str], db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}
    
    mapped_new_crew = list(map(lambda x: map_id_to_attendee(x, trip_id, "Crew"), new_crew)) 

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

@router.patch("/user/{user_id}/trip/{trip_id}/crew/toggle/{type}/{attendee_id}")
async def toggle_crew_type(user_id: str, trip_id: str, type: str, attendee_id: str, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}
    
    toggle_crew_stmt = update(Attendees).where(Attendees.trip_id == trip_id).where(Attendees.attendee_id == attendee_id).values({"type": type})

    db.execute(toggle_crew_stmt)
    db.flush()

    return {"status": "crew status updated"}