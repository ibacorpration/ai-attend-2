# FaceAttend AI

FaceAttend AI is an advanced, premium attendance system powered by facial recognition (ArcFace ONNX) and FastAPI, with a modern Feature-Sliced React frontend.

## Features
- **Facial Recognition Check-in**: Kiosk-mode for employees to scan their faces.
- **Liveness & Spoofing Detection**: Configurable confidence thresholds.
- **Admin Dashboard**: Full CRUD management of employees, real-time attendance trends, and manual reviews.
- **Premium UI**: White-theme, glassmorphism, Framer Motion animations.
- **Message System**: Direct messaging to employees when they scan.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Custom CSS (Feature-Sliced Design)
- **Backend**: FastAPI, SQLAlchemy, SQLite (default)
- **AI**: YuNet (Face Detection), ArcFace ONNX (Feature Extraction)

## Installation & Running Locally

### 1. Backend (FastAPI)
```bash
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
*API will run on `http://localhost:8000`*

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*Frontend will run on `http://localhost:5173`*

## Deployment Setup

To serve the React app directly from the FastAPI server in production:
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Run the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
   FastAPI will automatically detect `frontend/dist` and serve the React SPA.

## Structure
- `backend/`: FastAPI application, AI logic, and SQLite DB models.
- `frontend/src/`: React frontend using Feature-Sliced Architecture.
