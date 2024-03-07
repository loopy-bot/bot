
// 模型配置
export const AI_MODAL = "xxx"; // 切换不同模型，目前只对阿里的支持多轮对话
export const QWEN_KEY = "sk-xxx"; // 阿里的apikey
export const OPENAI_KEY = "sk-xxx"; 
export const GEMINI_KEY = "xxx";

// 邮箱配置
export const mailConfig =  {
	auth:{
		user: "xxx@163.com", // 网易邮箱账号
		pass: "xxx", // 网易邮箱授权码
	},
	mailOptions:{
		from: "xxx@163.com", // 发件人
		to: "xxx@qq.com", // 收件人列表，多个收件人用逗号分隔
	}
}