import nodemailer from 'nodemailer';
// Hàm gửi email
const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    //host: process.env.SMTP_HOST,// Địa chỉ host SMTP
    host: process.env.SMTP_GMAIL,// Địa chỉ host SMTP
    port: process.env.SMTP_PORT_GMAIL,// Cổng SMTP
    //port: process.env.SMTP_PORT,// Cổng SMTP
    auth: {
      // user: process.env.SMTP_EMAIL,// Tài khoản email
      // pass: process.env.SMTP_PASSWORD,// Mật khẩu email
      user: process.env.EMAIL_NAME,// Tài khoản email
      pass: process.env.EMAIL_APP_PASSWORD,// Mật khẩu email
    },
  });
// Định dạng nội dung email
  const message = {
    // Tên người gửi và địa chỉ email người gửi
    //from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    from: `${process.env.SMTP_FROM_NAME} <${process.env.EMAIL_NAME}>`,
    to: options.email, // Địa chỉ email người nhận
    subject: options.subject, // Chủ đề của email
    html: options.message, // Nội dung HTML của email
  };
// Gửi email
  await transport.sendMail(message);
};

export default sendEmail;