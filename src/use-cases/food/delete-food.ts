import { FoodNotFound } from '../errors/food-not-found'
import { FoodsRepository } from '@/repository/foods-repository'

interface DeleteFoodUseCaseRequest {
  foodId: string
}

interface DeleteFoodUseCaseResponse {
  status: boolean
}

export class DeleteFoodUseCase {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    foodId,
  }: DeleteFoodUseCaseRequest): Promise<DeleteFoodUseCaseResponse> {
    const dataFood = await this.foodsRepository.findFoodById(foodId)

    if (!dataFood) {
      throw new FoodNotFound()
    }

    const status = await this.foodsRepository.deleteFood(foodId)

    return {
      status,
    }
  }
}
