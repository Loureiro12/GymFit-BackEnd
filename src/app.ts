import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const prisma = new PrismaClient()

prisma.studentUser.create({
  data: {
    firstName: 'andre',
    lastName: 'loureiro',
    email: 'contato.loureiro1@gmail.com',
  },
})

export const app = fastify()
