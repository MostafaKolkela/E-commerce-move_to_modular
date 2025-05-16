// utils/email.util.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ecommercep671@gmail.com",
    pass: "vxju wbex eoez aaya",
  },
});

const sendEmail = async (to, content) => {
  await transporter.sendMail({
    from: "Your App <your_email@gmail.com>",
    to,
    subject: "OTP Code",
    text: content,
  });
};

module.exports = sendEmail;
