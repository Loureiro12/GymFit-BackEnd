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

  async listFoods() {
    const foods = this.items.slice()

    return foods
  }

  async findFoodById(id: string) {
    const food = this.items.find((item) => item.id === id)

    if (!food) {
      return null
    }

    return food
  }

  async deleteFood(id: string) {
    const food = this.items.find((item) => item.id === id)

    if (!food) {
      return false
    }

    return true
  }

  async updateFood(
    data: Prisma.FoodCreateInput,
    foodId: string,
  ): Promise<{
    id: string
    name: string
    portion: string
    calories: string
    carbohydrates: string
    protein: string
    fat: string
    fiber: string
  }> {
    const food = {
      id: foodId,
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
