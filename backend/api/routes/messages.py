from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from backend.db.session import get_db
from backend.core.deps import get_current_admin
from backend.db.models import AdminUser, Message, Employee
from backend.schemas.message import MessageCreate, MessageResponse

router = APIRouter()

@router.post("/admin/employees/{employee_id}/messages", response_model=MessageResponse)
def create_message_for_employee(
    employee_id: int,
    message_in: MessageCreate,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    new_message = Message(
        employee_id=employee_id,
        sender="admin",
        body=message_in.body
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

@router.get("/employees/{employee_id}/messages", response_model=List[MessageResponse])
def get_employee_messages(
    employee_id: int,
    db: Session = Depends(get_db)
):
    # Public endpoint since employee authenticates via face scan and only has their ID
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    messages = db.query(Message).filter(Message.employee_id == employee_id).order_by(Message.created_at.desc()).all()
    return messages

@router.patch("/employees/{employee_id}/messages/{message_id}/read", response_model=MessageResponse)
def mark_message_read(
    employee_id: int,
    message_id: int,
    db: Session = Depends(get_db)
):
    # Public endpoint since employee authenticates via face scan and only has their ID
    message = db.query(Message).filter(Message.id == message_id, Message.employee_id == employee_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
        
    if not message.read_at:
        from datetime import datetime, timezone
        message.read_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(message)
        
    return message
