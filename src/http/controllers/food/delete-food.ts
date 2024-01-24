import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteFoodUseCase } from '@/use-cases/factories/food/make-delete-food-use-case'
import { FoodNotFound } from '@/use-cases/errors/food-not-found'

export async function deleteFood(request: FastifyRequest, reply: FastifyReply) {
  const deleteFoodBodySchema = z.object({
    foodId: z.string(),
  })

  const { foodId } = deleteFoodBodySchema.parse(request.query)

  console.log('foodId', foodId)

  try {
    const deleteUserUseCase = makeDeleteFoodUseCase()

    await deleteUserUseCase.execute({
      foodId,
    })
  } catch (err) {
    if (err instanceof FoodNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send({ message: 'Alimento deletado com sucesso!' })
}
