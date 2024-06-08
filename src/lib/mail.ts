import nodemailer from "nodemailer";
interface ISendMail {
  to: string;
  name: string;
  subject: string;
  body: string;
}
export async function sendMail({ to, name, subject, body }: ISendMail) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  console.log(SMTP_EMAIL, " - ", SMTP_PASSWORD);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
    logger: true,

    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    const testResult = await transport.verify();
  } catch (error) {}
  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    return sendResult;
  } catch (error) {}
}
