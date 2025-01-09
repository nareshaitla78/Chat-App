// const nodemailer = require("nodemailer");

// const sendEmail = async (email, username) => {
//   try {
//     const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: process.env.EMAIL,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       });
      

//     const mailOptions = {
//       from: '"HuntFor Team" nareshaitla1122@gmail.com', // Sender address
//       to: email, // List of receivers
//       subject: "Welcome to HuntFor!", // Subject line
//       text: `Hi ${username}, Welcome to HuntFor! We are excited to have you on board.`,
//       html: `<h1>Hi ${username},</h1><p>Welcome to <strong>HuntFor</strong>! We are excited to have you on board.</p>`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// module.exports = sendEmail;
