import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import MY_EM from "./.env";
import EM_PASS from "./.env";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Replace these values with your email configuration
const emailConfig = {
  service: "SMTP",
  auth: {
    user: MY_EM,
    pass: EM_PASS,
  },
};

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: email,
    to: "recipient@example.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred while sending the email.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
