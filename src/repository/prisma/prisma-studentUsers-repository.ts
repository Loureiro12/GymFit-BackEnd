import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { StudentUsersRepository } from '../studentUsers-repository'

export class PrismaStudentUsersRepository implements StudentUsersRepository {
  async create(data: Prisma.StudentUserCreateInput) {
    const studentUser = await prisma.studentUser.create({
      data,
    })

    return studentUser
  }

  async findByEmail(email: string) {
    const user = await prisma.studentUser.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
