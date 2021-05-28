import 'dotenv/config';
import nodemailer from 'nodemailer';

export const sendEmail = async (emailObj) => {
  const adminMail = process.env.ADMIN_MAIL;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminMail,
      pass: process.env.MAIL_PASS, // generated ethereal password
    }
  });
  // use a queue
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
  