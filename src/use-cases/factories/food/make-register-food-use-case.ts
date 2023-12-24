import { RegisterFoodUseCase } from '../../food/register-food'
import { PrismaFoodsRepository } from '@/repository/prisma/prisma-food-repository'

export function makeRegisterFoodUseCase() {
  const foodsRepository = new PrismaFoodsRepository()
  const registerUserUseCase = new RegisterFoodUseCase(foodsRepository)

  return registerUserUseCase
}
