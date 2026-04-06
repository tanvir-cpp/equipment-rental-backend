import { Injectable } from '@nestjs/common';
import { MailerService as NestMailer } from '@nestjs-modules/mailer';


@Injectable()
export class MailerService {
  constructor(private mailer: NestMailer) { }


  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    await this.mailer.sendMail({
      to: email,
      subject: 'Welcome to Equipment Rental System',
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Your account has been created successfully.</p>
        <p>Thank you for using the Equipment Rental System.</p>
      `,
    });
  }


  async sendRentalConfirmation(email: string, rentalId: number): Promise<void> {
    await this.mailer.sendMail({
      to: email,
      subject: `Rental Confirmation - #${rentalId}`,
      html: `
        <h2>Rental Confirmed</h2>
        <p>Your Rental ID: <strong>#${rentalId}</strong></p>
        <p>Thank you for using our service.</p>
      `,
    });
  }
}
