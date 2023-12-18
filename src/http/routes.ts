import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { register } from './controllers/student-user/register-students'
import { search } from './controllers/student-user/search'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', { onRequest: [verifyJwt] }, authenticate)

  app.post('/student/create', { onRequest: [verifyJwt] }, register)
  app.get('/student', { onRequest: [verifyJwt] }, search)
}
