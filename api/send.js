// api/send.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, subject, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject || 'رسالة جديدة من الموقع',
      text: `
الاسم: ${name}
الإيميل: ${email}
التليفون: ${phone || "غير مُدخل"}

الرسالة:
${message}
      `,
    });

    res.status(200).json({ success: true, message: 'تم إرسال الرسالة ✅' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'حصل خطأ ❌' });
  }
}