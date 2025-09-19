from typing import Optional
from pydantic import BaseModel

class IdeasBase(BaseModel):
    id: Optional[str] = None
    trip_id: str
    name: str
    cost: Optional[float]
    cost_type: Optional[str]
    url: Optional[str]
    img: Optional[str]
    description: Optional[str]
    color: str
    likes: int
    creator_id: str

    model_config = {
        "from_attributes": True 
    }

class ActivitiesBase(BaseModel):
    id: Optional[str] = None
    trip_id: str
    name: str
    description: Optional[str]
    location: Optional[str]
    start_time: str
    end_time: Optional[str]
    color: str

    model_config = {
        "from_attributes": True 
    }
