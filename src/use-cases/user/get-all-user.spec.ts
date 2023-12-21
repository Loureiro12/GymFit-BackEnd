import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetAllUserUseCase } from './get-all-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetAllUserUseCase

describe('Fetch Students Use Case', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetAllUserUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch students', async () => {
    await inMemoryUserRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: '123456',
    })

    const { users } = await sut.execute({ page: 1 })

    expect(users).toHaveLength(1)
    expect(users).toEqual([
      expect.objectContaining({ email: 'john@email.com' }),
    ])
  })
})
