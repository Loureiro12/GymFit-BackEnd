import { Prisma, Food } from '@prisma/client'

export interface FoodsRepository {
  create(data: Prisma.FoodCreateInput): Promise<Food>
  listFoods(page: number, query?: string, id?: string): Promise<Food[]>
  findFoodById(id: string): Promise<Food | null>
  deleteFood(id: string): Promise<boolean>
  updateFood(data: Prisma.FoodCreateInput, foodId: string): Promise<Food>
}
