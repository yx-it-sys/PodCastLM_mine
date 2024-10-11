import os
import random

from fastapi import APIRouter, Query
from constants import GRADIO_CACHE_DIR, MELO_TTS_LANGUAGE_MAPPING, SUNO_LANGUAGE_MAPPING
from utils import generate_podcast_audio, generate_script
from prompts import LANGUAGE_MODIFIER, LENGTH_MODIFIERS, QUESTION_MODIFIER, SYSTEM_PROMPT, TONE_MODIFIER
from schema import ShortDialogue
from loguru import logger
from pydub import AudioSegment

from tempfile import NamedTemporaryFile

router = APIRouter()

@router.get("/")
def generate(input: str = Query(..., description="Input string")):
    random_voice_number = random.randint(1, 9)

    modified_system_prompt = SYSTEM_PROMPT
    question = "introduce chatgpt"
    tone = "funny"
    language = "English"
    length = "Short (1-2 min)"

    if question:
        modified_system_prompt += f"\n\n{QUESTION_MODIFIER} {question}"
    if tone:
        modified_system_prompt += f"\n\n{TONE_MODIFIER} {tone}."
    if length:
        modified_system_prompt += f"\n\n{LENGTH_MODIFIERS[length]}"
    if language:
        modified_system_prompt += f"\n\n{LANGUAGE_MODIFIER} {language}."
    
    llm_output = generate_script(modified_system_prompt, "introduce chatgpt", ShortDialogue)

    logger.info(f"Generated dialogue: {llm_output}")

    audio_segments = []
    transcript = ""
    total_characters = 0

    for line in llm_output.dialogue:
        print(f"Generating audio for {line.speaker}: {line.text}")
        logger.info(f"Generating audio for {line.speaker}: {line.text}")
        if line.speaker == "Host (Jane)":
            speaker = f"**Host**: {line.text}"
        else:
            speaker = f"**{llm_output.name_of_guest}**: {line.text}"
        transcript += speaker + "\n\n"
        total_characters += len(line.text)

        language_for_tts = SUNO_LANGUAGE_MAPPING[language]

        # Get audio file path
        audio_file_path = generate_podcast_audio(
            line.text, line.speaker, language_for_tts, random_voice_number
        )
        # Read the audio file into an AudioSegment
        audio_segment = AudioSegment.from_file(audio_file_path)
        audio_segments.append(audio_segment)

    # Concatenate all audio segments
    combined_audio = sum(audio_segments)

    # Export the combined audio to a temporary file
    temporary_directory = GRADIO_CACHE_DIR
    os.makedirs(temporary_directory, exist_ok=True)

    temporary_file = NamedTemporaryFile(
        dir=temporary_directory,
        delete=False,
        suffix=".mp3",
    )
    combined_audio.export(temporary_file.name, format="mp3")
    logger.info(f"Generated {total_characters} characters of audio")

    # Delete any files in the temp directory that end with .mp3 and are over a day old
    # for file in glob.glob(f"{temporary_directory}*.mp3"):
    #     if (
    #         os.path.isfile(file)
    #         and time.time() - os.path.getmtime(file) > GRADIO_CLEAR_CACHE_OLDER_THAN
    #     ):
    #         os.remove(file)

    print(temporary_file.name)
    print(transcript)
    return {"message": f"Hello World, input: {temporary_file}"}

