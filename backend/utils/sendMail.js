import nodemailer from "nodemailer";
import pdf from 'html-pdf';
import fs from 'fs';


const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

const sendEmailTemplate = async (email, renderedTemplate) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: email,
    subject: `Invoice and Tour Details`,
    html: `
    <p>Dear Customer,</p>
    <p>Here is your tour information and invoice of trip.</p>
    ${renderedTemplate}
    <p>If you have any questions or concerns, please contact us.We truely appreciate ...</p>
    <p>Best regards.</p>
    `,
    attachments: [
      {
        filename: 'invoice.pdf',
        content: await generatePDF(renderedTemplate),
        encoding: 'base64',
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info.response; 
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; 
  }
};

const generatePDF = async (htmlContent) => {
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('base64'));
      }
    });
  });
};
export { sendMail, sendEmailTemplate };
