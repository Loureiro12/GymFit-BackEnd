import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercise-repository'
import { GetAllExercisesUseCase } from '@/use-cases/exercise/get-exercise'

export function makeGetExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository()
  const getAllFoodsUseCase = new GetAllExercisesUseCase(exerciseRepository)

  return getAllFoodsUseCase
}
