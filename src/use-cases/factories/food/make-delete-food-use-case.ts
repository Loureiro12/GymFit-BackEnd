import { DeleteFoodUseCase } from '../../food/delete-food'
import { PrismaFoodsRepository } from '@/repository/prisma/prisma-food-repository'

export function makeDeleteFoodUseCase() {
  const prismaFoodsRepository = new PrismaFoodsRepository()
  const deleteFoodUseCase = new DeleteFoodUseCase(prismaFoodsRepository)

  return deleteFoodUseCase
}
