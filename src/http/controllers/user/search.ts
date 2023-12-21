import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetAllUserUseCase } from '@/use-cases/factories/make-get-all-user-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchStudentUsersSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchStudentUsersSchema.parse(request.query)

  const registerStudentsUseCase = makeGetAllUserUseCase()

  const { users } = await registerStudentsUseCase.execute({
    query: query?.toLocaleLowerCase(),
    page,
  })

  return reply.status(200).send({
    users,
  })
}
