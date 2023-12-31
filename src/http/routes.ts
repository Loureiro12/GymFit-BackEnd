import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { register } from './controllers/user/register-user'
import { search } from './controllers/user/search'
import { verifyJwt } from './middlewares/verify-jwt'
import { refresh } from './controllers/refresh'
import { verifyUserRole } from './middlewares/verify-user-role'
import { disableUser } from './controllers/user/disable-user'
import { deleteUser } from './controllers/user/delete-user'
import { registerFood } from './controllers/food/register-food'
import { searchFoods } from './controllers/food/search-food'
import { deleteFood } from './controllers/food/delete-food'
import { updateFood } from './controllers/food/update-food'
import { createExercise } from './controllers/exercise/create-exercise'
import { searchExercise } from './controllers/exercise/search-exercise'
import { deleteExercise } from './controllers/exercise/delete-exercise'
import { updateExercise } from './controllers/exercise/update-exercise'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // User
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

  // Food
  app.post(
    '/food',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    registerFood,
  )
  app.get(
    '/food',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    searchFoods,
  )
  app.delete(
    '/food',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deleteFood,
  )
  app.patch(
    '/food',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    updateFood,
  )

  // exercise

  app.post(
    '/exercise',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    createExercise,
  )
  app.get('/exercise', { onRequest: [verifyJwt] }, searchExercise)
  app.delete('/exercise', { onRequest: [verifyJwt] }, deleteExercise)
  app.patch('/exercise', { onRequest: [verifyJwt] }, updateExercise)
}
