import os
import openai

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY


def rewrite_resume_text(resume_text: str, jd_text: str, tone: str = 'professional') -> str:
    """Call OpenAI to rewrite the resume text to better match the JD.

    This is a minimal prompt and should be extended for production use.
    """
    system = "You are an expert resume writer. Re-write the resume content to match the job description, add important keywords naturally, keep format as plain text. Maintain a {tone} tone.".format(tone=tone)
    prompt = (
        f"Job description:\n{jd_text}\n\nResume content:\n{resume_text}\n\n"
        "Return the improved resume content only, without commentary."
    )

    if not OPENAI_API_KEY:
        # fallback: simple keyword insertion
        return resume_text + "\n\n[Note: OPENAI_API_KEY not set - no rewrite performed]"

    resp = openai.ChatCompletion.create(
        model='gpt-4o-mini',
        messages=[
            {'role': 'system', 'content': system},
            {'role': 'user', 'content': prompt},
        ],
        max_tokens=1500,
        temperature=0.2,
    )
    return resp['choices'][0]['message']['content'].strip()
