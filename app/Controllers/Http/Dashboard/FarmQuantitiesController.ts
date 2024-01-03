import RuralProducer from 'App/Models/RuralProducer'

export default class FarmsQuantitiesController {
  /**
   * @swagger
   *  /dashboard/farm-quantities:
   *     get:
   *       tags:
   *         - Dashboard
   *       description: Return total farms
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index() {
    const total = await RuralProducer.all()
    return { total: total.length ?? 0 }
  }
}
