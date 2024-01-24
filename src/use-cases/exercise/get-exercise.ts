import { ExerciseRepository } from '@/repository/exercise-repository'
import { Exercise } from '@prisma/client'

interface GetAllExerciseUseCaseRequest {
  page: number
  query?: string
  id?: string
}

interface GetAllExerciseUseCaseResponse {
  exercises: Exercise[]
}

export class GetAllExercisesUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    page,
    query,
    id,
  }: GetAllExerciseUseCaseRequest): Promise<GetAllExerciseUseCaseResponse> {
    const exercises = await this.exerciseRepository.listExercises(
      page,
      query,
      id,
    )

    return {
      exercises,
    }
  }
}
