"""
constants.py
"""

import os

from pathlib import Path

# Key constants
CHARACTER_LIMIT = 100_000

# Gradio-related constants
GRADIO_CLEAR_CACHE_OLDER_THAN = 1 * 2 * 60 * 60  # 2 hours

AUDIO_CACHE_DIR = os.path.join(os.path.dirname(__file__), 'tmp', 'cache')

# Error messages-related constants
ERROR_MESSAGE_NO_INPUT = "Please provide at least one PDF file or a URL."
ERROR_MESSAGE_NOT_PDF = "The provided file is not a PDF. Please upload only PDF files."
ERROR_MESSAGE_NOT_SUPPORTED_IN_MELO_TTS = "The selected language is not supported without advanced audio generation. Please enable advanced audio generation or choose a supported language."
ERROR_MESSAGE_READING_PDF = "Error reading the PDF file"
ERROR_MESSAGE_TOO_LONG = "The total content is too long. Please ensure the combined text from PDFs and URL is fewer than {CHARACTER_LIMIT} characters."

SPEECH_KEY = os.getenv('SPEECH_KEY')
SPEECH_REGION = "japaneast"
# Fireworks API-related constants
FIREWORKS_API_KEY = os.getenv('FIREWORKS_API_KEY')
FIREWORKS_BASE_URL = "https://api.fireworks.ai/inference/v1"
FIREWORKS_MAX_TOKENS = 16_384
FIREWORKS_MODEL_ID = "accounts/fireworks/models/llama-v3p1-405b-instruct"
FIREWORKS_TEMPERATURE = 0.1
FIREWORKS_JSON_RETRY_ATTEMPTS = 3
# Suno related constants
SUNO_LANGUAGE_MAPPING = {
    "English": "en",
    "Chinese": "zh",
    "French": "fr",
    "German": "de",
    "Hindi": "hi",
    "Italian": "it",
    "Japanese": "ja",
    "Korean": "ko",
    "Polish": "pl",
    "Portuguese": "pt",
    "Russian": "ru",
    "Spanish": "es",
    "Turkish": "tr",
}

