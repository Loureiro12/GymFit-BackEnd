import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ExerciseRepository } from '../exercise-repository'

export class PrismaExerciseRepository implements ExerciseRepository {
  async create(data: Prisma.ExerciseCreateInput) {
    const exercise = await prisma.exercise.create({
      data,
    })

    return exercise
  }
}
