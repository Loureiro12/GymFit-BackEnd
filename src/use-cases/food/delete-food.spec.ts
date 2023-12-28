import { expect, describe, it, beforeEach } from 'vitest'

import { DeleteFoodUseCase } from './delete-food'
import { InMemoryFoodRepository } from '@/repository/in-memory/in-memory-food-repository'
import { FoodNotFound } from '../errors/food-not-found'

let inMemoryFoodRepository: InMemoryFoodRepository
let sut: DeleteFoodUseCase

describe('Delete Food Use Case', () => {
  beforeEach(() => {
    inMemoryFoodRepository = new InMemoryFoodRepository()
    sut = new DeleteFoodUseCase(inMemoryFoodRepository)
  })
  it('it should not be possible to delete a food that does not exist', async () => {
    await inMemoryFoodRepository.create({
      name: 'Arroz branco cozido',
      calories: '12800',
      carbohydrates: '2650',
      fat: '020',
      fiber: '160',
      portion: '100',
      protein: '250',
    })

    await expect(() =>
      sut.execute({
        foodId: '1234234',
      }),
    ).rejects.toBeInstanceOf(FoodNotFound)
  })

  it('should delete food', async () => {
    const { id } = await inMemoryFoodRepository.create({
      name: 'Arroz branco cozido',
      calories: '12800',
      carbohydrates: '2650',
      fat: '020',
      fiber: '160',
      portion: '100',
      protein: '250',
    })

    const response = await sut.execute({
      foodId: id,
    })

    expect(response.status).toEqual(true)
  })
})
