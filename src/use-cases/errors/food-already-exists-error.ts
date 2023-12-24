export class FoodAlreadyExistsError extends Error {
  constructor() {
    super('Alimento já cadastrada no sistema!')
  }
}
