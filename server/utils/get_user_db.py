import sqlite3

from fastapi import Request, Response
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

BASE_DB = "miocrew.db"
user_dbs: dict[str, Session] = {}

# TODO: Delete stale dbs


def get_user_db(request: Request, _response: Response):
    # Check for existing session_id cookie
    session_id = request.cookies.get("session_id")

    # Ensure a scratch db exists for this user
    if session_id not in user_dbs:
        user_dbs[session_id] = make_scratch_session()

    return user_dbs[session_id]

def make_scratch_session() -> Session:
    dest = sqlite3.connect(":memory:", check_same_thread=False)

    # Copy db into memory
    src = sqlite3.connect(BASE_DB)
    src.backup(dest)
    src.close()

    # Build SQLAlchhemy engine bound to this connection
    engine = create_engine("sqlite://", creator=lambda: dest, future=True, echo=False)
    SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
    return SessionLocal()
