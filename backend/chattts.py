import ChatTTS
import torch
import torchaudio


def generate_test_audio():
    chat = ChatTTS.Chat()
    chat.load(compile=False) # Set to True for better performance

    texts = ["Hello, You XU!", "Wish you all the best"]

    wavs = chat.infer(texts)

    torchaudio.save("output1.wav", torch.from_numpy(wavs[0]), 24000)


def main():
    generate_test_audio()


if __name__ == "__main__":
    main()