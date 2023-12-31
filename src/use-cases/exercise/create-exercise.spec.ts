import { expect, describe, it, beforeEach } from 'vitest'

import { CreateExerciseUseCase } from './create-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercise-repository'

let inMemoryExerciseRepository: InMemoryExerciseRepository
let sut: CreateExerciseUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryExerciseRepository = new InMemoryExerciseRepository()
    sut = new CreateExerciseUseCase(inMemoryExerciseRepository)
  })
  it('should be able to create', async () => {
    const { exercise } = await sut.execute({
      name: 'Supino reto com barra',
      imageUrl:
        'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treinos-de-peito-supino-reto-com-barra.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WwXS2TeFmeg',
      muscleGroup: 'thorax',
    })

    expect(exercise.id).toEqual(expect.any(String))
  })
})
