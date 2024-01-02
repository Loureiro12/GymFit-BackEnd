import { Exercise, Prisma } from '@prisma/client'
import { ExerciseRepository } from '@/repository/exercise-repository'
import { ExerciseNotFound } from '../errors/exercise-not-found'

interface UpdateExerciseUseCaseRequest {
  exerciseId: string
  data: Prisma.ExerciseCreateInput
}

interface UpdateExerciseUseCaseResponse {
  exercise: Exercise
}

export class UpdateExerciseUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    exerciseId,
    data,
  }: UpdateExerciseUseCaseRequest): Promise<UpdateExerciseUseCaseResponse> {
    const dataFood = await this.exerciseRepository.findExerciseById(exerciseId)

    if (!dataFood) {
      throw new ExerciseNotFound()
    }

    const exercise = await this.exerciseRepository.updateExercise(
      data,
      exerciseId,
    )

    return {
      exercise,
    }
  }
}
