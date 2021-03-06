import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class SendMailResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(
    user_logged: string,
    to: string,
    html: string,
    subject: string,
  ): Promise<void> {
    const userToSend = await this.usersRepository.findByUuid(to);

    const user_logged_data = await this.usersRepository.findByUuid(user_logged);

    if (!user_logged_data) {
      throw new AppError('User logged not found');
    }

    if (user_logged_data.level !== 'ADM') {
      if (!userToSend) {
        throw new AppError('User not found');
      }

      await this.mailProvider.sendMail({
        to: {
          name: userToSend.name,
          email: userToSend.email,
        },
        subject,
        html,
      });
    }
  }
}
