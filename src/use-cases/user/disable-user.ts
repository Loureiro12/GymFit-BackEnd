import { UsersRepository } from '@/repository/users-repository'
import { StudentUser } from '@prisma/client'
import { UserNotFound } from '../errors/user-not-found'

interface DisableUserUseCaseRequest {
  userId: string
}

interface DisableUserUseCaseResponse {
  user: StudentUser
}

export class DisableUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DisableUserUseCaseRequest): Promise<DisableUserUseCaseResponse> {
    const dataUser = await this.usersRepository.findUserById(userId)

    if (!dataUser) {
      throw new UserNotFound()
    }

    dataUser.status = 'DISABLED'

    const user = await this.usersRepository.updateUser(dataUser, userId)

    return {
      user,
    }
  }
}
