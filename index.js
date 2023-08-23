import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const SendMessage = async (req, res) => {
  try {
    const { email, message, name } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: `${process.env.MY_EM}`,
        pass: `${process.env.EM_PASS}`,
      },
    });
    const mailOptions = {
      from: email,
      to: "ntirukelly@gmail.com",
      subject: "Portfolio Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while sending the email.");
  }
};
export default SendMessage;
