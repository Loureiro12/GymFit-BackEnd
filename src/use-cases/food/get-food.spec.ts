import { expect, describe, it, beforeEach } from 'vitest'

import { GetAllFoodsUseCase } from './get-food'
import { InMemoryFoodRepository } from '@/repository/in-memory/in-memory-food-repository'

let inMemoryUserRepository: InMemoryFoodRepository
let sut: GetAllFoodsUseCase

describe('Fetch Foods Use Case', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryFoodRepository()
    sut = new GetAllFoodsUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch foods', async () => {
    await inMemoryUserRepository.create({
      name: 'Arroz branco cozido',
      calories: '12800',
      carbohydrates: '2650',
      fat: '020',
      fiber: '160',
      portion: '100',
      protein: '250',
    })

    const { foods } = await sut.execute({ page: 1 })

    expect(foods).toHaveLength(1)
    expect(foods).toEqual([
      expect.objectContaining({ name: 'Arroz branco cozido' }),
    ])
  })
})
