import { Prisma, Food } from '@prisma/client'

export interface FoodsRepository {
  create(data: Prisma.FoodCreateInput): Promise<Food>
  listFoods(page: number, query?: string): Promise<Food[]>
  findFoodById(id: string): Promise<Food | null>
  deleteFood(id: string): Promise<boolean>
}
