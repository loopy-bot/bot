# 介绍

一个平平无奇的微信机器人，功能如下：

- 定时播报
- 接入大模型（openai，qwen，gemini）
- 邮件服务
- 天行数据（利用天行数据的接口，进行获取数据交给模型组织语言）

## 伤心点

由于openai时不时就封apikey，导致只能接入国内大模型，并且qwen也是限时免费，本地利用ollama跑模型，但是机器不行，跑起来效果很差。而且由于微信风控政策，也不知道什么时候会封微信号。:（

## 待开发功能

- 接入后台系统（定时任务配置，模型配置）
- 语音功能
- 绘画功能


# 快速开始

## 环境要求

- node >= 18 
- python >= 3 

## 配置文件

根据`node`和`python`目录下的`config.tempalte.js`文件配置好对应参数

- 模型和天行数据的key
- 邮箱配置
> 这些自行百度都能百度出来，我就不贴教程了，实在不会的，留下issue，我再进行回答

## 安装依赖

### node

1. 进入`node`的终端
2. 执行`npm install`

### python

如果用的是阿里的模型，则需要进行运行`python`代码进行`SDK`的调用

#### 1. docker

如果会`docker`的话，直接执行`python/script`文件夹下的`bash`脚本即可。

#### 2. 运行在本地

1. 查看`requirements.txt`文件安装好`python`环境所需要的依赖
2. 依次进行运行两个`python`文件就行
> 这里之所以开两个是因为一个用来多轮对话,采用的是`ws`，另一个只是用来总结文本等操作，是无状态的，所以采用`http`

## 启动

当环境都安装好，并且`python`服务也运行好了的话，就可以直接`npm run start`进行给微信扫码代理了。

