import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/student/create').send({
      firstName: 'Gabriel',
      lastName: 'Loureiro',
      password: '12345678',
      email: 'gabriel2@email.com',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'gabriel2@email.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
