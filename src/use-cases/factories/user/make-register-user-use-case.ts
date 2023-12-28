import { PrismaUsersRepository } from '@/repository/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '../../user/register-user'

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  return registerUserUseCase
}
