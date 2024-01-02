import { ExerciseRepository } from '@/repository/exercise-repository'
import { ExerciseNotFound } from '../errors/exercise-not-found'

interface DeleteExerciseUseCaseRequest {
  exerciseId: string
}

interface DeleteExerciseUseCaseResponse {
  status: boolean
}

export class DeleteExerciseUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    exerciseId,
  }: DeleteExerciseUseCaseRequest): Promise<DeleteExerciseUseCaseResponse> {
    const dataExercise =
      await this.exerciseRepository.findExerciseById(exerciseId)

    if (!dataExercise) {
      throw new ExerciseNotFound()
    }

    const status = await this.exerciseRepository.deleteExercise(exerciseId)

    return {
      status,
    }
  }
}
