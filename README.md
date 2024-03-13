# 介绍

一个平平无奇的微信机器人，功能如下：

- 定时播报
- 接入大模型（openai，qwen，gemini）
- 邮件服务
- 天行数据（利用天行数据的接口，进行获取数据交给模型组织语言）

## 伤心点

由于 openai 时不时就封 apikey，导致只能接入国内大模型，并且 qwen 也是限时免费，本地利用 ollama 跑模型，但是机器不行，跑起来效果很差。而且由于微信风控政策，也不知道什么时候会封微信号。:（

## 待开发功能

- 接入后台系统（定时任务配置，模型配置）
- 语音功能
- 绘画功能

## 介绍

这是一个功能丰富的微信机器人，具备以下功能：

- **定时播报**：能够定时发送消息。
- **接入大模型**：支持接入国内大模型，如 openai、qwen 和 gemini。
- **邮件服务**：可以发送邮件通知。
- **天行数据**：利用天行数据的接口获取数据，交给模型进行语言组织。
- **语音功能**：支持语音消息的处理。
- **绘画功能**：具备绘画相关的功能。

## 伤心点

尽管具备丰富的功能，但也存在一些挑战：

- **API Key 限制**：由于 openai 时不时封锁 API Key，只能接入国内大模型。同时，qwen 也是限时免费，本地跑模型效果较差。
- **微信风控**：微信风控政策不明确，随时可能封禁微信号。

## 待开发功能

- **后台系统接入**：开发后台系统，用于配置定时任务和模型参数。

# 快速开始

## 环境要求

- Node.js >= 18
- Python >= 3.10 && < 3.12

## 构造配置文件

1. 在 `python` 目录下创建 `config.json`：根据提供的模板文件，获取 `QWEN_KEY`。
2. 在 `wx-bot` 目录下创建 `config.js`：同样使用提供的模板文件，获取 `TIAN_KEY`，并根据 `services/tianapi` 部分申请对应的接口。

## Python/qwen-api

1. 进入该目录，运行 `pip install -r requirements.txt` 安装所需依赖。
2. 运行 `python3 qwen-http.py` 启动服务。

## wx-bot

1. 进入该目录，运行 `yarn install` 安装所需依赖。
2. 运行 `yarn start` 启动微信机器人。

### 常见问题解决

1. 如果遇到 `无法找到module 'xxx'` 的问题：

   - 可以通过 `yarn` 或者 `npm` 下载对应的模块。
   - 也可以尝试删除 `node_modules` 文件夹，然后重新下载依赖，并尝试不同的启动命令。

2. 运行 Python 程序时出现 `incompatible architecture` 问题：
   - 可以尝试更换 Python 版本并重试。

### 相关链接

- [申请API-Key和所需接口](https://dashscope.console.aliyun.com/apiKey)
- [申请天行数据的key](https://www.tianapi.com/console/)
- [申请阿里云百炼的key](https://bailian.aliyun.com/)

> 目前针对阿里云百炼的调用还不完善，正在开发中。如果只需运行机器人，只需要获取天行数据key和千问的key即可，此外，还需在 `services/tianapi` 下申请对应的数据接口，例如天气、新闻、时运等。

### 目录说明

#### 1. wx-bot

该目录包含了微信机器人项目，负责接收微信消息并转发给大模型，再将结果回复给用户。

- `modules/AI`：AI 接入层，用于调用 AI 接口并处理返回结果，例如处理上下文、消息队列、限制并发数等。
- `modules/process-message`：消息处理层，处理不同的文本消息，根据消息推测用户意图，并匹配对应的接口数据。
- `modules/schedule-tasks`：定时任务配置，使用 `node-schedule` 库执行定时任务。
- `services/tianapi`：天行数据接口。
- `services/qwen-api`：大模型接口，由 Python 运行的 HTTP 服务提供。

#### 2. python/qwen-api

该目录包含了调用阿里云大模型服务的 Python 程序，按照文档说明即可运行。
