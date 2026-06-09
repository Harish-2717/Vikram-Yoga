import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER || "fahmidhaafra@gmail.com";
    const pass = process.env.SMTP_PASS || "rmep wpjy bctf jmfa";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for port 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Dr. Vikram Yoga & Wellness Centre" <${user}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Error sending email via SMTP:", error);
    return { success: false, error: error.message || String(error) };
  }
}
