import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'julionfonseca@gmail.com',
          pass: 'maeguipai31245'
        }
      });

      this.client = transporter;
    })
  }

  async execute(to: string, subject: string, variables: Record<string, string | undefined>, path: string) {

    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "NPS <noreply@nps.com.br>"
    });

    console.log('Message sent: ', message.messageId);
    console.log('Preview URL: ', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
