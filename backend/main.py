from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models
import requests
import os
from dotenv import load_dotenv

# Load environment variables
# load_dotenv()
# OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
from pathlib import Path

from pydantic import BaseModel

class ChatRequest(BaseModel):
    session_id: int
    message: str

env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

print("Loaded API Key:", OPENROUTER_API_KEY)

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "ResumeGPT Backend Running 🚀"}


@app.post("/session")
def create_session(db: Session = Depends(get_db)):
    session = models.ChatSession(session_name="default")
    db.add(session)
    db.commit()
    db.refresh(session)
    return {"session_id": session.id}


@app.post("/chat")
def chat_with_resume(request: ChatRequest, db: Session = Depends(get_db)):

    session = db.query(models.ChatSession).filter(
        models.ChatSession.id == request.session_id
    ).first()

    if not session:
        return {"error": "Session not found"}

    # Save user message
    user_msg = models.ChatMessage(
        session_id=session.id,
        role="user",
        content=request.message
    )
    db.add(user_msg)
    db.commit()

    # Get full conversation history
    messages = db.query(models.ChatMessage).filter(
        models.ChatMessage.session_id == session.id
    ).all()

    formatted_messages = [
        {
            "role": msg.role,
            "content": msg.content
        }
        for msg in messages
    ]

    resume_context = """
Full Name: Katakam Kamakshi Thanmayee

Contact:
- Email: kamakshithanmayee@gmail.com
- LinkedIn: www.linkedin.com/in/kamakshithanmayee
- GitHub: github.com/ThanmayeeKatakam

Career Objective:
To contribute meaningfully within a forward-thinking organization that values innovation, encourages learning, and supports growth where my curiosity, creativity, and dedication lead to impactful solutions and continuous personal and organizational development.

Education:
B.Tech in Computer Science and Engineering (2022 – Present)
Narayana Engineering College, Nellore, Andhra Pradesh
CGPA: 9.3

Intermediate (2020 – 2022)
Narayana Junior College, Nellore
Score: 946/1000

SSC (2019 – 2020)
VSR EM High School, Nellore
Score: 585/600


Internship:
Machine Learning Intern – Indian Servers Pvt Ltd (Dec 2023 – Jan 2024)

- Built a CNN-based car accident detection model achieving 92% accuracy using custom datasets.
- Implemented image preprocessing and training pipeline using Python.
- Deployed a real-time image classification system using Google Teachable Machine for live inference.


Project Work:

1) GramaSethu – Village Tourism Web Application
Technologies Used: HTML, CSS, JavaScript, Flask, MySQL, Leaflet API
- Developed a web platform to promote village tourism and preserve cultural heritage.
- Integrated interactive maps using Leaflet API to display village locations.
- Designed backend using Flask and managed data with MySQL database.


2) Salary Acquittance System – Role-Based Payroll Management System
Technologies Used: HTML, CSS, JavaScript, Bootstrap, Node.js, MySQL, Chart.js, Ollama
- Designed a multi-role payroll system (Admin, Staff, Manager).
- Automated salary calculations with tax deductions and leave management.
- Generated CSV and PDF salary reports.
- Built analytics dashboard using Chart.js.
- Integrated voice-enabled chatbot using Ollama LLM.


3) AI Resume Portfolio – Full Stack AI Chat Portfolio
Technologies Used:
- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: FastAPI, SQLAlchemy, SQLite
- AI Integration: OpenRouter API (GPT-3.5 Turbo)
- Database Models: ChatSession and ChatMessage tables
- Features:
  - Dynamic chat session handling
  - Conversation history stored in database
  - Resume-based system prompt injection
  - CORS-enabled API communication
  - Smooth scroll single-page portfolio UI
  - Responsive navbar with section navigation


Technical Skills:

Languages:
- Java
- Python
- C
- JavaScript
- TypeScript

Core Concepts:
- Data Structures
- Object-Oriented Programming (OOP)
- DBMS

Web Technologies:
- HTML
- CSS
- Tailwind CSS
- Bootstrap
- React
- Node.js
- Flask
- FastAPI

Databases:
- MySQL
- SQLite

AI & ML:
- Convolutional Neural Networks (CNN)
- Machine Learning
- OpenRouter LLM Integration
- Ollama LLM Integration
- Google Teachable Machine

Tools & Platforms:
- VS Code
- Jupyter Notebook
- Eclipse
- MS Excel
- Git & GitHub


Certifications:
- Oracle Foundation: Generative AI – LLMs and Prompt Engineering


Achievements:
- 1st Prize – Project Expo, Narayana Engineering College
- 1st Prize – Brevity Blitz, MBU Tirupati
- 2nd Prize – Technovate, SV University Tirupati
- Shortlisted – HackXerve Hackathon, Mysore


Strengths:
- Leadership Skills
- Team Collaboration
- Problem-Solving
- Communication Skills
"""

    formatted_messages.insert(0, {
        "role": "system",
        "content": f"You are a resume assistant. Answer only using this resume:\n{resume_context}"
    })

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "http://localhost:8000",
            "X-Title": "ResumeGPT",
            "Content-Type": "application/json"
        },
        json={
            "model": "openai/gpt-3.5-turbo",
            "messages": formatted_messages
        }
    )

    if response.status_code != 200:
        return {"error": response.text}

    data = response.json()
    ai_response = data["choices"][0]["message"]["content"]

    # Save assistant message
    assistant_msg = models.ChatMessage(
        session_id=session.id,
        role="assistant",
        content=ai_response
    )
    db.add(assistant_msg)
    db.commit()

    return {"response": ai_response}

# @app.post("/chat")
# def chat_with_resume(message: str, db: Session = Depends(get_db)):

#     resume_context = """
#     Name: Thanmayee Katakam
#     Skills: React, TypeScript, Python, FastAPI, MySQL
#     Projects: AI Portfolio, ResumeGPT
#     Education: B.Tech Computer Science
#     """

#     try:
#         # Save session
#         session = models.ChatSession(session_name="default")
#         db.add(session)
#         db.commit()
#         db.refresh(session)

#         user_msg = models.ChatMessage(
#             session_id=session.id,
#             role="user",
#             content=message
#         )
#         db.add(user_msg)
#         db.commit()

#         # Call OpenRouter
#         response = requests.post(
#     "https://openrouter.ai/api/v1/chat/completions",
#     headers={
#         "Authorization": f"Bearer {OPENROUTER_API_KEY}",
#         "HTTP-Referer": "http://localhost:8000",
#         "X-Title": "ResumeGPT",
#         "Content-Type": "application/json"
#     },
#     json={
#         "model": "openai/gpt-3.5-turbo",
#         "messages": [
#             {
#                 "role": "system",
#                 "content": f"You are a resume assistant. Answer only using this resume:\n{resume_context}"
#             },
#             {
#                 "role": "user",
#                 "content": message
#             }
#         ]
#     }
# )

#         print("OpenRouter Raw Response:", response.text)

#         if response.status_code != 200:
#             return {"error": response.text}

#         data = response.json()
#         ai_response = data["choices"][0]["message"]["content"]

#         assistant_msg = models.ChatMessage(
#             session_id=session.id,
#             role="assistant",
#             content=ai_response
#         )
#         db.add(assistant_msg)
#         db.commit()

#         return {"response": ai_response}

    # except Exception as e:
    #     return {"error": str(e)}