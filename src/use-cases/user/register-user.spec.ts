import { expect, describe, it, beforeEach } from 'vitest'

import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

import { RegisterUserUseCase } from './register-user'
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository'

let inMemoryUserRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(inMemoryUserRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@email.com'

    await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
