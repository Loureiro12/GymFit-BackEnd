import { expect, describe, it, beforeEach } from 'vitest'

import { GetAllExercisesUseCase } from './get-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercise-repository'

let inMemoryExerciseRepository: InMemoryExerciseRepository
let sut: GetAllExercisesUseCase

describe('Fetch Exercise Use Case', () => {
  beforeEach(async () => {
    inMemoryExerciseRepository = new InMemoryExerciseRepository()
    sut = new GetAllExercisesUseCase(inMemoryExerciseRepository)
  })

  it('should be able to fetch foods', async () => {
    await inMemoryExerciseRepository.create({
      name: 'Supino reto com barra',
      imageUrl:
        'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treinos-de-peito-supino-reto-com-barra.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WwXS2TeFmeg',
      muscleGroup: 'thorax',
    })

    const { exercises } = await sut.execute({ page: 1 })

    expect(exercises).toHaveLength(1)
    expect(exercises).toEqual([
      expect.objectContaining({ name: 'Supino reto com barra' }),
    ])
  })
})
