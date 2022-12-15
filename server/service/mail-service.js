const nodemailer = require('nodemailer');

class MailService {
  //for mail agent initialization
  constructor() {
    this.transpoerter = nodemailer.createTransport({
      host: process.env.POST_SMTP_HOST,
      port: process.env.POST_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.POST_SMTP_USER,
        pass: process.env.POST_SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    /* await this.transpoerter.sendMail({
      from: process.env.POST_SMTP_USER,
      to,
      subject: 'Account activation' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>For activation click on link</h1>
          <h href="${link}"> ${link} </h>
        </div>
        `,
    }); */
  }
}

module.exports = new MailService();
