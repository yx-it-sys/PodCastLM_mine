# PodCastLM

## 功能
用户输入文本或URL或PDF, 生成播客，类似于google的NotebookLM。

## 技术栈
- FrontEnd
  - React
  - TaiwindCss

- BackEnd
  - FastAPI

大模型选用 LLama 3.1 405B hosted on Fireworks API, tts 选用 melotts

## 安装和运行

### 前端
cd frontend
npm install
npm start

### 后端
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
