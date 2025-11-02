import uuid
from fastapi import Depends, APIRouter

from models.models import Expenses, Debtors, Attendees, Trips, Users
from schemas import FullExpense
from utils.is_valid_user import is_valid_user

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

from utils.flatten import flatten_expense
from utils.get_user_db import get_user_db

router = APIRouter(tags=["expenses"])

def add_ids(debtor, expense_id):
    debtor_dict = debtor.dict(exclude_unset=True)
    return { **debtor_dict, "expense_id": expense_id, "id": uuid.uuid4().hex[:4]}

@router.get("/user/{user_id}/trip/{trip_id}/expenses") 
async def get_expenses(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    expenses = []

    stmt = select(Expenses, Attendees).options(selectinload(Expenses.owe)).select_from(Expenses).join(Trips).join(Attendees).join(Users).where(Expenses.trip_id == trip_id).where(Attendees.attendee_id == user_id) # is users needed?

    for expense in db.scalars(stmt):
        flattened_expense = flatten_expense(expense)

        expenses.append(flattened_expense)

    return {"expenses": expenses}

@router.post("/user/{user_id}/trip/{trip_id}/expense/create")
async def create_expense(user_id: str, trip_id: str, expense: FullExpense, db: Session = Depends(get_user_db)):    
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}
    
    expense_id = uuid.uuid4().hex[:8]

    expense_dict = expense['expense'].dict(exclude_unset=True)
    expense_with_id = { **expense_dict, "id": expense_id}

    debtors = list(map(lambda x: add_ids(x, expense_id), expense['debtors']))

    # write
    expense_insert_stmt = insert(Expenses).values(**expense_with_id)
    debtors_insert_stmt = insert(Debtors).values(debtors)

    db.execute(expense_insert_stmt)
    db.execute(debtors_insert_stmt)

    db.flush()

    return {"status": "created", "id": expense_id}

@router.patch("/user/{user_id}/trip/{trip_id}/expense/update")
async def update_expense(user_id: str, trip_id: str, expense: FullExpense, db: Session = Depends(get_user_db)):
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}

    updated_expense = expense["expense"]
    debtors = list(map(lambda x: add_ids(x, updated_expense.id), expense['debtors']))

    # write
    expense_update_stmt = update(Expenses).where(Expenses.id == updated_expense.id).values(updated_expense.dict())
    debtors_delete_stmt = delete(Debtors).where(Debtors.expense_id == updated_expense.id)
    debtors_insert_stmt = insert(Debtors).values(debtors)

    db.execute(expense_update_stmt)
    db.execute(debtors_delete_stmt)
    db.execute(debtors_insert_stmt)

    db.flush()

    return {"status": "updated", "id": updated_expense.id}


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


