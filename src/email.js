const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "majastefa11@gmail.com",
    pass: "zixr wuek oaie izgm"
  }
})

const sendHelpEmail = (email, content) => {
  const mailOptions = {
    from: email,
    to: "stefanovicmaja03@gmail.com",
    subject: "Help center",
    text: content
  }

  transporter.sendMail(mailOptions, (error, res) => {
    if(error) {
      console.log(error)
    } else {
      console.log('Help email sent!')
    }
  })
}

module.exports = {
  sendHelpEmail
}