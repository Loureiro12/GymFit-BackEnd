import { Prisma, StudentUser } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUserRepository implements UsersRepository {
  public items: StudentUser[] = []

  async create(data: Prisma.StudentUserCreateInput) {
    const user = {
      id: 'user-1',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      gender: null,
      birthday: null,
      weight: null,
      height: null,
      goal: null,
      role: data?.role,
      status: data?.status,
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

  async listAllUser() {
    const user = this.items.slice()

    return user
  }

  async findUserById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async updateUser(data: Prisma.StudentUserCreateInput, id: string) {
    const user = {
      id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      gender: null,
      birthday: null,
      weight: null,
      height: null,
      goal: null,
      role: data?.role,
      status: data.status,
    }

    this.items.push(user)

    return user
  }

  async deleteUser(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return false
    }

    return true
  }
}
