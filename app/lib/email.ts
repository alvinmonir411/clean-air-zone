import nodemailer from "nodemailer";

export async function sendConfirmationEmail(data: {
  email: string;
  registrationNumber: string;
  registrationLocation: string;
  vehicleType: string;
  cleanAirZone: string;
  selectedDates: string[];
  totalAmount: number;
}) {
  const transporter = nodemailer.createTransport({
    host: (process.env.SMTP_HOST || "").split("//")[0].trim(),
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: (process.env.SMTP_PORT || "").trim() === "465",
    auth: {
      user: (process.env.SMTP_USER || "").trim(),
      pass: (process.env.SMTP_PASS || "").trim(),
    },
  });

  const formattedAmount = (data.totalAmount / 100).toFixed(2);
  const formattedDates = data.selectedDates.join(", ");

  const mailOptions = {
    from: `"${process.env.FROM_EMAIL_NAME || "Payment Confirmation"}" <${(process.env.FROM_EMAIL || "").trim()}>`,
    to: (data.email || "").trim(),
    bcc: (process.env.ADMIN_EMAIL || "").trim(),
    subject: `Payment Confirmed - ${data.registrationNumber}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; color: #333; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #2e7d32; margin: 0; font-size: 24px;">Payment Successful!</h1>
          <p style="color: #666; font-size: 16px;">Thank you for your payment.</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #2e7d32;">
          <h2 style="margin-top: 0; font-size: 18px; color: #2c3e50; border-bottom: 1px solid #dee2e6; padding-bottom: 10px;">Transaction Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 45%;"><strong>Registration Number:</strong></td>
              <td style="padding: 8px 0; font-weight: 600;">${data.registrationNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Registration Location:</strong></td>
              <td style="padding: 8px 0;">${data.registrationLocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Vehicle Type:</strong></td>
              <td style="padding: 8px 0;">${data.vehicleType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Clean Air Zone:</strong></td>
              <td style="padding: 8px 0;">${data.cleanAirZone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Selected Dates:</strong></td>
              <td style="padding: 8px 0;">${formattedDates}</td>
            </tr>
            <tr>
              <td style="padding: 15px 0 8px 0; color: #2e7d32; font-size: 18px;"><strong>Total Paid:</strong></td>
              <td style="padding: 15px 0 8px 0; color: #2e7d32; font-size: 18px; font-weight: bold;">£${formattedAmount}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 14px; color: #666;">This is an automated confirmation of your Clean Air Zone payment. Please keep this email for your records.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
          <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} Clean Air Zone Payments. All rights reserved.</p>
          <p style="margin: 5px 0;">If you have any questions, please reply to this email.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}
