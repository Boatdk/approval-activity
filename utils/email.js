const nodemailer = require("nodemailer");
const sendMails = async  ()=> {

  let transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "5735512036@psu.ac.th", // generated ethereal user
      pass: '12345' // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }

  });

  let info = await transporter.sendMail({
    from: '"Fred Foo ??" <5735512036@psu.ac.th>', // sender address
    to: "boatz.dk@gmail.com", // list of receivers
    subject: "Hello ?", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 resolve({
  message: `success`
})

}

module.exports = sendMails