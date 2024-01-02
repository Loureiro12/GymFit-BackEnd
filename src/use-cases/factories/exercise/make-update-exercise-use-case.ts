import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercise-repository'
import { UpdateExerciseUseCase } from '@/use-cases/exercise/update-exercise'

export function makeUpdateExerciseUseCase() {
  const prismaExerciseRepository = new PrismaExerciseRepository()
  const updateExerciseUseCase = new UpdateExerciseUseCase(
    prismaExerciseRepository,
  )

  return updateExerciseUseCase
}
