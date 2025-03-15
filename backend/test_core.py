import argparse
import hashlib
from PyPDF2 import PdfReader
import io
from utils import generate_dialogue, combine_audio
from prompts import SYSTEM_PROMPT, TONE_MODIFIER, LENGTH_MODIFIERS, LANGUAGE_MODIFIER
import json
import uuid

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
    for chunk in generate_dialogue(text, prompt, tone, lens, language):
        # 解析 JSON 字符串
        chunk_data = json.loads(chunk)

        # 提取 content 字段
        if chunk_data["type"] == "chunk":
            print(chunk_data["content"], end="")  # end="" 避免换行
        elif chunk_data["type"] == "final":
            print("\nFinal response:", chunk_data["content"])
        elif chunk_data["type"] == "error":
            print("Error:", chunk_data["content"])
    task_status = {}
    task_id = str(uuid.uuid4())
    provider = "chat-tts"
    combine_audio(task_status, task_id, text, language, provider, )

if __name__ == "__main__":
    main()
