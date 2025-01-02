const Mailtrap = require("./mailtrap");

exports.sendResetEmail = async (email, url) => {
  await Mailtrap.transporter.sendMail({
    from: `${Mailtrap.sender.name} <${Mailtrap.sender.email}>`,
    to: email,
    subject: "Reset Password",
    text: `this is the link ${url}`,
   
  });
};
