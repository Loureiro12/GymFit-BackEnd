import { UsersRepository } from '@/repository/users-repository'
import { UserNotFound } from '../errors/user-not-found'

interface DeleteUserUseCaseRequest {
  userId: string
}

interface DeleteUserUseCaseResponse {
  status: boolean
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const dataUser = await this.usersRepository.findUserById(userId)

    console.log('##########', dataUser)

    if (!dataUser) {
      console.log('entrou')
      throw new UserNotFound()
    }

    const status = await this.usersRepository.deleteUser(userId)

    return {
      status,
    }
  }
}
