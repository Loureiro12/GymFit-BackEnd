import { FastifyInstance } from 'fastify'
import { register } from './controllers/register-students'

export async function appRoutes(app: FastifyInstance) {
  app.post('/students', register)
}
