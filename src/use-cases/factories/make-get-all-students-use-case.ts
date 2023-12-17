import { PrismaStudentUsersRepository } from '@/repository/prisma/prisma-studentUsers-repository'
import { GetAllStudentsUseCase } from '../students/get-all-students'

export function makeGetAllStudentsUseCase() {
  const studentUsersRepository = new PrismaStudentUsersRepository()
  const registerStudentsUseCase = new GetAllStudentsUseCase(
    studentUsersRepository,
  )

  return registerStudentsUseCase
}
