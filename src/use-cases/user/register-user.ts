import { UsersRepository } from '@/repository/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { StudentUser } from '@prisma/client'

interface RegisterUserUseCaseRequest {
  firstName: string
  lastName: string
  password: string
  email: string
}

interface RegisterUserUseCaseResponse {
  user: StudentUser
}

export class RegisterUserUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userUsesRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userUsesRepository.create({
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
