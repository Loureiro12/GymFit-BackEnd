import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateExerciseUseCase } from '@/use-cases/factories/exercise/make-register-exercise-use-case'

export async function createExercise(
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

  const createExerciseBodySchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
    videoUrl: z.string(),
    muscleGroup: MuscleGroup,
  })

  const { name, imageUrl, videoUrl, muscleGroup } =
    createExerciseBodySchema.parse(request.body)

  try {
    const registerUserUseCase = makeCreateExerciseUseCase()

    await registerUserUseCase.execute({
      name: name.toLocaleLowerCase(),
      imageUrl,
      videoUrl,
      muscleGroup,
    })
  } catch (err) {
    return reply.status(500).send({
      message:
        'Ocorreu um problema inesperado, por favor, tente novamente mais tarde.',
    })
  }

  return reply.status(201).send()
}
