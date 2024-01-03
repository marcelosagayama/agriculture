import RuralProducer from 'App/Models/RuralProducer'

export default class HectaresByStatesController {
  /**
   * @swagger
   *  /dashboard/hectares-by-states:
   *     get:
   *       tags:
   *         - Dashboard
   *       description: Return total arable hectares by state
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index() {
    const total = await RuralProducer.query()
      .select('state')
      .sum({ arable_hectares: 'arable_hectares' })
      .sum({ vegetation_hectares: 'vegetation_hectares' })
      .groupBy('state')

    return total.map((ruralProducer) => {
      return {
        state: ruralProducer.state,
        arable_hectares: Number(ruralProducer.arableHectares ?? 0),
        vegetation_hectares: Number(ruralProducer.vegetationHectares ?? 0),
      }
    })
  }
}
