import { UpdateFoodUseCase } from '@/use-cases/food/update-food'
import { PrismaFoodsRepository } from '@/repository/prisma/prisma-food-repository'

export function makeUpdateFoodUseCase() {
  const foodsRepository = new PrismaFoodsRepository()
  const updateFoodUseCase = new UpdateFoodUseCase(foodsRepository)

  return updateFoodUseCase
}
