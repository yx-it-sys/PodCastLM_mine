import asyncio
import argparse
import hashlib
from PyPDF2 import PdfReader
import io
from utils import generate_dialogue
from prompts import SYSTEM_PROMPT, TONE_MODIFIER, LENGTH_MODIFIERS, LANGUAGE_MODIFIER
import json
import uuid
import torch
import torchaudio
import re
from chattts import chat_tts

# 读取本地文件，用于测试代码
pdf_cache = {}


def get_pdf_text1(pdf_file: str):
    text = ""
    print(f"Processing file: {pdf_file}")
    try:
        # 读取本地文件
        with open(pdf_file, "rb") as f:
            contents = f.read()

        file_hash = hashlib.md5(contents).hexdigest()

        if file_hash in pdf_cache:
            return pdf_cache[file_hash]

        # 使用 BytesIO 创建一个内存中的文件对象
        pdf_file_obj = io.BytesIO(contents)

        # 使用 PdfReader 读取 PDF 内容
        pdf_reader = PdfReader(pdf_file_obj)

        # 提取所有页面的文本
        text = "\n\n".join([page.extract_text() for page in pdf_reader.pages])

        # 重置文件指针，以防后续还需要读取文件
        pdf_cache[file_hash] = text

        return text

    except Exception as e:
        return {"error": str(e)}

def process_lines_with_limit_test(lines):
    tensor_list = []
    for line in lines:
        voice = "man" if (line["speaker"] == "Host" or line["speaker"] == "主持人") else "woman"
        print("lines ok")
        tensor = chat_tts(line["content"], voice)
        print(tensor.shape)
        tensor_list.append(tensor)
    final_wav_tensor = torch.cat(tensor_list, dim=0)
    final_wav_tensor = final_wav_tensor.unsqueeze(0)    # 添加一个维度,变为 [1, samples]
    return final_wav_tensor

def combine_audio_by_chattts(text: str):
    try:
        dialogue_regex = r'\*\*([\s\S]*?)\*\*[:：]\s*([\s\S]*?)(?=\*\*|$)'
        matches = re.findall(dialogue_regex, text, re.DOTALL)

        lines = [
            {
                "speaker": match[0],
                "content": match[1].strip(),
            }
            for match in matches
        ]

        print("Starting audio generation")
        # audio_segments = await asyncio.gather(
        #     *[process_line(line, host_voice if line['speaker'] == '主持人' else guest_voice) for line in lines]
        # )
        audio = process_lines_with_limit_test(lines)
        print("Audio generation completed")
        torchaudio.save("./audio/output3.wav", audio, 24000)

    except Exception as e:
        print(f"Fail to generate audio by chatTTS_Test:{e}")



def main():
    parser = argparse.ArgumentParser(description="Run the Podcast System")
    parser.add_argument("input_file", help="Path to the input PDF file")
    args = parser.parse_args()
    args = vars(args)
    print(args)
    text = get_pdf_text1(args['input_file'])
    prompt = SYSTEM_PROMPT
    tone = "happy"
    lens = "short"
    language = "Chinese"
    full_response = ""
    for chunk in generate_dialogue(text, prompt, tone, lens, language):
        # 解析 JSON 字符串
        chunk_data = json.loads(chunk)
        # 提取 content 字段
        if chunk_data["type"] == "chunk":
            full_response += chunk_data["content"]
            print(chunk_data["content"], end="")  # end="" 避免换行
        elif chunk_data["type"] == "error":
            print("Error:", chunk_data["content"])
    # # with open("example.txt", "r", encoding="utf-8") as file:
    # #     full_response = file.read()
    print(full_response)
    combine_audio_by_chattts(full_response)


if __name__ == "__main__":
    main()
