import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_KEY
    },
  });


export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: `${process.env.EMAIL}`, // sender address
        to: email, // recipient address
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

