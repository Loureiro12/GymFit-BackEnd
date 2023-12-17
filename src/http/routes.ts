import { FastifyInstance } from 'fastify'
import { register } from './controllers/register-students'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/students', register)
  app.post('/sessions', authenticate)
}
