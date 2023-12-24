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
}
