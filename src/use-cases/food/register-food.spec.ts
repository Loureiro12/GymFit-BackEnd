import { expect, describe, it, beforeEach } from 'vitest'

import { RegisterFoodUseCase } from './register-food'
import { InMemoryFoodRepository } from '@/repository/in-memory/in-memory-food-repository'

let inMemoryUserRepository: InMemoryFoodRepository
let sut: RegisterFoodUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryFoodRepository()
    sut = new RegisterFoodUseCase(inMemoryUserRepository)
  })
  it('should be able to register', async () => {
    const { food } = await sut.execute({
      name: 'Arroz branco cozido',
      calories: '12800',
      carbohydrates: '2650',
      fat: '020',
      fiber: '160',
      portion: '100',
      protein: '250',
    })

    expect(food.id).toEqual(expect.any(String))
  })
})
