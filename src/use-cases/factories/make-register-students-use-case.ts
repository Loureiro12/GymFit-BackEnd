import { PrismaStudentUsersRepository } from '@/repository/prisma/prisma-studentUsers-repository'
import { RegisterStudentsUseCase } from '../students/register-students'

export function makeRegisterStudentsUseCase() {
  const studentUsersRepository = new PrismaStudentUsersRepository()
  const registerStudentsUseCase = new RegisterStudentsUseCase(
    studentUsersRepository,
  )

  return registerStudentsUseCase
}
