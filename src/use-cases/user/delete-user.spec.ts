import { expect, describe, it, beforeEach } from 'vitest'

import { hash } from 'bcryptjs'

import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository'
import { UserNotFound } from '../errors/user-not-found'
import { DeleteUserUseCase } from './delete-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })
  it('it should not be possible to delete a user that does not exist', async () => {
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

  it('should delete user', async () => {
    const { id } = await inMemoryUserRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: await hash('123456', 6),
    })

    const respose = await sut.execute({
      userId: id,
    })

    expect(respose.status).toEqual(true)
  })
})
