import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
  public async index({ request }: HttpContextContract) {
    return { hello: 'world' }
  }
}
