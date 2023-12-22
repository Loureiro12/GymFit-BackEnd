import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { register } from './controllers/user/register-user'
import { search } from './controllers/user/search'
import { verifyJwt } from './middlewares/verify-jwt'
import { refresh } from './controllers/refresh'
import { verifyUserRole } from './middlewares/verify-user-role'
import { disableUser } from './controllers/user/disable-user'
import { deleteUser } from './controllers/user/delete-user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.post('/user', register)
  app.get('/user', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] }, search)
  app.post(
    '/user/disable',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    disableUser,
  )
  app.delete(
    '/user',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deleteUser,
  )
}
