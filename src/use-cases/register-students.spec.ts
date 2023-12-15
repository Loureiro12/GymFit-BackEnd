import { expect, describe, it } from 'vitest'
import { RegisterStudentsUseCase } from './register-students'
import { compare } from 'bcryptjs'
import { InMemoryStudentsRepository } from '@/repository/in-memory/in-memory-students-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryStudentsRepository = new InMemoryStudentsRepository()
    const registerStudentsUseCase = new RegisterStudentsUseCase(
      inMemoryStudentsRepository,
    )

    const { user } = await registerStudentsUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryStudentsRepository = new InMemoryStudentsRepository()
    const registerStudentsUseCase = new RegisterStudentsUseCase(
      inMemoryStudentsRepository,
    )

    const { user } = await registerStudentsUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryStudentsRepository = new InMemoryStudentsRepository()
    const registerStudentsUseCase = new RegisterStudentsUseCase(
      inMemoryStudentsRepository,
    )

    const email = 'john@email.com'

    await registerStudentsUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerStudentsUseCase.execute({
        firstName: 'John',
        lastName: 'Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
