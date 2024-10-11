from typing import Any, Union
from openai import OpenAI
from pydantic import ValidationError

from schema import MediumDialogue, ShortDialogue
from constants import (
    FIREWORKS_API_KEY,
    FIREWORKS_BASE_URL,
    FIREWORKS_MODEL_ID,
    FIREWORKS_MAX_TOKENS,
    FIREWORKS_TEMPERATURE,
    FIREWORKS_JSON_RETRY_ATTEMPTS,
)

from bark.generation import SUPPORTED_LANGS

from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav

fw_client = OpenAI(base_url=FIREWORKS_BASE_URL, api_key=FIREWORKS_API_KEY)

preload_models()
print(SUPPORTED_LANGS)

def generate_script(
    system_prompt: str,
    input_text: str,
    output_model: Union[ShortDialogue, MediumDialogue],
) -> Union[ShortDialogue, MediumDialogue]:
    """Get the dialogue from the LLM."""

    # Call the LLM
    response = call_llm(system_prompt, input_text, output_model)
    response_json = response.choices[0].message.content

    # Validate the response
    for attempt in range(FIREWORKS_JSON_RETRY_ATTEMPTS):
        try:
            first_draft_dialogue = output_model.model_validate_json(response_json)
            break
        except ValidationError as e:
            if attempt == FIREWORKS_JSON_RETRY_ATTEMPTS - 1:  # Last attempt
                raise ValueError(
                    f"Failed to parse dialogue JSON after {FIREWORKS_JSON_RETRY_ATTEMPTS} attempts: {e}"
                ) from e
            error_message = (
                f"Failed to parse dialogue JSON (attempt {attempt + 1}): {e}"
            )
            # Re-call the LLM with the error message
            system_prompt_with_error = f"{system_prompt}\n\nPlease return a VALID JSON object. This was the earlier error: {error_message}"
            response = call_llm(system_prompt_with_error, input_text, output_model)
            response_json = response.choices[0].message.content
            first_draft_dialogue = output_model.model_validate_json(response_json)

    # Call the LLM a second time to improve the dialogue
    system_prompt_with_dialogue = f"{system_prompt}\n\nHere is the first draft of the dialogue you provided:\n\n{first_draft_dialogue}."

    # Validate the response
    for attempt in range(FIREWORKS_JSON_RETRY_ATTEMPTS):
        try:
            response = call_llm(
                system_prompt_with_dialogue,
                "Please improve the dialogue. Make it more natural and engaging.",
                output_model,
            )
            final_dialogue = output_model.model_validate_json(
                response.choices[0].message.content
            )
            break
        except ValidationError as e:
            if attempt == FIREWORKS_JSON_RETRY_ATTEMPTS - 1:  # Last attempt
                raise ValueError(
                    f"Failed to improve dialogue after {FIREWORKS_JSON_RETRY_ATTEMPTS} attempts: {e}"
                ) from e
            error_message = f"Failed to improve dialogue (attempt {attempt + 1}): {e}"
            system_prompt_with_dialogue += f"\n\nPlease return a VALID JSON object. This was the earlier error: {error_message}"
    return final_dialogue

def call_llm(system_prompt: str, text: str, dialogue_format: Any) -> Any:
    """Call the LLM with the given prompt and dialogue format."""
    response = fw_client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text},
        ],
        model=FIREWORKS_MODEL_ID,
        max_tokens=FIREWORKS_MAX_TOKENS,
        temperature=FIREWORKS_TEMPERATURE,
        response_format={
            "type": "json_object",
            "schema": dialogue_format.model_json_schema(),
        },
    )
    return response

def generate_podcast_audio(
    text: str, speaker: str, language: str, random_voice_number: int
) -> str:
    host_voice_num = str(random_voice_number)
    guest_voice_num = str(random_voice_number + 1)

    print(f"v2/{language}_speaker_{host_voice_num if speaker == 'Host (Jane)' else guest_voice_num}")
    audio_array = generate_audio(
        text,
        history_prompt=f"v2/{language}_speaker_{host_voice_num if speaker == 'Host (Jane)' else guest_voice_num}",
    )
    file_path = f"audio_{language}_{speaker}.mp3"
    print(SAMPLE_RATE)
    write_wav(file_path, SAMPLE_RATE, audio_array)
    return file_path
