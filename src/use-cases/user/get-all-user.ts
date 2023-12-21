import { UsersRepository } from '@/repository/users-repository'
import { StudentUser } from '@prisma/client'

interface RegisterUserUseCaseRequest {
  page: number
  query?: string
}

interface RegisterUserUseCaseResponse {
  users: StudentUser[]
}

export class GetAllUserUseCase {
  constructor(private userUsesRepository: UsersRepository) {}

  async execute({
    page,
    query,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const user = await this.userUsesRepository.listAllUser(page, query)

    return {
      users: user,
    }
  }
}
