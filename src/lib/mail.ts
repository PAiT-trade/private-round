import nodemailer from "nodemailer";
import pako from "pako";
import { Readable } from "stream";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST!,
  port: 465,
  secure: true, // Use true for port 465
  auth: {
    user: process.env.MAIL_USER!,
    pass: `e6rAL34$TWDGvurFEaZ#`,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachement?: File
) => {
  console.log({
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASSWORD!,
  });
  // Convert File to Buffer if provided
  const attachmentBuffer = attachement ? await fileToBuffer(attachement) : null;
  // Compress the buffer
  const compressedBuffer = compressBuffer(attachmentBuffer!);

  try {
    const info = await transporter.sendMail({
      from: `info@paitprivateround.fi`,
      to,
      subject,
      html,
      attachments: attachmentBuffer
        ? [
            {
              filename: `${attachement!.name}.pdf`,
              content: attachmentBuffer,
              contentType: `application/pdf`,
            },
          ]
        : [],
    });

    await transporter.sendMail({
      from: `info@paitprivateround.fi`,
      to: `info@paitprivateround.fi`,
      subject: `Signed SAFT Agreement document`,
      text: `A user has signed the SAFT Agreement document. The document is attached to this email.`,
      attachments: attachmentBuffer
        ? [
            {
              filename: `${attachement!.name}.pdf`,
              content: attachmentBuffer,
              contentType: `application/pdf`,
            },
          ]
        : [],
    });

    console.log("Email sent:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Stream the compressed buffer to the email attachment
const bufferToStream = (buffer: Buffer): Readable => {
  const readable = new Readable();
  readable._read = () => {}; // No-op
  readable.push(buffer);
  readable.push(null);
  return readable;
};

async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export const compressBuffer = (buffer: Buffer): Buffer => {
  // Set maximum compression level
  const compressed = pako.gzip(buffer, { level: 8 });
  return Buffer.from(compressed);
};
