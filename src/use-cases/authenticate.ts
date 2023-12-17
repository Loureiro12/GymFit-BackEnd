import { StudentUsersRepository } from '@/repository/studentUsers-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { StudentUser } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: StudentUser
}

export class AuthenticateUseCase {
  constructor(private studentUsersRepository: StudentUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const studentUser = await this.studentUsersRepository.findByEmail(email)

    if (!studentUser) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, studentUser.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user: studentUser,
    }
  }
}
