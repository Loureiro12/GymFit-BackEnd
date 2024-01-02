import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteExerciseUseCase } from '@/use-cases/factories/exercise/make-delete-exercise-use-case'
import { ExerciseNotFound } from '@/use-cases/errors/exercise-not-found'

export async function deleteExercise(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteExerciseBodySchema = z.object({
    exerciseId: z.string(),
  })

  const { exerciseId } = deleteExerciseBodySchema.parse(request.query)

  try {
    const deleteExerciseUseCase = makeDeleteExerciseUseCase()

    await deleteExerciseUseCase.execute({
      exerciseId,
    })
  } catch (err) {
    if (err instanceof ExerciseNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send({ message: 'Exercício deletado com sucesso!' })
}
