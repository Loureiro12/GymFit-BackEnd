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

  async listExercises(page: number, query?: string | undefined) {
    if (query) {
      const users = await prisma.exercise.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })

      return users
    }

    const exercise = await prisma.exercise.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return exercise
  }
}
