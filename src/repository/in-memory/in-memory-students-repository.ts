import { Prisma, StudentUser } from '@prisma/client'
import { StudentUsersRepository } from '../studentUsers-repository'

export class InMemoryStudentsRepository implements StudentUsersRepository {
  public items: StudentUser[] = []

  async create(data: Prisma.StudentUserCreateInput) {
    const user = {
      id: 'user-1',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      birthday: null,
      gender: null,
      goal: null,
      height: null,
      weight: null,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
