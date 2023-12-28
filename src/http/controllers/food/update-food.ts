import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateFoodUseCase } from '@/use-cases/factories/food/make-update-food-use-case'
import { FoodNotFound } from '@/use-cases/errors/food-not-found'

export async function updateFood(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
    portion: z.string(),
    calories: z.string(),
    carbohydrates: z.string(),
    protein: z.string(),
    fat: z.string(),
    fiber: z.string(),
  })

  const updateQuerySchema = z.object({
    foodId: z.string(),
  })

  const { foodId } = updateQuerySchema.parse(request.query)

  const { name, portion, calories, carbohydrates, protein, fat, fiber } =
    updateBodySchema.parse(request.body)

  try {
    const updateUserUseCase = makeUpdateFoodUseCase()

    const data = {
      name,
      portion,
      calories,
      carbohydrates,
      protein,
      fat,
      fiber,
    }

    await updateUserUseCase.execute({ data, foodId })
  } catch (err) {
    if (err instanceof FoodNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send({
      message:
        'Ocorreu um problema inesperado, por favor, tente novamente mais tarde.',
    })
  }

  return reply.status(201).send({ message: 'Alimento atualizado com sucesso!' })
}
