import re
from collections import Counter


def tokenize(text: str):
    return re.findall(r"\b[a-zA-Z0-9+-]+\b", text.lower())


def analyze_resume_vs_jd(resume_text: str, jd_text: str):
    r_tokens = set(tokenize(resume_text))
    jd_tokens = tokenize(jd_text)
    jd_counts = Counter(jd_tokens)

    keywords = []
    matches = 0
    for k, cnt in jd_counts.most_common(50):
        if k in r_tokens:
            matches += 1
            keywords.append({'keyword': k, 'count': cnt, 'present': True})
        else:
            keywords.append({'keyword': k, 'count': cnt, 'present': False})

    match_percent = int((matches / max(1, len(jd_counts))) * 100)

    # simple tone detection
    tone = 'neutral'
    if 'experience' in resume_text.lower() or 'managed' in resume_text.lower():
        tone = 'professional'

    return {
        'match_percent': match_percent,
        'top_keywords': keywords[:30],
        'tone': tone,
    }
