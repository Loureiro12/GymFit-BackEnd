import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterStudentsUseCase } from '@/use-cases/register-students'
import { PrismaStudentUsersRepository } from '@/repository/prisma/prisma-studentUsers-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

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
    const studentUsersRepository = new PrismaStudentUsersRepository()
    const registerStudentsUseCase = new RegisterStudentsUseCase(
      studentUsersRepository,
    )

    await registerStudentsUseCase.execute({
      firstName,
      lastName,
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
