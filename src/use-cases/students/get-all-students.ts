import { StudentUsersRepository } from '@/repository/studentUsers-repository'
import { StudentUser } from '@prisma/client'

interface RegisterStudentsUseCaseRequest {
  page: number
  query?: string
}

interface RegisterStudentsUseCaseResponse {
  users: StudentUser[]
}

export class GetAllStudentsUseCase {
  constructor(private studentsUsesRepository: StudentUsersRepository) {}

  async execute({
    page,
    query,
  }: RegisterStudentsUseCaseRequest): Promise<RegisterStudentsUseCaseResponse> {
    const students = await this.studentsUsesRepository.listAllStudents(
      page,
      query,
    )

    return {
      users: students,
    }
  }
}
