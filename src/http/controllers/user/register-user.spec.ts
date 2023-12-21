import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/student/create').send({
      firstName: 'Gabriel',
      lastName: 'Loureiro',
      password: 'Gaelsuporte1201@',
      email: 'gabriel2@email.com',
    })

    expect(response.statusCode).toEqual(201)
  })
})
