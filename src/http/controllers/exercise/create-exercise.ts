import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'

import { makeCreateExerciseUseCase } from '@/use-cases/factories/exercise/make-register-exercise-use-case'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/cloundflare'

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
    muscleGroup: MuscleGroup,
    contentType: z.string().regex(/\w+\/[-+.\w]+/),
  })

  const { name, muscleGroup, contentType } = createExerciseBodySchema.parse(
    request.body,
  )

  try {
    const registerUserUseCase = makeCreateExerciseUseCase()

    const fileKey = randomUUID().concat('-').concat(name.replace(/\s/g, '-'))

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: 'bucket-name',
        Key: fileKey,
        ContentType: contentType,
      }),
      { expiresIn: 600 },
    )

    await registerUserUseCase.execute({
      name: name.toLocaleLowerCase(),
      imageUrl: '',
      videoUrl: '',
      muscleGroup,
      key: fileKey,
    })

    return reply.status(201).send({
      signedUrl,
    })
  } catch (err) {
    return reply.status(500).send({
      message:
        'Ocorreu um problema inesperado, por favor, tente novamente mais tarde.',
    })
  }
}
