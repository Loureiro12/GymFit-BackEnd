import { Prisma, Food } from '@prisma/client'
import { FoodsRepository } from '../foods-repository'

export class InMemoryFoodRepository implements FoodsRepository {
  public items: Food[] = []

  async create(data: Prisma.FoodCreateInput) {
    const food = {
      id: 'food-1',
      name: data.name,
      portion: data.portion,
      calories: data.calories,
      carbohydrates: data.carbohydrates,
      protein: data.protein,
      fat: data.fat,
      fiber: data.fiber,
    }

    this.items.push(food)

    return food
  }
}
