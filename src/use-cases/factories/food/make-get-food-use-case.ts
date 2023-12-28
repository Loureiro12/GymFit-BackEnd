import { PrismaFoodsRepository } from '@/repository/prisma/prisma-food-repository'
import { GetAllFoodsUseCase } from '../../food/get-food'

export function makeGetFoodsUseCase() {
  const foodsRepository = new PrismaFoodsRepository()
  const getAllFoodsUseCase = new GetAllFoodsUseCase(foodsRepository)

  return getAllFoodsUseCase
}
