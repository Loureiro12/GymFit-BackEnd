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

  async listExercises() {
    const exercise = this.items.slice()

    return exercise
  }

  async findExerciseById(id: string) {
    const exercise = this.items.find((item) => item.id === id)

    if (!exercise) {
      return null
    }

    return exercise
  }

  async deleteExercise(id: string) {
    const exercise = this.items.find((item) => item.id === id)

    if (!exercise) {
      return false
    }

    return true
  }

  async updateExercise(data: Prisma.ExerciseCreateInput, exerciseId: string) {
    const exercise = {
      id: exerciseId,
      name: data.name,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      muscleGroup: data.muscleGroup,
    }

    this.items.push(exercise)

    return exercise
  }
}
