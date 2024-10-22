## Installation

To set up the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:YOYZHANG/PodCastLM.git
   cd PodCastLM/backend
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

3. **Install the required packages:**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Set up API Key(s):**
   For this project, I am using LLama 3.1 405B hosted on Fireworks API and Azure OpenAI TTS API. So, please set the API key as the `FIREWORKS_API_KEY` and `SPEECH_KEY`environment variable

```
FIREWORKS_API_KEY=
SPEECH_KEY=
```

2. **Run the application:**
   ```bash
   uvicorn main:app --reload
   ```
## License
MIT License © 2024 YOYZHANG
