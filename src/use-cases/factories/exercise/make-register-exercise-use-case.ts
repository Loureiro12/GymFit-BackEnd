import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercise-repository'
import { CreateExerciseUseCase } from '@/use-cases/exercise/create-exercise'

export function makeCreateExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository()
  const createExerciseUseCase = new CreateExerciseUseCase(exerciseRepository)

  return createExerciseUseCase
}
