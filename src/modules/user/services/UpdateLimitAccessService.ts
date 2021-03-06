import { injectable, inject } from 'tsyringe';

// import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
// import AppError from '@shared/errors/AppError';
// import UsersCourses from '@modules/user/infra/typeorm/entities/UsersCourses';

import IUsersCoursesRepository from '../repositories/IUsersCoursesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    // @inject('UsersRepository')
    // private usersRepository: IUsersRepository,

    @inject('UsersCoursesRepository')
    private usersCoursesRepository: IUsersCoursesRepository,
  ) {}

  public async execute(course_id: string, user_id: string): Promise<void> {
    await this.usersCoursesRepository.updateLimitAccess(course_id, user_id);
  }
}

export default CreateUserService;
