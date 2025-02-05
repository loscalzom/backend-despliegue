import nodemailer from 'nodemailer';
import ENVIROMENT from './enviroment.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENVIROMENT.EMAIL_USERNAME,
        pass: ENVIROMENT.EMAIL_PASSWORD,
    },
});

transporter.sendMail({
    from: ENVIROMENT.EMAIL_USERNAME,
    to: 'test@example.com',
    subject: 'Test Email',
    text: 'This is a test email',
}, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});