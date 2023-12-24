import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterFoodUseCase } from '@/use-cases/factories/food/make-register-food-use-case'

export async function registerFood(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    portion: z.string(),
    calories: z.string(),
    carbohydrates: z.string(),
    protein: z.string(),
    fat: z.string(),
    fiber: z.string(),
  })

  const { name, portion, calories, carbohydrates, protein, fat, fiber } =
    registerBodySchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterFoodUseCase()

    await registerUserUseCase.execute({
      name: name.toLocaleLowerCase(),
      portion,
      calories,
      carbohydrates,
      protein,
      fat,
      fiber,
    })
  } catch (err) {
    return reply.status(500).send({
      message:
        'Ocorreu um problema inesperado, por favor, tente novamente mais tarde.',
    })
  }

  return reply.status(201).send()
}
