import { PrismaUsersRepository } from '@/repository/prisma/prisma-user-repository'
import { DeleteUserUseCase } from '../user/delete-user'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUserUseCase
}
