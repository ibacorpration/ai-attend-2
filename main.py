from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from backend.core.config import settings
from backend.db.database import init_db, engine
from sqlalchemy import text
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database
    init_db()
    
    # Initialize default admin user
    from backend.db.database import SessionLocal
    from backend.db.models import AdminUser
    from backend.core.security import get_password_hash
    db = SessionLocal()
    try:
        if not db.query(AdminUser).first():
            default_admin = AdminUser(
                username="admin", 
                password_hash=get_password_hash("admin")
            )
            db.add(default_admin)
            db.commit()
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.APP_NAME,
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from backend.api.api import api_router
app.include_router(api_router, prefix="/api")

@app.get("/health")
def health_check():
    health_status = {
        "status": "ok",
        "message": "FaceAttend AI is running"
    }
    return health_status

import os

# Mount Frontend Static Files (Vite build)
frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")
if os.path.isdir(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/{catchall:path}")
    def serve_react_app(catchall: str):
        from fastapi.responses import FileResponse
        # Prevent API routes from being caught
        if catchall.startswith("api/"):
            return {"error": "API route not found"}
        
        file_path = os.path.join(frontend_dist, catchall)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    @app.get("/")
    def serve_fallback():
        return {"message": "Frontend not built yet. Run 'npm run build' in the frontend directory."}
