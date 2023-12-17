import { Prisma, StudentUser } from '@prisma/client'

export interface StudentUsersRepository {
  create(data: Prisma.StudentUserCreateInput): Promise<StudentUser>
  findByEmail(email: string): Promise<StudentUser | null>
  listAllStudents(page: number, query?: string): Promise<StudentUser[]>
}
