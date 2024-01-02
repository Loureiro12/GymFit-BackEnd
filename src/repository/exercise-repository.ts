import { Prisma, Exercise } from '@prisma/client'

export interface ExerciseRepository {
  create(data: Prisma.ExerciseCreateInput): Promise<Exercise>
  listExercises(page: number, query?: string): Promise<Exercise[]>
  findExerciseById(exerciseId: string): Promise<Exercise | null>
  deleteExercise(exerciseId: string): Promise<boolean>
  updateExercise(
    data: Prisma.ExerciseCreateInput,
    exerciseId: string,
  ): Promise<Exercise>
}
