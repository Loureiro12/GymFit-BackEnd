import { expect, describe, it, beforeEach } from 'vitest'

import { hash } from 'bcryptjs'

import { DisableUserUseCase } from './disable-user'
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository'
import { UserNotFound } from '../errors/user-not-found'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DisableUserUseCase

describe('Disable User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DisableUserUseCase(inMemoryUserRepository)
  })
  it('should change a user status to disabled', async () => {
    await inMemoryUserRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userId: '1234234',
      }),
    ).rejects.toBeInstanceOf(UserNotFound)
  })

  it('it should not be possible to delete a user that does not exist', async () => {
    const { id } = await inMemoryUserRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: id,
    })

    expect(user.status).toEqual('DISABLED')

    expect(user.status).toEqual(expect.any(String))
  })
})
