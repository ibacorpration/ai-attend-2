from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.db.session import get_db
from backend.core.deps import get_current_admin
from backend.db.models import AdminUser
from backend.services.attendance_service import AttendanceService
from backend.schemas.attendance import AttendanceResponse
from pydantic import BaseModel

router = APIRouter()
attendance_service = AttendanceService()

class ReviewAction(BaseModel):
    action: str # "approve" or "reject"

@router.get("/", response_model=List[AttendanceResponse])
def get_reviews(
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin),
):
    return attendance_service.get_reviews(db)

@router.patch("/{attendance_id}", response_model=AttendanceResponse)
def handle_review(
    attendance_id: int,
    payload: ReviewAction,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin),
):
    if payload.action not in ["approve", "reject"]:
        raise HTTPException(status_code=400, detail="Invalid action")
        
    result = attendance_service.update_review_status(db, attendance_id, payload.action)
    if not result:
        raise HTTPException(status_code=404, detail="Attendance record not found")
        
    return result
