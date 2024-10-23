from fish_audio_sdk import Session, TTSRequest, ReferenceAudio
from pydub import AudioSegment
import io

from constants import FISHAUDIO_KEY,FISHAUDIO_SPEEKER



import random

def get_adapter_speeker_id(speaker_name):
    speeker = FISHAUDIO_SPEEKER[0]
    if speaker_name != "主持人": 
        speeker = random.choice(FISHAUDIO_SPEEKER)
    return speeker["id"]

def fishaudio_tts(text, reference_id=None) -> AudioSegment:
    """
    将给定的文本转换为语音并返回AudioSegment对象。
    
    :param text: 要转换的文本
    :param reference_id: 可选参数，使用的模型 ID
    :return: 返回生成的语音的AudioSegment对象
    """
    print("reference_id:", reference_id)
    session = Session(FISHAUDIO_KEY)
    audio_buffer = io.BytesIO()
    for chunk in session.tts(TTSRequest(
        reference_id=reference_id,
        text=text
    )):
        audio_buffer.write(chunk)
    audio_buffer.seek(0)  # 重置缓冲区的位置
    return AudioSegment.from_file(audio_buffer, format="mp3")
