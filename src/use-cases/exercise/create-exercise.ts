import { Exercise, MuscleGroup } from '@prisma/client'
import { ExerciseRepository } from '@/repository/exercise-repository'

interface CreateExerciseUseCaseRequest {
  name: string
  imageUrl: string
  videoUrl: string
  muscleGroup: MuscleGroup
  key: string
}

interface CreateExerciseUseCaseResponse {
  exercise: Exercise
}

export class CreateExerciseUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    name,
    imageUrl,
    videoUrl,
    muscleGroup,
    key,
  }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
    const exercise = await this.exerciseRepository.create({
      name,
      imageUrl,
      videoUrl,
      muscleGroup,
      key,
    })

    return {
      exercise,
    }
  }
}
