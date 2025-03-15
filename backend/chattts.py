import ChatTTS
import torch
import torchaudio
from utils import generate_dialogue, combine_audio


def generate_test_audio():
    chat = ChatTTS.Chat()
    chat.load(compile=False) # Set to True for better performance

    texts ="大家好！今天我们来聊聊播客的普及和AI技术的结合。欢迎嘉宾李明！谢谢邀请！播客确实越来越受欢迎了。对，播客把文字变成声音，听起来更有趣了。没错，而且AI技术让播客更个性化，满足不同需求。"
    wavs = chat.infer(texts)
    # 假设 wavs[0] 是一个 1D NumPy 数组
    wav_tensor = torch.from_numpy(wavs[0])  # 转换为 PyTorch 张量
    wav_tensor = wav_tensor.unsqueeze(0)    # 添加一个维度，变为 [1, samples]
    torchaudio.save("output1.wav", wav_tensor, 24000)


def main():
    generate_test_audio()


if __name__ == "__main__":
    main()