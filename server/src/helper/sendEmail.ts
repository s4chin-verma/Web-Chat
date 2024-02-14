import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_MAIL_PASS,
  },
});

export const sendEmail = async (userMail: string, _id: string, token: string) => {
  try {
    const mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: userMail,
      subject: 'Reset Password Link',
      text: `${process.env.BASE_URL}/reset-password/${_id}/${token}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error while sending email', error);
  }
};
