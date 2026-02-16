import json
from openai import OpenAI

from app.config import get_settings
from app.prompts.templates import CHAT_SYSTEM_PROMPT, ROADMAP_SYSTEM_PROMPT

settings = get_settings()
client = OpenAI(api_key=settings.openai_api_key)


def generate_roadmap(profile: dict) -> dict:
    response = client.chat.completions.create(
        model=settings.openai_model,
        response_format={'type': 'json_object'},
        messages=[
            {'role': 'system', 'content': ROADMAP_SYSTEM_PROMPT},
            {'role': 'user', 'content': json.dumps(profile)},
        ],
        temperature=0.4,
    )
    content = response.choices[0].message.content or '{}'
    return json.loads(content)


def chat_with_context(message: str, context: dict) -> str:
    response = client.chat.completions.create(
        model=settings.openai_model,
        messages=[
            {'role': 'system', 'content': CHAT_SYSTEM_PROMPT},
            {
                'role': 'user',
                'content': f"Context:\n{json.dumps(context)}\n\nUser message:\n{message}",
            },
        ],
        temperature=0.6,
    )
    return response.choices[0].message.content or 'I could not generate a response.'
