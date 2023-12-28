import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetFoodsUseCase } from '@/use-cases/factories/food/make-get-food-use-case'

export async function searchFoods(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchFoodsSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchFoodsSchema.parse(request.query)

  const foodsUseCase = makeGetFoodsUseCase()

  const { foods } = await foodsUseCase.execute({
    query: query?.toLocaleLowerCase(),
    page,
  })

  return reply.status(200).send({
    foods,
  })
}
