import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  auth: {
    user: "webdev.faizanali@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendNodemailerMail = async ({
  to,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  const mailOptions = {
    from: process.env.USERNAME,
    to: to,
    subject: subject,
    html: html,
    attachments: attachments,
  };
  transporter.sendMail(mailOptions);
};

export default sendNodemailerMail;

// import sgMail from "@sendgrid/mail"

// sgMail.setApiKey(process.env.SG_KEY);

// const sendSGMail = async ({ to, sender, subject, html, attachments, text }) => {
//   try {
//     const from = "exemple@gmail.com";

//     const msg = {
//       to: to, // Change to your recipient
//       from: from, // Change to your verified sender
//       subject: subject,
//       html: html,
//       // text: text,
//       attachments,
//     };

//     return sgMail.send(msg);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default sendSGMail;
// // exports.sendEmail = async (args) => {
// //   if (!process.env.NODE_ENV === "development") {
// //     return Promise.resolve();
// //   } else {
// //     return sendSGMail(args);
// //   }
// // };
