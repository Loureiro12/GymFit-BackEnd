import { expect, describe, it, beforeEach } from 'vitest'

import { DeleteExerciseUseCase } from './delete-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercise-repository'
import { ExerciseNotFound } from '../errors/exercise-not-found'

let inMemoryExerciseRepository: InMemoryExerciseRepository
let sut: DeleteExerciseUseCase

describe('Delete Exercise Use Case', () => {
  beforeEach(() => {
    inMemoryExerciseRepository = new InMemoryExerciseRepository()
    sut = new DeleteExerciseUseCase(inMemoryExerciseRepository)
  })
  it('it should not be possible to delete a exercise that does not exist', async () => {
    await inMemoryExerciseRepository.create({
      name: 'Supino reto com barra',
      imageUrl:
        'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treinos-de-peito-supino-reto-com-barra.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WwXS2TeFmeg',
      muscleGroup: 'thorax',
    })

    await expect(() =>
      sut.execute({
        exerciseId: '1234234',
      }),
    ).rejects.toBeInstanceOf(ExerciseNotFound)
  })

  it('should delete exercise', async () => {
    const { id } = await inMemoryExerciseRepository.create({
      name: 'Supino reto com barra',
      imageUrl:
        'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treinos-de-peito-supino-reto-com-barra.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WwXS2TeFmeg',
      muscleGroup: 'thorax',
    })

    const response = await sut.execute({
      exerciseId: id,
    })

    expect(response.status).toEqual(true)
  })
})
