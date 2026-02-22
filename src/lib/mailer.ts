import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Email sending failed:', error);
        // If we're in development and email fails, we might still want to know what the token was
        // so we don't block the developer/user during testing if they haven't set up SMTP yet.
        if (process.env.NODE_ENV === 'development') {
            console.warn('Development Fallback: Email failed to send. Check your SMTP credentials in .env');
        }
        throw error;
    }
};
