import { FoodsRepository } from '@/repository/foods-repository'
import { Food } from '@prisma/client'

interface GetAllFoodUseCaseRequest {
  page: number
  query?: string
}

interface GetAllFoodUseCaseResponse {
  foods: Food[]
}

export class GetAllFoodsUseCase {
  constructor(private foodsRepository: FoodsRepository) {}

  async execute({
    page,
    query,
  }: GetAllFoodUseCaseRequest): Promise<GetAllFoodUseCaseResponse> {
    const foods = await this.foodsRepository.listFoods(page, query)

    return {
      foods,
    }
  }
}
