const sgMail = require('@sendgrid/mail');
require('dotenv').config();  
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 
// console.log("helloo",process.env.SENDGRID_API_KEY,sgMail);
const sendEmail = async (to, subject, htmlContent) => {
  const msg = {
    to,
    from: process.env.EMAIL_USER,  
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error.response.body); 
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
