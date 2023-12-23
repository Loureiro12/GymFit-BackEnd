import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'
import { UserNotFound } from '@/use-cases/errors/user-not-found'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = registerBodySchema.parse(request.body)

  try {
    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({
      userId,
    })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send({ message: 'Usuário deletado com sucesso!' })
}
