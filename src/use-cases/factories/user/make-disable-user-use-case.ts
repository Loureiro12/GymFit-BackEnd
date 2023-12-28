import { PrismaUsersRepository } from '@/repository/prisma/prisma-user-repository'
import { DisableUserUseCase } from '../../user/disable-user'

export function makeDisableUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const disableUserUseCase = new DisableUserUseCase(usersRepository)

  return disableUserUseCase
}
