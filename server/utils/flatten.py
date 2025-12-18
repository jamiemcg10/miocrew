from functools import reduce
from utils.array_to_object import array_to_object

def flatten_attendee(attendee):
    return {
        "id": attendee.id,
        "attendeeId": attendee.attendee_id,
        "type": attendee.type,
        "trip_id": attendee.trip_id, # TODO: update this
        "color": attendee.user.color,
        "email": attendee.user.email,
        "lastName": attendee.user.last_name,
        "firstName": attendee.user.first_name,
        "avatar": attendee.user.avatar
    }

def flatten_user(user):
    return { 
        "avatar": user.avatar,
        "color": user.color, 
        "email": user.email,
        "firstName": user.first_name,
        "id": user.id,
        "lastName": user.last_name
    }

def flatten_trip(trip):
    return {
        "id": trip.id,
        "name": trip.name,
        "attendees": [flatten_attendee(a) for a in trip.attendees], # TODO: return as dict
        "startDate": trip.start_date,
        "endDate": trip.end_date
    }

def flatten_message(message):
    return {
        "recipientId": message.recipient_id,
        "read": bool(message.read),
        "senderId": message.message.sender_id,
        "id": message.message.id,
        "subject": message.message.subject,
        "body": message.message.body,
        "sender": flatten_user(message.message.sender)
        }

def flatten_idea(idea, attendee):
    return {
        "description": idea.description,
        "id": idea.id,
        "likes": idea.likes,
        "url": idea.url,
        "cost": idea.cost,
        "name": idea.name,
        "color": idea.color,
        "tripId": idea.trip_id,
        "creatorId": idea.creator_id,
        "creator": {
            "firstName": attendee.user.first_name,
            "lastName": attendee.user.last_name
        },
        "img": idea.img,
        "costType": idea.cost_type
    }

def flatten_debtor(debtor):
    return {
        "id": debtor.id,
        "owes": debtor.owes,
        "expenseId": debtor.expense_id,
        "userId": debtor.user_id,
        "paid": bool(debtor.paid),
        "firstName": debtor.debtor.first_name,
        "lastName": debtor.debtor.last_name,
        "color": debtor.debtor.color,
        "email": debtor.debtor.email
    }

def flatten_expense(expense): 
    return {
        "paidBy": {"id": expense.paid_by.id, "firstName": expense.paid_by.first_name, "lastName": expense.paid_by.last_name, "color": expense.paid_by.color},
        "id": expense.id,
        "split": expense.split,
        "due": expense.due,
        "notes": expense.notes,
        "name": expense.name,
        "tripId": expense.trip_id,
        "total": expense.total,
        "settled": bool(expense.settled),
        "date": expense.date,
        "owe": reduce(array_to_object, [flatten_debtor(debtor) for debtor in expense.owe], {})
    }

def flatten_poll_task_option(option):
    return {
        "label": option.label,
        "id": option.id,
        "taskId": option.task_id,
        "votes": option.votes
    }
    
def flatten_task(task):
    return {
        "assignee": flatten_user(task.assignee) if task.assignee else None, # maybe make this a crew member
        "assigneeId": task.assignee_id,
        "completed": bool(task.completed),
        "creator": flatten_user(task.creator),
        "creatorId":  task.creator_id,
        "description": task.description,
        "dueDate": task.due_date,
        "id": task.id,
        "multiple": bool(task.multiple),
        "name": task.name,
        "notes": task.notes,
        "pollQuestion": task.poll_question,
        "pollOptions": [flatten_poll_task_option(option) for option in task.options],
        "tripId": task.trip_id,
        "type": task.type
    }

def flatten_activity(activity):
    return {
        "id": activity.id,
        "tripId": activity.trip_id,
        "name": activity.name,
        "description": activity.description,
        "location": activity.location,
        "startTime": activity.start_time,
        "endTime": activity.end_time,
        "color": activity.color
    }