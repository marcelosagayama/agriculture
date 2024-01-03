import RuralProducer from 'App/Models/RuralProducer'

export default class TotalHectaresController {
  /**
   * @swagger
   *  /dashboard/total-hectares:
   *     get:
   *       tags:
   *         - Dashboard
   *       description: Return total hectares
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index() {
    const total = await RuralProducer.query().sum({ total_hectares: 'total_hectares' }).first()
    return { total_hectares: Number(total?.totalHectares ?? 0) }
  }
}
