import { Food } from '@prisma/client'
import { FoodsRepository } from '@/repository/foods-repository'

interface RegisterFoodUseCaseRequest {
  name: string
  portion: string
  calories: string
  carbohydrates: string
  protein: string
  fat: string
  fiber: string
}

interface RegisterFoodUseCaseResponse {
  food: Food
}

export class RegisterFoodUseCase {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    name,
    portion,
    calories,
    carbohydrates,
    protein,
    fat,
    fiber,
  }: RegisterFoodUseCaseRequest): Promise<RegisterFoodUseCaseResponse> {
    const food = await this.foodsRepository.create({
      name,
      portion,
      calories,
      carbohydrates,
      protein,
      fat,
      fiber,
    })

    return {
      food,
    }
  }
}
