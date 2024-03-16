import axios from 'axios';

type Message = { role: string; content: string };

export class Qwen {
  MAX_CONTEXT: number;
  contextStorage: Record<string, any>;
  messageQueues: Record<string, Message[]>;
  pendingPromises: Record<string, boolean>;
  personality: Message;
  constructor(personality: string) {
    this.personality = { role: 'system', content: personality };
    this.MAX_CONTEXT = 8;
    this.contextStorage = {};
    this.messageQueues = {};
    this.pendingPromises = {};
  }

  getContext(key) {
    return [this.personality, ...this.contextStorage[key]] || [];
  }

  updateContext(key, message) {
    if (!this.contextStorage[key]) {
      this.contextStorage[key] = [];
    }
    // 限制上下文长度
    if (this.contextStorage[key].length >= this.MAX_CONTEXT) {
      this.contextStorage[key].shift();
    }
    this.contextStorage[key].push(message);
  }

  async processQueue(key, callback) {
    if (this.messageQueues[key].length === 0 || this.pendingPromises[key]) {
      return; // 如果队列为空或者已经有一个消息正在处理，则不进行操作
    }

    this.pendingPromises[key] = true;

    while (this.messageQueues[key].length > 0) {
      const text = this.messageQueues[key].shift();
      this.updateContext(key, { role: 'user', content: text });
      const res = await this.request(this.getContext(key)); // 假定chat是一个异步函数
      this.updateContext(key, { role: 'assistant', content: res });
      callback(res);
    }

    this.pendingPromises[key] = false;
  }

  async chat(key, text, callback) {
    if (!this.messageQueues[key]) {
      this.messageQueues[key] = [];
    }

    this.messageQueues[key].push(text);

    await this.processQueue(key, callback); // 不需要await，这样就允许不同的key并行处理
  }
  async genarate(text: string) {
    const messages = [this.personality, { role: 'user', content: text }];
    // 这是一个假设的异步函数，你需要根据实际需要来实现
    return axios({
      url: 'http://127.0.0.1:8766/chat',
      method: 'post',
      params: { messages },
    }).then((res) => res.data);
  }
  async request(messages: Message[]) {
    // 这是一个假设的异步函数，你需要根据实际需要来实现
    return axios({
      url: 'http://127.0.0.1:8766/chat',
      method: 'post',
      params: { messages },
    }).then((res) => res.data);
  }
}
