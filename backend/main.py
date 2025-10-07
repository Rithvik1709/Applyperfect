import os
import io
import zipfile
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from extract import extract_text_from_file
from analyze import analyze_resume_vs_jd
from rewrite import rewrite_resume_text
from docx import Document
from reportlab.pdfgen import canvas

app = FastAPI()

# Configure CORS origins via ALLOWED_ORIGINS env var (comma-separated). Fallback to common localhost dev origins.
allowed = os.getenv('ALLOWED_ORIGINS')
if allowed:
    origins = [o.strip() for o in allowed.split(',') if o.strip()]
else:
    origins = ["http://localhost:5173", "http://localhost:3000", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/upload')
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_file(file.filename, contents)
    return {'filename': file.filename, 'text': text}


@app.post('/analyze')
async def analyze(text: str = Form(...), jd: str = Form(...)):
    result = analyze_resume_vs_jd(text, jd)
    return JSONResponse(result)


@app.post('/rewrite')
async def rewrite(text: str = Form(...), jd: str = Form(...), tone: str = Form('professional')):
    new_text = rewrite_resume_text(text, jd, tone)
    # create docx and pdf in memory and return as zip
    docx_bytes = io.BytesIO()
    doc = Document()
    for line in new_text.splitlines():
        doc.add_paragraph(line)
    doc.save(docx_bytes)
    docx_bytes.seek(0)

    pdf_bytes = io.BytesIO()
    p = canvas.Canvas(pdf_bytes)
    y = 800
    for line in new_text.splitlines():
        p.drawString(50, y, line[:120])
        y -= 14
        if y < 40:
            p.showPage()
            y = 800
    p.save()
    pdf_bytes.seek(0)

    zip_io = io.BytesIO()
    with zipfile.ZipFile(zip_io, mode='w') as zf:
        zf.writestr('updated_resume.docx', docx_bytes.getvalue())
        zf.writestr('updated_resume.pdf', pdf_bytes.getvalue())
    zip_io.seek(0)

    return StreamingResponse(zip_io, media_type='application/zip', headers={'Content-Disposition': 'attachment; filename=updated_resume.zip'})
