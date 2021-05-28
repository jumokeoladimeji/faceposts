import 'dotenv/config';
import nodemailer from 'nodemailer';

export const sendEmail = async (emailObj) => {
  const adminMail = process.env.ADMIN_MAIL;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: adminMail,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_USER_REFRESH_TOKEN,
      accessToken: process.env.MAIL_ACCESS_TOKEN,
      expires: 1484314697598
    }
  });

  const mailBody = {
    from: `Faceposts <${adminMail}>`,
    to: emailObj.email,
    subject: emailObj.subject,
    html: emailObj.message
  };
  try {
    await transporter.sendMail(mailBody);
  } catch (error) {
    throw 'Error sending the email to user';
  }
}
  