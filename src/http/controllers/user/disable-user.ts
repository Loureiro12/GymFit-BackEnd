import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeDisableUserUseCase } from '@/use-cases/factories/make-disable-user-use-case'

export async function disableUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = registerBodySchema.parse(request.body)

  try {
    const disableUserUseCase = makeDisableUserUseCase()

    await disableUserUseCase.execute({
      userId,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply
    .status(201)
    .send({ message: 'Usuário desabilitado com sucesso!' })
}
