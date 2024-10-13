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


export const sendOTPEmail = async (username, email, otp) => {
    const mailOptions = {
        from: `${process.env.EMAIL}`, // sender address
        to: email, // recipient address
        subject: 'Your OTP for TaskTrail Verification',
        text: `Dear ${username},

Thank you for choosing TaskTrail! To ensure the security of your account, we need to verify your identity. Please use the one-time password (OTP) below to complete your verification:

Your OTP: ${otp}

This OTP is valid for the next 10 minutes. Please enter it on the verification page to continue using TaskTrail.

Thank you for being a part of the TaskTrail community!

Best regards,
The TaskTrail Team`,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

