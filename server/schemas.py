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