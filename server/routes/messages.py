from typing import List
import uuid
from fastapi import Depends, APIRouter

from models.models import Message_Recipients, Messages, Attendees
from schemas import MessageBase, StatusUpdateBase

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session

from utils.flatten import flatten_message
from utils.get_user_db import get_user_db

router = APIRouter(tags=["messages"])

def add_ids(recipient, msg_id):
    return {"recipient_id": recipient, "message_id": msg_id, "id": uuid.uuid4().hex[:4], "read": False}

@router.get("/user/{user_id}/messages/")
async def get_messages(user_id: str, db: Session = Depends(get_user_db)):
    messages = []

    stmt = select(Message_Recipients).where(Message_Recipients.recipient_id == user_id)

    for msg in db.scalars(stmt):
        flattened_msg = flatten_message(msg)

        messages.append(flattened_msg)

    return {"messages": messages}

@router.post("/user/{user_id}/message/create")
async def create_message(user_id: str, message: MessageBase, db: Session = Depends(get_user_db)):    
    msg_id = uuid.uuid4().hex[:8]

    msg_with_id = { "subject": message.subject, "body": message.body, "sender_id": user_id, "id": msg_id, "sent_date": message.sent_date}

    user_recipients = [x.id for x in message.recipients if x.type == 'user'] 
    trip_recipients =  [x.id for x in message.recipients if x.type == 'trip'] 

    trip_attendee_stmt = select(Attendees.attendee_id).where(Attendees.trip_id.in_(trip_recipients))
    trip_attendees = db.execute(trip_attendee_stmt).all()

    unpacked_attendees = list(map(lambda x: x[0], trip_attendees))

    all_recipients = list(set(unpacked_attendees + user_recipients))

    mapped_recipients = list(map(lambda x: add_ids(x, msg_id), all_recipients))

    # write
    message_insert_stmt = insert(Messages).values(**msg_with_id)
    recipients_insert_stmt = insert(Message_Recipients).values(mapped_recipients)

    db.execute(message_insert_stmt)
    db.execute(recipients_insert_stmt)

    db.flush()

    return {"status": "sent", "id": msg_id}

@router.patch("/user/{user_id}/message/{message_id}/change_read_status")
async def change_read_status(user_id: str, message_id: str, status: StatusUpdateBase, db: Session = Depends(get_user_db)):   
    status_update_stmt = update(Message_Recipients).where(Message_Recipients.message_id == message_id).where(Message_Recipients.recipient_id == user_id).values({"read": status.read_status})

    db.execute(status_update_stmt)
    db.flush()

    return {"status": "deleted", "id": message_id}

@router.patch("/user/{user_id}/message/bulk/change_read_status/{status}")
async def change_bulk_read_status(user_id: str, status: str, message_ids: List[str], db: Session = Depends(get_user_db)):   
    status_update_stmt = update(Message_Recipients).where(Message_Recipients.message_id.in_(message_ids)).where(Message_Recipients.recipient_id == user_id).values({"read": True if status == 'read' else False})

    db.execute(status_update_stmt)
    db.flush()

    return {"status": "marked {status}", "ids": message_ids}

@router.delete("/user/{user_id}/message/{message_id}/delete")
async def delete_message(user_id: str, message_id: str, db: Session = Depends(get_user_db)):
    # delete
    recipient_delete_stmt = delete(Message_Recipients).where(Message_Recipients.recipient_id == user_id).where(Message_Recipients.message_id == message_id)

    db.execute(recipient_delete_stmt)
    db.flush()

    return {"status": "deleted", "id": message_id}

@router.delete("/user/{user_id}/message/delete") # bulk delete url designed to avoid conflict with single delete url
async def bulk_delete_messages(user_id: str, message_ids: List[str], db: Session = Depends(get_user_db)):   
    recipient_delete_stmt = delete(Message_Recipients).where(Message_Recipients.message_id.in_(message_ids)).where(Message_Recipients.recipient_id == user_id)

    db.execute(recipient_delete_stmt)
    db.flush()

    return {"status": "deleted", "ids": message_ids}
    