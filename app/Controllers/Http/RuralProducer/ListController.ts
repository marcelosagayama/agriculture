import RuralProducer from 'App/Models/RuralProducer'

export default class ListController {
  /**
   * @swagger
   *  /rural-producers:
   *     get:
   *       tags:
   *         - Rural Producer
   *       description: Return a list of rural producers
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index() {
    return await RuralProducer.query().preload('cropsIds')
  }
}
