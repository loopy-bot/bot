import nodemailer from "nodemailer";
import qr from "qr-image";

// 创建SMTP客户端配置
let transporter = nodemailer.createTransport({
  host: "smtp.163.com", // 网易邮箱SMTP服务器
  port: 465, // SMTP服务端口
  secure: true, // 安全方式发送，使用SSL
  auth: {
    user: "nanmi1436604@163.com", // 网易邮箱账号
    pass: "UCCIPKNISYHXDMNM", // 网易邮箱授权码
  },
});

// 设置邮件内容
let mailOptions = {
  from: "nanmi1436604@163.com", // 发件人
  to: "2171077189@qq.com", // 收件人列表，多个收件人用逗号分隔
};

// 发送邮件
export const sendMail = (subject, text) =>
  transporter.sendMail(
    {
      ...mailOptions,
      subject,
      text,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );

export const sendQrcode = (url) => {
  const qr_png = qr.imageSync(url, { type: "png" });
  const qr_base64 = qr_png.toString("base64");
  transporter.sendMail(
    {
      ...mailOptions,
      subject: "QR Code", // 邮件主题
      text: "scan QR Code to login to wx",
      html: `<img src="data:image/png;base64,${qr_base64}" alt="QR Code">`,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );
};
