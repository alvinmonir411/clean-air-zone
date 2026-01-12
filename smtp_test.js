const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function testEmail() {
    console.log("Config:", {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: "********"
    });

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST?.trim(),
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
            user: process.env.SMTP_USER?.trim(),
            pass: process.env.SMTP_PASS?.trim(),
        },
    });

    try {
        console.log("Attempting to send test email...");
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL?.trim(),
            to: process.env.ADMIN_EMAIL?.trim(),
            subject: "SMTP Test",
            text: "This is a test email to verify SMTP configuration.",
            html: "<b>This is a test email to verify SMTP configuration.</b>"
        });
        console.log("✅ Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }
}

testEmail();
