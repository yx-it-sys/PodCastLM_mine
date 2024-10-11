FROM tiangolo/uvicorn-gunicorn-fastapi:python3.12

# 设置工作目录
WORKDIR /app

# 将当前目录内容复制到容器的 /app 中
COPY . /app

# 安装项目依赖
RUN pip install --no-cache-dir -r requirements.txt

# 安装 FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# 设置环境变量
ENV FIREWORKS_API_KEY=${FIREWORKS_API_KEY}

# 暴露端口 8000 供应用使用
EXPOSE 8000

# 运行应用
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


