def flatten_attendee(attendee):
    return {
        "id": attendee.id,
        "attendee_id": attendee.attendee_id,
        "type": attendee.type,
        "trip_id": attendee.trip_id,
        "color": attendee.user.color,
        "email": attendee.user.email,
        "lastName": attendee.user.last_name,
        "firstName": attendee.user.first_name,
        "avatar": attendee.user.avatar
    }

def flatten_trip(trip):
    return {
        "id": trip.id,
        "name": trip.name,
        "attendees": [flatten_attendee(a) for a in trip.attendees],
        "startDate": trip.start_date,
        "endDate": trip.end_date
    }

def flatten_message(message):
    return {
        "recipientId": message.recipient,
        "read": message.read,
        "senderId": message.message.sender,
        "id": message.message.id,
        "subject": message.message.subject,
        "body": message.message.body
        }