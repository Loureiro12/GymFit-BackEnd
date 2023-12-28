import { PrismaUsersRepository } from '@/repository/prisma/prisma-user-repository'
import { GetAllUserUseCase } from '../../user/get-all-user'

export function makeGetAllUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new GetAllUserUseCase(usersRepository)

  return registerUserUseCase
}
