import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'lauryn57@ethereal.email',
        pass: 'azasygBkKfDPuVyE8s'
    },
  });

export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: '"OTP Service" <lauryn57@ethereal.email>', // sender address
        to: email, // recipient address
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

