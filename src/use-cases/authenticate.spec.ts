import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryStudentsRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(inMemoryStudentsRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryStudentsRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryStudentsRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
