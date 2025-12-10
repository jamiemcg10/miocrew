from fastapi import Depends, APIRouter

from models.models import Trips, Attendees, Ideas, Idea_Likes
from schemas import IdeasBase, IdeaLikesBase
from utils.is_valid_user import is_valid_user
from utils.flatten import flatten_idea
from utils.get_user_db import get_user_db

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session
from sqlalchemy.dialects.sqlite import insert as upsert

import uuid

router = APIRouter(tags=["ideas"])


@router.get("/user/{user_id}/trip/{trip_id}/ideas/")
async def ideas(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    ideas = []

    stmt = select(Ideas, Attendees).select_from(Ideas).join(Trips).join(Attendees).where(Ideas.trip_id == Trips.id).where(trip_id == Ideas.trip_id).where(Attendees.attendee_id == user_id)

    results = db.execute(stmt).all()

    for idea, attendee in results: 
        flattened_idea = flatten_idea(idea, attendee)
        ideas.append(flattened_idea)

    return {"ideas": ideas}

@router.get("/user/{user_id}/trip/{trip_id}/ideas/likes")
async def idea_likes(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    stmt = select(Idea_Likes).join(Ideas, Idea_Likes.idea_id == Ideas.id).where(Idea_Likes.attendee_id == user_id).where(Ideas.trip_id == trip_id)

    results = db.execute(stmt).scalars().all()

    idea_likes = [x.idea_id for x in results if x.like == 1]

    return {"idea_likes": idea_likes}

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

    # write
    update_stmt = update(Ideas).where(Ideas.id == idea.id).values(idea.dict())
    db.execute(update_stmt)
    db.flush()

    return {"status": "updated", "id": idea.id}

@router.patch("/user/{user_id}/trip/{trip_id}/idea/toggle_like")
async def toggle_like(user_id: str, trip_id: str, like: IdeaLikesBase, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}
    
    upsert_stmt = upsert(Idea_Likes).values({**like.dict(), "id": uuid.uuid4().hex[:8]}).on_conflict_do_update(index_elements=["attendee_id", "idea_id"], set_={"like": 1 if like.like == True else 0})

    db.execute(upsert_stmt)
    db.flush()

@router.delete("/user/{user_id}/trip/{trip_id}/idea/{idea_id}/delete")
async def delete_idea(user_id: str, trip_id: str, idea_id: str, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    # write
    delete_stmt = delete(Ideas).where(Ideas.id == idea_id)
    db.execute(delete_stmt)
    db.flush()

    return {"status": "deleted", "id": idea_id}