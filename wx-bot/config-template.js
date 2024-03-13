// 模型配置

export const AI_MODAL = 'qwen'; // 切换不同模型，目前只对阿里的支持多轮对话

export const TIAN_KEY = 'xxx'; // 天行数据key-https://www.tianapi.com/console/

// 下面的key基本上没啥用，也只能调用一下基本的回复，并不能实现其他功能
export const OPENAI_KEY = 'sk-xxx'; // openai key
export const GEMINI_KEY = 'xxx'; // gemini key


// 邮箱配置
export const mailConfig = {
  auth: {
    user: 'xxx@163.com', // 网易邮箱账号
    pass: 'xxx', // 网易邮箱授权码
  },
  mailOptions: {
    from: 'xxx@163.com', // 发件人
    to: 'xxx@qq.com', // 收件人列表，多个收件人用逗号分隔
  },
};
