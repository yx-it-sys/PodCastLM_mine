<h1 align="center">Welcome to PodCastLM 👋</h1>

[中文说明](/README_CN.md)

## ✨ Demo
[demo.mp4](https://github.com/user-attachments/assets/ed846901-069e-48c5-8576-01b017cd581a)

Try it Online ⚡️:  [PodCastLM](https://endearing-rabanadas-2ee528.netlify.app.)

## OverView
This project is inspired by the NotebookLM tool, This tool processes the content of a PDF, generates a natural dialogue suitable for an audio podcast, and outputs it as an MP3 file.

## 💻 TechStack
- [React](https://react.dev/) - FrontEnd Development
- [Tailwindcss](https://tailwindcss.com/) - CSS Engine
- [FastAPI](https://fastapi.tiangolo.com/) - BackEnd Development

## 💗  Credit
- [Llama-3.1-405B](https://huggingface.co/meta-llama/Llama-3.1-405B) - AI Powered
- [Azure OpenAI TTS](https://azure.microsoft.com/en-us/products/ai-services/openai-service) - TTS Powered

## 👤 Author
**YOYZHANG**

- Twitter: [@alexu19049062](https://twitter.com/alexuzhang19049062)
- Github: [@YOYZHANG](https://github.com/YOYZHANG)
- Wechat: whdxzxq

## 🤝 Contributing

Contributions, issues and feature requests are welcome. 😄<br />
Feel free to check [issues page](https://github.com/YOYZHANG/podcastlm/issues) if you want to contribute.<br />


## 📝 License
MIT License © 2024 YOYZHANG

## Others

Please ⭐️ this repository if this project helped you!

Your appreciation is my greatest strength in updating content！

<a href="https://www.buymeacoffee.com/zhangxiaoqian" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

---



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
