import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
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

  async listAllUser(page: number, query?: string) {
    if (query) {
      const users = await prisma.studentUser.findMany({
        where: {
          firstName: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })

      return users
    }

    const users = await prisma.studentUser.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return users
  }
}
