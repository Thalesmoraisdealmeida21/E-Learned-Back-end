import { injectable, inject } from 'tsyringe';
import ICoursesRepository from '../repository/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

@injectable()
class CreateUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<
    | Course[]
    | undefined
    | { id: string; name: string; resume: string; description: string }
  > {
    const courses = await this.coursesRepository.listAllCourses();

    return courses;
  }
}

export default CreateUserService;
