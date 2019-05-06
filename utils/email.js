const nodemailer = require("nodemailer");
async function sendMails(){
  console.log('Sending message...');
  let transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'activity.psu@gmail.com',
            pass: '11501112'
        },
        logger: false,
        debug: false // include SMTP traffic in the logs
    },
    {
        // default message fields

        // sender info
        from: 'Activity PSU <activity.psu@gmail.com>',
        headers: {
            'X-Laziness-level': 1000 // just an example header, no need to use this
        }
    }
);
let message = {
  // Comma separated list of recipients
  to: 'K boat <5735512036@psu.ac.th>',

  // Subject of the message
  subject: 'activity in website',

  // plaintext body
  // text: 'Students create new activty.Lets check in website',

  // HTML body
  html:`<h2>Students create new activty.Lets check in website</h2>
  <p>pls confirm: this link <br/><img src="cid:nyan@example.com"/></p>,`
      

};


  // let info = await transporter.sendMail({
  //   from: '"Fred Foo ??" <5735512036@psu.ac.th>', // sender address
  //   to: "boatz.dk@gmail.com", // list of receivers
  //   subject: "Hello ?", // Subject line
  //   text: "Hello world?", // plain text body
  //   html:`asdasd
  //   asdasd
  //   dasd
  //   sasdsa
    
  //   pls confirm: ${url}` // html body
  // });

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  console.log(info)
  // console.log(nodemailer.getTestMessageUrl(info));

  // only needed when using pooled connections
  transporter.close();
}

// sendMails().catch(err => {
//   console.error(err.message);
//   process.exit(1);
// });
  

module.exports = sendMails