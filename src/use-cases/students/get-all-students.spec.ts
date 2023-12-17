import { InMemoryStudentsRepository } from '@/repository/in-memory/in-memory-students-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetAllStudentsUseCase } from './get-all-students'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: GetAllStudentsUseCase

describe('Fetch Students Use Case', () => {
  beforeEach(async () => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    sut = new GetAllStudentsUseCase(inMemoryStudentsRepository)
  })

  it('should be able to fetch students', async () => {
    await inMemoryStudentsRepository.create({
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
