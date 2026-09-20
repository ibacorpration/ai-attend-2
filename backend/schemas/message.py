from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class MessageCreate(BaseModel):
    body: str

class MessageResponse(BaseModel):
    id: int
    employee_id: int
    sender: str
    body: str
    created_at: datetime
    read_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)
