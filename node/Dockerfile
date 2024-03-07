# 使用Node.js 16的Alpine版本作为基础镜像
FROM python:3.10

# 安装Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# 打印 Node.js 和 npm 版本
RUN node --version
RUN npm --version

# 安装Python3
WORKDIR /wechat-bot

COPY package.json .
# 安装Python和Node.js依赖项
RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
RUN pip install --no-cache-dir -r requirements.txt
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

COPY . .

CMD [ "npm", "start" ]
