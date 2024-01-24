import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FoodsRepository } from '../foods-repository'

export class PrismaFoodsRepository implements FoodsRepository {
  async create(data: Prisma.FoodCreateInput) {
    const food = await prisma.food.create({
      data,
    })

    return food
  }

  async listFoods(
    page: number,
    query?: string | undefined,
    id?: string,
  ): Promise<
    {
      id: string
      name: string
      portion: string
      calories: string
      carbohydrates: string
      protein: string
      fat: string
      fiber: string
    }[]
  > {
    if (id) {
      const users = await prisma.food.findMany({
        where: {
          id: {
            equals: id,
          },
        },
      })

      return users
    }
    if (query) {
      const users = await prisma.food.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })

      return users
    }

    const foods = await prisma.food.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return foods
  }

  async findFoodById(id: string) {
    const food = await prisma.food.findUnique({
      where: {
        id,
      },
    })

    return food
  }

  async deleteFood(id: string) {
    await prisma.food.delete({
      where: { id },
    })

    return true
  }

  async updateFood(data: Prisma.FoodCreateInput, foodId: string) {
    const food = await prisma.food.update({
      where: { id: foodId },
      data,
    })

    return food
  }
}
