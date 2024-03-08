# 使用官方 Python 镜像作为基础镜像
FROM python:3.10

# 设置工作目录
WORKDIR /server

# 将当前目录中的所有内容复制到镜像的工作目录中
COPY . .
RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
# 安装所需的 Python 包
RUN pip install  websockets dashscope 

# 暴露你的应用程序的端口
EXPOSE 8765

# 运行你的 Python 程序
CMD ["python", "qwen-ws.py"]