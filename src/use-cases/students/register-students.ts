import { StudentUsersRepository } from '@/repository/studentUsers-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { StudentUser } from '@prisma/client'

interface RegisterStudentsUseCaseRequest {
  firstName: string
  lastName: string
  password: string
  email: string
}

interface RegisterStudentsUseCaseResponse {
  user: StudentUser
}

export class RegisterStudentsUseCase {
  constructor(private studentsUsesRepository: StudentUsersRepository) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
  }: RegisterStudentsUseCaseRequest): Promise<RegisterStudentsUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail =
      await this.studentsUsesRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.studentsUsesRepository.create({
      firstName,
      lastName,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}
