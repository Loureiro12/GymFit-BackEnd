import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryFoodRepository } from '@/repository/in-memory/in-memory-food-repository'
import { UpdateFoodUseCase } from './update-food'
import { FoodNotFound } from '../errors/food-not-found'

let inMemoryUserRepository: InMemoryFoodRepository
let sut: UpdateFoodUseCase

describe('Update Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryFoodRepository()
    sut = new UpdateFoodUseCase(inMemoryUserRepository)
  })
  it('should be able to register', async () => {
    const foodData = await inMemoryUserRepository.create({
      name: 'Arroz branco cozido',
      calories: '12800',
      carbohydrates: '2650',
      fat: '020',
      fiber: '160',
      portion: '100',
      protein: '250',
    })

    const data = {
      name: 'Arroz branco',
      calories: '12800',
      carbohydrates: '2650',
      fat: '020',
      fiber: '160',
      portion: '100',
      protein: '250',
    }

    const { food } = await sut.execute({
      data,
      foodId: foodData.id,
    })

    expect(food.name).toEqual('Arroz branco')

    expect(food.id).toEqual(expect.any(String))
  })

  it('should change a food invalid id', async () => {
    const food = await inMemoryUserRepository.create({
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
        data: food,
      }),
    ).rejects.toBeInstanceOf(FoodNotFound)
  })
})
