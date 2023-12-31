import { Prisma, Exercise } from '@prisma/client'
import { ExerciseRepository } from '../exercise-repository'

export class InMemoryExerciseRepository implements ExerciseRepository {
  public items: Exercise[] = []

  async create(data: Prisma.ExerciseCreateInput) {
    const food = {
      id: 'food-1',
      name: data.name,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      muscleGroup: data.muscleGroup,
    }

    this.items.push(food)

    return food
  }
}
