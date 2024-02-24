import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { htmlTemplate } from "../utils";
export async function sendMail(email: string, userId: string, courseId: string) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  const mailOptions: Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `Successfully Registered!🚀`,
    html: htmlTemplate(email, userId, courseId),
    // attachments: [
    //   {
    //     filename: "certificate.jpg",
    //     path: poster,
    //   },

    // ],
  };

  try {
    await transport.sendMail(mailOptions);
    return { message: "Success!", status: 200 };
  } catch (err: any) {
    return { message: err.message, status: 500 };
  }
}
