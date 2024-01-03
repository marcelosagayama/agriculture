import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import RuralProducer from 'App/Models/RuralProducer'

export default class GetsController {
  /**
   * @swagger
   *  /rural-producers/{id}:
   *     get:
   *       tags:
   *         - Rural Producer
   *       description: Return a existent Rural Producer
   *       parameters:
   *          - name: id
   *            in:  path
   *            required: true
   *            schema:
   *            type: string
   *            description: Rural Producer Id.
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index({ params: { id } }: HttpContextContract) {
    const ruralProducer = await RuralProducer.findBy('id', id)
    await ruralProducer?.load('cropsIds')

    return ruralProducer
  }
}
