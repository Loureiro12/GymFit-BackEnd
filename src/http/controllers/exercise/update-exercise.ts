import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateExerciseUseCase } from '@/use-cases/factories/exercise/make-update-exercise-use-case'
import { ExerciseNotFound } from '@/use-cases/errors/exercise-not-found'

export async function updateExercise(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const MuscleGroup = z.enum([
    'thorax',
    'shoulder',
    'triceps',
    'back',
    'abdomen',
    'biceps',
    'leg',
    'glute',
  ])

  const updateBodySchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
    videoUrl: z.string(),
    muscleGroup: MuscleGroup,
  })

  const updateQuerySchema = z.object({
    exerciseId: z.string(),
  })

  const { exerciseId } = updateQuerySchema.parse(request.query)

  const { name, imageUrl, videoUrl, muscleGroup } = updateBodySchema.parse(
    request.body,
  )

  try {
    const updateExerciseUseCase = makeUpdateExerciseUseCase()

    const data = {
      name,
      imageUrl,
      videoUrl,
      muscleGroup,
    }

    await updateExerciseUseCase.execute({ data, exerciseId })
  } catch (err) {
    if (err instanceof ExerciseNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send({
      message:
        'Ocorreu um problema inesperado, por favor, tente novamente mais tarde.',
    })
  }

  return reply
    .status(201)
    .send({ message: 'Exercício atualizado com sucesso!' })
}
