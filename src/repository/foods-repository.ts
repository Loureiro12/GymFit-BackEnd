import { Prisma, Food } from '@prisma/client'

export interface FoodsRepository {
  create(data: Prisma.FoodCreateInput): Promise<Food>
  listFoods(page: number, query?: string): Promise<Food[]>
}
