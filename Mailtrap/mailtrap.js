const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: 'jazlyn99@ethereal.email',
    pass: '2hc66FwyzCAZqdXSyN'
},
});

const sender = {
  name: "EZY SKILLS",
  email: "ezyskillsupport@gmail.com",
};

module.exports = { transporter, sender };
