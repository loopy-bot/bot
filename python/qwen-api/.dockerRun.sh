#!/bin/bash

sudo docker run -d -p 8765:8765  qwen-ws
sudo docker run -d -p 8766:8766  qwen-http

# 检查容器是否在运行中
echo "docker ps"
sudo docker ps

echo "docker ps -a"
sudo docker ps -a