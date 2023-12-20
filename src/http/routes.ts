import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { register } from './controllers/student-user/register-students'
import { search } from './controllers/student-user/search'
import { verifyJwt } from './middlewares/verify-jwt'
import { refresh } from './controllers/refresh'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.post('/student/create', register)
  app.get('/student', { onRequest: [verifyJwt] }, search)
}
