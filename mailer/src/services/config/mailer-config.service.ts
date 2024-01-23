import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';

export class MailerConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {

    return {
      transport: "smtps://buggercyber@gmail.com:johnap@123@smtp.gmail.com:587",
      

      defaults: {
        from: "Test mail kiritiarvindss@gmail.com",
      },
    };
  }
}
