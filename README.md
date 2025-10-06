# Resume Update — MVP

Small full-stack MVP to upload a resume, paste a job description, analyze ATS match and rewrite the resume using an LLM.

Features included:
- Upload resume (PDF/DOCX)
- Extract text (PyMuPDF / docx2txt)
- Paste Job Description (JD)
- Lightweight keyword/ATS scoring
- Rewrite using OpenAI Chat API
- Download updated resume (DOCX + PDF in a ZIP)
- React + Tailwind frontend with Auth0 integration (placeholders)

Quick start (Windows / PowerShell):

1. Backend

cd backend; python -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt

Set environment variables (PowerShell):

$env:OPENAI_API_KEY = 'sk-...'
$env:AUTH0_DOMAIN = 'your-auth0-domain'
$env:AUTH0_CLIENT_ID = 'your-auth0-client-id'

Run the backend:

uvicorn main:app --reload --port 8000

2. Frontend

cd frontend; npm install; npm run dev

Replace Auth0 placeholders in `frontend/src/App.jsx` with your Auth0 settings or use environment variables.

Notes and next steps:
- The rewrite endpoint uses the OpenAI key; if you want Gemini, swap client code accordingly.
- PDF generation is basic (ReportLab) for now — you can improve formatting or use docx->pdf converters.
