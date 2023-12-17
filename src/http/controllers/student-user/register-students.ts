import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterStudentsUseCase } from '@/use-cases/factories/make-register-students-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6),
    email: z.string().email(),
  })

  const { firstName, lastName, password, email } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerStudentsUseCase = makeRegisterStudentsUseCase()

    await registerStudentsUseCase.execute({
      firstName: firstName.toLocaleLowerCase(),
      lastName: lastName.toLocaleLowerCase(),
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
