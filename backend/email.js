const nodemailer = require('nodemailer');

const sendEmail = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Code Verification',
        text: `Insert ${code} as your code to reset your password`,
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
