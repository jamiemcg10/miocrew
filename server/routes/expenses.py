import uuid
from fastapi import Depends, APIRouter

from models.models import Expenses, Expenses_Owe, Attendees, Trips, Users
from schemas import FullExpense
from utils.is_valid_user import is_valid_user

from sqlalchemy import select, insert, delete, update
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

from utils.flatten import flatten_expense
from utils.get_user_db import get_user_db

router = APIRouter(tags=["expenses"])

@router.get("/user/{user_id}/trip/{trip_id}/expenses") 
async def get_expenses(user_id: str, trip_id: str, db: Session = Depends(get_user_db)):
    expenses = []

    stmt = select(Expenses, Attendees).options(selectinload(Expenses.owe)).select_from(Expenses).join(Trips).join(Attendees).join(Users).where(Expenses.trip_id == trip_id).where(Attendees.attendee_id == user_id) # is users needed?

    for expense in db.scalars(stmt):
        flattened_expense = flatten_expense(expense)

        expenses.append(flattened_expense)

    return {"expenses": expenses}

@router.post("/user/{user_id}/trip/{trip_id}/expenses/create")
async def create_expense(user_id: str, trip_id: str, expense: FullExpense, db: Session = Depends(get_user_db)):
    def add_ids(debtor):
        print(id)
        debtor_dict = debtor.dict(exclude_unset=True)
        return { **debtor_dict, "expense_id": id, "id": uuid.uuid4().hex[:4]}
    
    if not is_valid_user(user_id, trip_id, db):
        return {"status": "invalid request"}
    
    id = uuid.uuid4().hex[:8]

    print(expense)

    expense_dict = expense['expense'].dict(exclude_unset=True)
    expense_with_id = { **expense_dict, "id": id}

    debtors = list(map(add_ids, expense['debtors']))

    # write
    expense_insert_stmt = insert(Expenses).values(**expense_with_id)
    expense_owe_insert_stmt = insert(Expenses_Owe).values(debtors)

    db.execute(expense_insert_stmt)
    db.execute(expense_owe_insert_stmt)

    db.flush()

    return {"status": "created", "id": id}

# @router.patch("/user/{user_id}/trip/{trip_id}/expense/update")
# async def update_expense(user_id: str, trip_id: str, expense: FullExpense, db: Session = Depends(get_user_db)):
#     if not is_valid_user(user_id, trip_id, db):
#         return {"status": "invalid request"}

#     updated_expense = expense["expense"]
#     debtors = list(expense['debtors'])

#     # write
#     expense_update_stmt = update(Expenses).where(Expenses.id == updated_expense.id).values(updated_expense.dict())
#     expense_owe_update_stmt = insert(Expenses_Owe).values(debtors)

#     db.execute(expense_update_stmt)
#     db.execute(expense_owe_update_stmt)

#     db.flush()

#     return {"status": "updated", "id": expense.id}


# @router.delete("/user/{user_id}/trip/{trip_id}/expense/{expense_id}/delete")
# async def delete_expense(user_id: str, trip_id: str, expense_id: str, db: Session = Depends(get_user_db)):
#     if not is_valid_user(user_id, trip_id, db):
#         return {"status": "invalid request"}

#     # delete
#     expense_delete_stmt = delete(Expenses).where(Expenses.id == expense_id)
#     expense_owe_delete_stmt = delete(Expenses_Owe).where(Expenses_Owe.expense_id == expense_id)

#     db.execute(expense_delete_stmt)
#     db.execute(expense_owe_delete_stmt)
#     db.flush()

#     return {"status": "deleted", "id": expense_id}


