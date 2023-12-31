import { ExerciseRepository } from '@/repository/exercise-repository'
import { Exercise } from '@prisma/client'

interface GetAllExerciseUseCaseRequest {
  page: number
  query?: string
}

interface GetAllExerciseUseCaseResponse {
  exercises: Exercise[]
}

export class GetAllExercisesUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    page,
    query,
  }: GetAllExerciseUseCaseRequest): Promise<GetAllExerciseUseCaseResponse> {
    const exercises = await this.exerciseRepository.listExercises(page, query)

    return {
      exercises,
    }
  }
}
