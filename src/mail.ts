import nodemailer from 'nodemailer'

export const sendEmail = (to: string, name: string, password: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const config = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject: 'Woogie password reset',
    text: `Hi ${name}, you requested to reset your password. Your new password is: ${password}`,
  }

  transporter.sendMail(config)
  transporter.close()
}