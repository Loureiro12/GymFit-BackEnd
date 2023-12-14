import { StudentUsersRepository } from '@/repository/studentUsers-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterStudentsUseCaseRequest {
  firstName: string
  lastName: string
  password: string
  email: string
}

export class RegisterStudentsUseCase {
  constructor(private studentsUsesRepository: StudentUsersRepository) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
  }: RegisterStudentsUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail =
      await this.studentsUsesRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.studentsUsesRepository.create({
      firstName,
      lastName,
      email,
      password: password_hash,
    })
  }
}
