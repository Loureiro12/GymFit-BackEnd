import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { register } from './controllers/student-user/register-students'
import { search } from './controllers/student-user/search'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)

  app.post('/student/create', register)
  app.get('/student', search)
}
