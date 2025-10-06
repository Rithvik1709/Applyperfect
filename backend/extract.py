import fitz  # PyMuPDF
import docx2txt


def extract_text_from_file(filename: str, content: bytes) -> str:
    lower = filename.lower()
    if lower.endswith('.pdf'):
        return extract_text_from_pdf_bytes(content)
    if lower.endswith('.docx'):
        return extract_text_from_docx_bytes(content)
    # fallback
    return content.decode('utf-8', errors='ignore')


def extract_text_from_pdf_bytes(b: bytes) -> str:
    doc = fitz.open(stream=b, filetype='pdf')
    text = []
    for page in doc:
        text.append(page.get_text())
    return '\n'.join(text)


def extract_text_from_docx_bytes(b: bytes) -> str:
    # docx2txt works with files; write to temp
    import tempfile
    with tempfile.NamedTemporaryFile(suffix='.docx', delete=False) as f:
        f.write(b)
        path = f.name
    try:
        txt = docx2txt.process(path)
    finally:
        import os
        try:
            os.remove(path)
        except Exception:
            pass
    return txt
