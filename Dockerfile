# 使用Node.js 16的Alpine版本作为基础镜像
FROM node:16-alpine3.14

# 安装Python3
RUN apk add --update python3 py3-pip

WORKDIR /wechat-bot

COPY package.json .
# 安装Python和Node.js依赖项
RUN pip3 install --no-cache-dir -r requirements.txt
RUN npm install
COPY . .

CMD [ "npm", "start" ]
