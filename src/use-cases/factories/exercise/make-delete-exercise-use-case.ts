import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercise-repository'
import { DeleteExerciseUseCase } from '@/use-cases/exercise/delete-exercise'

export function makeDeleteExerciseUseCase() {
  const prismaExerciseRepository = new PrismaExerciseRepository()
  const deleteExerciseUseCase = new DeleteExerciseUseCase(
    prismaExerciseRepository,
  )

  return deleteExerciseUseCase
}
