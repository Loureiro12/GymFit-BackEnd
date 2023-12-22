import { Prisma, StudentUser } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.StudentUserCreateInput): Promise<StudentUser>
  findByEmail(email: string): Promise<StudentUser | null>
  listAllUser(page: number, query?: string): Promise<StudentUser[]>
  findUserById(id: string): Promise<StudentUser | null>
  updateUser(
    data: Prisma.StudentUserCreateInput,
    id: string,
  ): Promise<StudentUser>
}
