import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateExerciseUseCase } from './update-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercise-repository'
import { ExerciseNotFound } from '../errors/exercise-not-found'
import { Prisma } from '@prisma/client'

let inMemoryExerciseRepository: InMemoryExerciseRepository
let sut: UpdateExerciseUseCase

describe('Update Use Case', () => {
  beforeEach(() => {
    inMemoryExerciseRepository = new InMemoryExerciseRepository()
    sut = new UpdateExerciseUseCase(inMemoryExerciseRepository)
  })
  it('should be able to update', async () => {
    const exerciseData = await inMemoryExerciseRepository.create({
      name: 'Supino reto com barra',
      imageUrl:
        'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treinos-de-peito-supino-reto-com-barra.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WwXS2TeFmeg',
      muscleGroup: 'thorax',
    })

    const data: Prisma.ExerciseCreateInput = {
      name: 'supino reto',
      imageUrl:
        'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treinos-de-peito-supino-reto-com-barra.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WwXS2TeFmeg',
      muscleGroup: 'thorax',
    }

    const { exercise } = await sut.execute({
      data,
      exerciseId: exerciseData.id,
    })

    expect(exercise.name).toEqual('supino reto')

    expect(exercise.id).toEqual(expect.any(String))
  })

  it('should change a exercise invalid id', async () => {
    const exercise = await inMemoryExerciseRepository.create({
      name: 'Supino reto com barra',
      imageUrl:
        'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treinos-de-peito-supino-reto-com-barra.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WwXS2TeFmeg',
      muscleGroup: 'thorax',
    })

    await expect(() =>
      sut.execute({
        exerciseId: '1234234',
        data: exercise,
      }),
    ).rejects.toBeInstanceOf(ExerciseNotFound)
  })
})
