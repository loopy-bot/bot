# 介绍

一个平平无奇的微信机器人，功能如下：

- 定时播报
- 接入大模型（openai，qwen，gemini）
- 邮件服务
- 天行数据（利用天行数据的接口，进行获取数据交给模型组织语言）

# 伤心点

由于openai时不时就封apikey，导致只能接入国内大模型，并且qwen也是限时免费，本地利用ollama跑模型，但是机器不行，跑起来效果很差。而且由于微信风控政策，也不知道什么时候会封微信号。:（

# 待开发功能

- 接入后台系统（定时任务配置，模型配置）
- 语音功能
- 绘画功能

# 环境要求

- node >= 18 「package.json」
- python >= 3 「requirements.tet」
