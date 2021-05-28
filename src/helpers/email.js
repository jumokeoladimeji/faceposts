import 'dotenv/config';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
const adminMail = process.env.ADMIN_MAIL;

const createTransporter = async () => { 
  const oauth2Client = new OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAIL_USER_REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: adminMail,
      accessToken,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_USER_REFRESH_TOKEN
    }
  });

  return transporter;
};

export const sendEmail = async (emailObj) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `Faceposts <${adminMail}>`,
    to: emailObj.email,
    subject: emailObj.subject,
    html: emailObj.message
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw 'Error sending the email to user';
  }
}
