import ChatTTS
import torch
import torchaudio
from utils import generate_dialogue, combine_audio
from pydub import AudioSegment
import os
import io

def generate_test_audio():
    chat = ChatTTS.Chat()
    chat.load(compile=False) # Set to True for better performance

    texts ="大家好!今天我们来聊聊播客的普及和AI技术的结合.欢迎嘉宾李明!谢谢邀请!播客确实越来越受欢迎了.对,播客把文字变成声音,听起来更有趣了.没错,而且AI技术让播客更个性化,满足不同需求."
    wavs = chat.infer(texts)
    # 假设 wavs[0] 是一个 1D NumPy 数组
    wav_tensor = torch.from_numpy(wavs[0])  # 转换为 PyTorch 张量
    wav_tensor = wav_tensor.unsqueeze(0)    # 添加一个维度,变为 [1, samples]
    torchaudio.save("output1.wav", wav_tensor, 24000)


def chat_tts(text: str, voice: str):
    try:
        chat = ChatTTS.Chat()
        chat.load(compile=False) # Set to True for better performance
        if(voice == "man"):
            # 2. 加载高质量音色文件
            p_spk_emb = torch.load('./timbres/seed_1185_restored_emb.pt', map_location=torch.device('cpu'))
        else:
            p_spk_emb = torch.load('./timbres/seed_1151_restored_emb.pt', map_location=torch.device('cpu'))

        '''To do:
            1. How to control the timbre provided by ChatTTS with the param: voice?
            2. How to code to solve this?
        '''
        params_refine_text = ChatTTS.Chat.RefineTextParams(
        prompt='[oral_2][laugh_0][break_6]',
        )
        params_infer_code = ChatTTS.Chat.InferCodeParams(
            spk_emb=p_spk_emb,  # add sampled speaker
            temperature=.3,  # using custom temperature
            top_P=0.7,  # top P decode
            top_K=20,  # top K decode
        )
        ###################################
        # For word level manual control.
        texts = text
        wavs = chat.infer(text, skip_refine_text=True, params_refine_text=params_refine_text,
                        params_infer_code=params_infer_code)
        wav_tensor = torch.from_numpy(wavs[0])  # 转换为 PyTorch 张量
        return wav_tensor
        
    except Exception as e:
        print(f"Error in generate podcast audio by ChatTTS:{e}")

