import uuid
from fastapi import Depends, APIRouter

from models.models import Message_Recipients, Messages, Attendees
from schemas import MessageBase
from utils.is_valid_user import is_valid_user

from sqlalchemy import select, insert, delete
from sqlalchemy.orm import Session

from utils.flatten import flatten_message
from utils.get_user_db import get_user_db

router = APIRouter(tags=["messages"])

def add_ids(recipient, msg_id):
    return {"recipient": recipient, "message_id": msg_id, "id": uuid.uuid4().hex[:4], "read": False}

@router.get("/user/{user_id}/messages/")
async def get_messages(user_id: str, db: Session = Depends(get_user_db)):
    messages = []

    stmt = select(Message_Recipients).where(Message_Recipients.recipient == user_id)

    for msg in db.scalars(stmt):
        flattened_msg = flatten_message(msg)

        messages.append(flattened_msg)

    return {"messages": messages}

@router.post("/user/{user_id}/message/create")
async def create_message(user_id: str, message: MessageBase, db: Session = Depends(get_user_db)):    
    msg_id = uuid.uuid4().hex[:8]

    msg_with_id = { "subject": message.subject, "body": message.body, "sender_id": user_id, "id": msg_id}

    user_recipients = [x.id for x in message.recipients if x.type == 'user'] 
    trip_recipients =  [x.id for x in message.recipients if x.type == 'trip'] 

    print('trip_recipients', trip_recipients)

    trip_attendee_stmt = select(Attendees.attendee_id).where(Attendees.trip_id.in_(trip_recipients))
    trip_attendees = db.execute(trip_attendee_stmt).all()

    unpacked_attendees = list(map(lambda x: x[0], trip_attendees))
    print('unpacked_attendees', unpacked_attendees)

    all_recipients = list(set(unpacked_attendees + user_recipients))
    print('all_recipients', all_recipients)
    # TODO: change recipient to recipient_id


    mapped_recipients = list(map(lambda x: add_ids(x, msg_id), all_recipients))

    print('mapped_recipients', mapped_recipients)

    # write
    message_insert_stmt = insert(Messages).values(**msg_with_id)
    recipients_insert_stmt = insert(Message_Recipients).values(mapped_recipients)

    db.execute(message_insert_stmt)
    db.execute(recipients_insert_stmt)

    db.flush()

    return {"status": "sent", "id": msg_id}

@router.delete("/user/{user_id}/trip/{trip_id}/expense/{expense_id}/delete")
async def delete_expense(user_id: str, trip_id: str, expense_id: str, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    # delete
    expense_delete_stmt = delete(Expenses).where(Expenses.id == expense_id)
    debtors_delete_stmt = delete(Debtors).where(Debtors.expense_id == expense_id)

    db.execute(expense_delete_stmt)
    db.execute(debtors_delete_stmt)
    db.flush()

    return {"status": "deleted", "id": expense_id}


