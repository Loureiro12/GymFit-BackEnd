export class FoodNotFound extends Error {
  constructor() {
    super('Alimento não encontrado!')
  }
}
