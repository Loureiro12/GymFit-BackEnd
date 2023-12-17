import { PrismaStudentUsersRepository } from '@/repository/prisma/prisma-studentUsers-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const studentUsersRepository = new PrismaStudentUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(studentUsersRepository)

  return authenticateUseCase
}
