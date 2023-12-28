import { Food, Prisma } from '@prisma/client'
import { FoodNotFound } from '../errors/food-not-found'
import { FoodsRepository } from '@/repository/foods-repository'

interface UpdateFoodUseCaseRequest {
  foodId: string
  data: Prisma.FoodCreateInput
}

interface UpdateFoodUseCaseResponse {
  food: Food
}

export class UpdateFoodUseCase {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    foodId,
    data,
  }: UpdateFoodUseCaseRequest): Promise<UpdateFoodUseCaseResponse> {
    const dataFood = await this.foodsRepository.findFoodById(foodId)

    if (!dataFood) {
      throw new FoodNotFound()
    }

    const food = await this.foodsRepository.updateFood(data, foodId)

    return {
      food,
    }
  }
}
