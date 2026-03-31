const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3005;

// Serve static files
app.use(express.static("public"));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API endpoint
app.post("/send", async (req, res) => {
  const { name, email, subject, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject || "رسالة جديدة من الموقع",
      text: `
        الاسم: ${name}
        الإيميل: ${email}
        التليفون: ${phone || "غير مُدخل"}
        
        الرسالة:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "تم إرسال الرسالة ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حصل خطأ ❌" });
  }
});

// Start server
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`✅ Email Server running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} مستخدم، هجرب ${port + 1} ...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(PORT);