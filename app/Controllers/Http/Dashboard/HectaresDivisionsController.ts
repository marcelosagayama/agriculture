import RuralProducer from 'App/Models/RuralProducer'

export default class HectaresDivisionsController {
  /**
   * @swagger
   *  /dashboard/hectares-divisions:
   *     get:
   *       tags:
   *         - Dashboard
   *       description: Return total hectares division
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index() {
    const total = await RuralProducer.query()
      .sum({ arable_hectares: 'arable_hectares' })
      .sum({ vegetation_hectares: 'vegetation_hectares' })
      .first()

    return {
      arable_hectares: Number(total?.arableHectares ?? 0),
      vegetation_hectares: Number(total?.vegetationHectares ?? 0),
    }
  }
}
