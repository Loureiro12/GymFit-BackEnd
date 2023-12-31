import { Prisma, Exercise } from '@prisma/client'

export interface ExerciseRepository {
  create(data: Prisma.ExerciseCreateInput): Promise<Exercise>
  listExercises(page: number, query?: string): Promise<Exercise[]>
}
