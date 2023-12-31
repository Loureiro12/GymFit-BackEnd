import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetExerciseUseCase } from '@/use-cases/factories/exercise/make-get-exercise-use-case'

export async function searchExercise(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchExerciseSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchExerciseSchema.parse(request.query)

  const foodsUseCase = makeGetExerciseUseCase()

  const { exercises } = await foodsUseCase.execute({
    query: query?.toLocaleLowerCase(),
    page,
  })

  return reply.status(200).send({
    exercises,
  })
}
